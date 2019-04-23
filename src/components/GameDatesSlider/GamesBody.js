/* eslint-disable no-console */
const GamesBody = (activeGames, activeTab) => {
  console.log("GamesBody");
  return activeGames.map(child => {
    const { children: kids, label } = child.props;
    if (label !== activeTab) {
      return undefined;
    }
    return kids;
  });
};

export default GamesBody;
