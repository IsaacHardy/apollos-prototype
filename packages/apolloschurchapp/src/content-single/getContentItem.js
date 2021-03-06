import gql from 'graphql-tag';

export const CONTENT_ITEM_FRAGMENT = gql`
  fragment contentItemFragment on ContentItem {
    id
    title
    isLiked
    summary
    coverImage {
      name
      sources {
        uri
      }
    }
    theme {
      type
      colors {
        primary
        secondary
        screen
        paper
      }
    }
    parentChannel {
      id
      name
    }
    videos {
      sources {
        uri
      }
    }
    audios {
      sources {
        uri
      }
    }
    ... on WeekendContentItem {
      liveStream {
        isLive
      }
    }
  }
`;

export default gql`
  query getContentItem($itemId: ID!) {
    node(id: $itemId) {
      __typename
      ... on ContentItem {
        ...contentItemFragment
      }
    }
  }
  ${CONTENT_ITEM_FRAGMENT}
`;
