import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { ErrorCard } from '@apollosproject/ui-kit';
import TextFeature from './TextFeature';

import GET_CONTENT_ITEM_FEATURES from './getContentItemFeatures';

const FEATURE_MAP = {
  TextFeature,
};

const Features = ({ contentId }) => {
  if (!contentId) return null;

  return (
    <Query query={GET_CONTENT_ITEM_FEATURES} variables={{ contentId }}>
      {({ data: { node: { features } = {} } = {}, loading, error }) => {
        if (error) return <ErrorCard error={error} />;
        if (loading) return null;

        return features.map(({ __typename, ...feature }) => {
          const Feature = FEATURE_MAP[__typename];
          return (
            <Feature key={feature.id} {...feature} contentId={contentId} />
          );
        });
      }}
    </Query>
  );
};

Features.propTypes = {
  contentId: PropTypes.string,
};

export default Features;
