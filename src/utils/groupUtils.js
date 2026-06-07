export function generateMatches(teams) {
  const matches = [];

  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      matches.push({
        home: teams[i],
        away: teams[j],
        result: null
      });
    }
  }

  return matches;
}

export function initializeTable(teams) {
  const table = {};

  teams.forEach(team => {
    table[team] = {
      points: 0,
      wins: 0,
      draws: 0,
      losses: 0
    };
  });

  return table;
}