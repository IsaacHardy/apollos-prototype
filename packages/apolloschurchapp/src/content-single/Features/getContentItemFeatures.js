import gql from 'graphql-tag';
import { TEXT_FEATURE_FRAGMENT } from './TextFeature';

const FEATURES_FRAGMENT = `
  fragment FeaturesFragment on Feature {
    id
    ...TextFeatureFragment
  }
  ${TEXT_FEATURE_FRAGMENT}
`;

export default gql`
  query features {
    node(id: "ContentSeriesContentItem:6d8dc8e4bad017f815ae0cac8bf692bb") {
      id
      ... on ContentSeriesContentItem {
        features {
          ...FeaturesFragment
        }
      }
    }
  }
  ${FEATURES_FRAGMENT}
`;
