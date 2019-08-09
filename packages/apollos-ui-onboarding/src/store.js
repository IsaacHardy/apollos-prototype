export const defaults = {
  userID: null,
  onboardingCompleted: false,
};

export const resolvers = {
  Query: {
    onboardingCompleted: () => false,
  },
  Mutation: {
    setOnboardingComplete: async (root, { userID }, { cache, client }) => {
      cache.writeQuery({
        onboardingCompleted,
        data: {
          onboardingCompleted: true,
        },
      });

      updateUserId({ userID, client });
      return null;
    },
  },
};
