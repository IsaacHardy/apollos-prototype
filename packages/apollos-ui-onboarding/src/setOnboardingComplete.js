import gql from 'graphql-tag';

const SET_ONBOARDING_COMPLETE = gql`
  mutation SetOnboardingComplete($userID: String!) {
    setOnboardingComplete(userID: $userID) @client
  }
`;

export default async ({ client }) => {
  // TODO get userID
  await client.mutate({
    mutation: SET_ONBOARDING_COMPLETE,
    variables: { userID },
  });

  return userID;
};
