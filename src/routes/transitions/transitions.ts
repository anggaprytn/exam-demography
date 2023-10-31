export const fadeTransition = {
  headerShown: false,
  cardStyle: {
    backgroundColor: 'transparent',
  },
  cardStyleInterpolator: ({ current }: { current: any }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  }),
};
