import React, { PureComponent } from 'react';
import { Animated, Image } from 'react-native';
import PropTypes from 'prop-types';
import { every } from 'lodash';

import styled from '../styled';

import SkeletonImage from './SkeletonImage';

// This mirrors the File resource we get from Heighliner:
export const ImageSourceType = PropTypes.oneOfType([
  PropTypes.shape({
    uri: PropTypes.string,
    label: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  PropTypes.string,
]);

const sizeCache = {};

const getCacheKey = (source) => {
  if (source.size && source.fileLabel)
    return `${source.size}-${source.fileLabel}`;
  if (source.url) return source.url;
  if (source.uri) return source.uri;
  return undefined;
};

const getCachedSources = (_sources = []) => {
  let sources = _sources;
  if (!Array.isArray(sources)) sources = [sources];
  sources = sources.map((source) => {
    if (typeof source === 'string') return { url: source };
    return source;
  });

  return sources.map((source) => ({
    uri: (source.url || '').replace(/^http:\/\/|^\/\//i, 'https://'),
    cache: 'force-cache',
    ...source,
    ...(sizeCache[getCacheKey(source)] || {}),
  }));
};

const updateCache = (sources) =>
  Promise.all(
    getCachedSources(sources).map((source) => {
      const key = getCacheKey(source);
      if (sizeCache[key] || !key) return Promise.resolve(source);
      return new Promise((resolve, reject) => {
        Image.getSize(
          source.uri,
          (width, height) =>
            resolve({
              width,
              height,
            }),
          reject
        );
      }).then((sizeForCache) => {
        if (key) sizeCache[key] = sizeForCache;
      });
    })
  );

const withBackgroundColor = styled(({ theme }) => ({
  backgroundColor: theme.colors.background.inactive,
}));

const aspectRatioPropValidator = (props, propName, componentName) => {
  if (props[propName] === undefined) return;

  let errorMessage = '';

  if (typeof props[propName] !== 'number') {
    errorMessage = `Invalid prop \`${propName}\` of value \`${typeof props[
      propName
    ]}\` supplied to \`${componentName}\` expected type of number`;
  }

  if (!props.maintainAspectRatio) {
    errorMessage += ` Prop maintainAspectRatio is required for use with ${propName}`;
  }

  if (typeof props[propName] !== 'number' || !props.maintainAspectRatio) {
    return new Error(errorMessage); // eslint-disable-line consistent-return
  }
};

class ConnectedImage extends PureComponent {
  static propTypes = {
    source: PropTypes.oneOfType([
      PropTypes.arrayOf(ImageSourceType),
      ImageSourceType,
    ]),
    ImageComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    maintainAspectRatio: PropTypes.bool,
    isLoading: PropTypes.bool,
    onLoad: PropTypes.func,
    style: PropTypes.any, // eslint-disable-line
    minAspectRatio: aspectRatioPropValidator,
    maxAspectRatio: aspectRatioPropValidator,
  };

  static defaultProps = {
    ImageComponent: Animated.Image,
    maintainAspectRatio: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      source: getCachedSources(this.props.source),
    };

    this.imageOpacity = new Animated.Value(this.isLoading ? 0 : 1);
  }

  componentDidMount() {
    this.updateCache(this.props.source);
  }

  componentDidUpdate() {
    this.updateCache(this.props.source);
  }

  componentWillUnmount() {
    if (this.cacheUpdater) this.cacheUpdater.cancel();
  }

  get aspectRatio() {
    const style = {};

    // We only need to do this if the image is loading and not cached.
    if (this.props.isLoading && !style.aspectRatio) {
      style.aspectRatio = 1;
    } else if (this.props.maintainAspectRatio) {
      const firstSource = this.state.source[0];

      // determine the aspect ratio of an image based on its width and height
      if (firstSource && firstSource.width && firstSource.height) {
        style.aspectRatio = firstSource.width / firstSource.height;

        // account for possible min/max aspectRatio bounds
        if (this.props.minAspectRatio || this.props.maxAspectRatio) {
          const maxAspectRatio = this.props.maxAspectRatio || style.aspectRatio;
          const minAspectRatio = this.props.minAspectRatio || 0;

          style.aspectRatio = Math.max(
            Math.min(maxAspectRatio, style.aspectRatio), // == smaller of maxAspectRatio and current aspectRatio
            minAspectRatio
          ); // == larger of calculated "max" aspect ratio and the minimum aspect ratio
        }
      }
    }

    return style;
  }

  get isLoading() {
    return (
      this.props.isLoading ||
      !every(this.state.source, (image) => image.width && image.height)
    );
  }

  handleOnLoad = (...args) => {
    Animated.timing(this.imageOpacity, {
      toValue: 1,
      duration: 250,
    }).start();
    if (this.props.onLoad) this.props.onLoad(...args);
  };

  cancleCacheUpdater = (promise) => {
    let hasCanceled = false;

    const wrappedPromise = new Promise((resolve, reject) => {
      promise.then(
        (val) => (hasCanceled ? reject({ isCanceled: true }) : resolve(val)), // eslint-disable-line prefer-promise-reject-errors
        (error) => (hasCanceled ? reject({ isCanceled: true }) : reject(error)) // eslint-disable-line prefer-promise-reject-errors
      );
    });

    return {
      promise: wrappedPromise,
      cancel() {
        hasCanceled = true;
      },
    };
  };

  updateCache(sources) {
    this.cacheUpdater = this.cancleCacheUpdater(updateCache(sources));
    this.cacheUpdater.promise
      .then(() => {
        const newSource = getCachedSources(sources);
        const oldSource = this.state.source || [];

        if (
          newSource.length !== oldSource.length ||
          newSource.find(
            (source, i) =>
              !oldSource[i] ||
              getCacheKey(source) !== getCacheKey(oldSource[i]) ||
              source.width !== oldSource[i].width ||
              source.height !== oldSource[i].height
          )
        ) {
          this.setState({ source: getCachedSources(sources) });
        }
      })
      .catch(() => {
        // todo: Right now, if there's an error on connected image that means one of two things:
        // 1) the image component was unmounted before load...we should do nothing
        // 2) the image failed to load. Our "empty" state for images is a graybox.
        //    We could make this better by showing an alert icon or something on error,
        //    But a gray box is better then nothing. so, we do nothing currently :)
        //    However, we still need this empty catch function as uncaught promise errors
        //    will throw an error up the food chain.
      });
  }

  render() {
    let { source } = this.state;
    if (!Array.isArray(source)) source = [source];

    const {
      ImageComponent = Animated.Image,
      style,
      forceRatio,
      isLoading,
      maintainAspectRatio,
      ...otherProps
    } = this.props;

    return (
      <SkeletonImage
        onReady={!this.isLoading}
        forceRatio={forceRatio}
        style={style}
      >
        <ImageComponent
          {...otherProps}
          source={source}
          onLoad={this.handleOnLoad}
          style={[this.aspectRatio, { opacity: this.imageOpacity }, style]}
        />
      </SkeletonImage>
    );
  }
}

const enhanced = withBackgroundColor(ConnectedImage);

enhanced.propTypes = ConnectedImage.propTypes;

export {
  sizeCache,
  getCacheKey,
  getCachedSources,
  updateCache,
  enhanced as default,
};
