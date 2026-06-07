export function getQualifiedTeams(tournament) {
  const firsts = [];
  const seconds = [];
  const thirds = [];

  Object.entries(tournament).forEach(([groupName, data]) => {
    const ranking = Object.entries(data.table)
      .sort((a, b) => {
        if (b[1].points !== a[1].points) {
          return b[1].points - a[1].points;
        }

        return b[1].wins - a[1].wins;
      });

    firsts.push(ranking[0][0]);
    seconds.push(ranking[1][0]);

    thirds.push({
      team: ranking[2][0],
      points: ranking[2][1].points,
      wins: ranking[2][1].wins
    });
  });

  thirds.sort((a, b) => {
    if (b.points !== a.points) {
      return b.points - a.points;
    }

    return b.wins - a.wins;
  });

  const bestThirds = thirds
    .slice(0, 8)
    .map(t => t.team);

  return [
    ...firsts,
    ...seconds,
    ...bestThirds
  ];
}

export function allGroupMatchesPlayed(
  tournament
) {
  return Object.values(tournament).every(
    group =>
      group.matches.every(
        match => match.result !== null
      )
  );
}