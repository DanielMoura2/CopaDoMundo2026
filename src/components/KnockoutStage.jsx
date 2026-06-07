export default function KnockoutStage({
  stageName,
  matches,
  chooseWinner,
}) {
  return (
    <div
      style={{
        background: "white",
        padding: "15px",
        borderRadius: "12px",
        marginTop: "20px",
      }}
    >
      <h2>{stageName}</h2>

      {matches.map((match, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "12px",
            marginBottom: "12px",
          }}
        >
          <h3>
            {match.team1} x {match.team2}
          </h3>

          {match.winner ? (
            <strong>
              ✅ {match.winner}
            </strong>
          ) : (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              <button
                style={{
                  flex: 1,
                  minWidth: "120px",
                }}
                onClick={() =>
                  chooseWinner(
                    index,
                    match.team1
                  )
                }
              >
                {match.team1}
              </button>

              <button
                style={{
                  flex: 1,
                  minWidth: "120px",
                }}
                onClick={() =>
                  chooseWinner(
                    index,
                    match.team2
                  )
                }
              >
                {match.team2}
              </button>

              <button
                style={{
                  flex: 1,
                  minWidth: "120px",
                }}
                onClick={() =>
                  chooseWinner(
                    index,
                    Math.random() < 0.5
                      ? match.team1
                      : match.team2
                  )
                }
              >
                🎲 Sortear
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}