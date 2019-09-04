import React, { PureComponent } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Query } from 'react-apollo';
import { get } from 'lodash';

import {
  FeedView,
  BackgroundView,
  styled,
  PaddedView,
  SearchInput,
  H2,
} from '@apollosproject/ui-kit';

import TileContentFeed from './TileContentFeed';
import GET_CONTENT_CHANNELS from './getContentChannels';

const HeaderBorder = styled(({ theme }) => ({
  paddingBottom: 8,
  /* It's unclear why this is necessary but without it the layout breaks on both platforms. Limited
   * research suggest that without a background color the shadows don't know what to blend with so
   * the view collapses. */
  backgroundColor: theme.colors.background.paper,
  // Renders the same shadows that React Navigation does.
  ...Platform.select({
    ios: {
      shadowColor: 'rgba(0, 0, 0, 0.3)',
      shadowOpacity: 0.85,
      shadowRadius: 0,
      shadowOffset: {
        width: 0,
        height: StyleSheet.hairlineWidth,
      },
    },
    android: {
      elevation: 4,
    },
  }),
}))(PaddedView);

// This element is used to clip the Android shadow in every directection except the bottom.
const ClipAndroidElevationFix = styled({
  paddingBottom: StyleSheet.hairlineWidth,
  overflow: 'hidden',
})(View);

const childContentItemLoadingState = {
  title: '',
  isLoading: true,
};

const feedItemLoadingState = {
  name: '',
  isLoading: true,
};

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 0,
    elevation: 0,
  },
});

const Boom = () => (
  <PaddedView style={{ width: '100%' }}>
    <H2 style={{ paddingBottom: 16 }}>Discover</H2>
    <SearchInput />
  </PaddedView>
);

class Discover extends PureComponent {
  renderItem = ({ item }) => (
    <TileContentFeed
      id={item.id}
      name={item.name}
      content={get(item, 'childContentItemsConnection.edges', []).map(
        (edge) => edge.node
      )}
      isLoading={item.isLoading}
      loadingStateObject={childContentItemLoadingState}
    />
  );

  render() {
    return (
      <BackgroundView>
        <Query query={GET_CONTENT_CHANNELS} fetchPolicy="cache-and-network">
          {({
            error,
            loading,
            data: { contentChannels = [] } = {},
            refetch,
          }) => (
            <FeedView
              error={error}
              content={contentChannels}
              isLoading={loading}
              refetch={refetch}
              renderItem={this.renderItem}
              loadingStateObject={feedItemLoadingState}
              numColumns={1}
            />
          )}
        </Query>
      </BackgroundView>
    );
  }
}

Discover.navigationOptions = {
  title: 'Discover',
  // headerStyle: styles.header,
  headerTitle: <Boom />,
  headerStyle: {
    height: 115,
  },
};

export default Discover;
