import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { get } from 'lodash';

import { BackgroundView, FeedView } from '@apollosproject/ui-kit';
import fetchMoreResolver from 'apolloschurchapp/src/utils/fetchMoreResolver';
import ContentCardConnected from '../../../ui/ContentCardConnected';

import GET_LIKED_CONTENT from '../getLikedContent';
/** A FeedView wrapped in a query to pull content data. */
class LikedContentList extends PureComponent {
  /** Function for React Navigation to set information in the header. */
  static navigationOptions = () => ({
    title: 'Your Likes',
  });

  static propTypes = {
    /** Functions passed down from React Navigation to use in navigating to/from
     * items in the feed.
     */
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
    }),
  };

  /** Function that is called when a card in the feed is pressed.
   * Takes the user to the ContentSingle
   */
  handleOnPress = (item) =>
    this.props.navigation.navigate('ContentSingle', {
      itemId: item.id,
      sharing: item.sharing,
    });

  render() {
    return (
      <BackgroundView>
        <Query
          query={GET_LIKED_CONTENT}
          fetchPolicy="cache-and-network"
          variables={{ first: 20 }}
        >
          {({ loading, error, data, refetch, fetchMore, variables }) => (
            <FeedView
              ListItemComponent={ContentCardConnected}
              content={get(data, 'likedContent.edges', []).map(
                (edge) => edge.node
              )}
              isLoading={loading}
              error={error}
              refetch={refetch}
              onPressItem={this.handleOnPress}
              fetchMore={fetchMoreResolver({
                collectionName: 'likedContent',
                fetchMore,
                variables,
                data,
              })}
            />
          )}
        </Query>
      </BackgroundView>
    );
  }
}

export default LikedContentList;
