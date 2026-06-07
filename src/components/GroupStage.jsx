import MatchCard from "./MatchCard";

export default function GroupStage({
  groupName,
  matches,
  table,
  updateResult,
}) {
  return (
    <div
      style={{
        border: "2px solid #ddd",
        borderRadius: "12px",
        padding: "15px",
        marginBottom: "25px",
        background: "white",
      }}
    >
      <h2>Grupo {groupName}</h2>

      <div
        style={{
          overflowX: "auto",
        }}
      >
        <table border="1">
          <thead>
            <tr>
              <th>Time</th>
              <th>P</th>
              <th>V</th>
              <th>E</th>
              <th>D</th>
            </tr>
          </thead>

          <tbody>
            {Object.entries(table)
              .sort(
                (a, b) =>
                  b[1].points - a[1].points
              )
              .map(([team, stats]) => (
                <tr key={team}>
                  <td>{team}</td>
                  <td>{stats.points}</td>
                  <td>{stats.wins}</td>
                  <td>{stats.draws}</td>
                  <td>{stats.losses}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <br />

      {matches.map((match, idx) => (
        <MatchCard
          key={idx}
          match={match}
          onHomeWin={() =>
            updateResult(
              groupName,
              idx,
              "HOME"
            )
          }
          onDraw={() =>
            updateResult(
              groupName,
              idx,
              "DRAW"
            )
          }
          onAwayWin={() =>
            updateResult(
              groupName,
              idx,
              "AWAY"
            )
          }
          onRandom={() =>
            updateResult(
              groupName,
              idx,
              "RANDOM"
            )
          }
        />
      ))}
    </div>
  );
}