export default function MatchCard({
  match,
  onHomeWin,
  onDraw,
  onAwayWin,
  onRandom,
}) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "12px",
        marginBottom: "12px",
        background: "white",
      }}
    >
      <h4
        style={{
          marginTop: 0,
        }}
      >
        {match.home} x {match.away}
      </h4>

      {match.result ? (
    <strong>
        {
        match.result === "HOME"
            ? ` ${match.home} venceu`
            : match.result === "AWAY"
            ? ` ${match.away} venceu`
            : " Empate"
        }
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
            onClick={onHomeWin}
          >
            {match.home}
          </button>

          <button
            style={{
              flex: 1,
              minWidth: "120px",
            }}
            onClick={onDraw}
          >
            Empate
          </button>

          <button
            style={{
              flex: 1,
              minWidth: "120px",
            }}
            onClick={onAwayWin}
          >
            {match.away}
          </button>

          <button
            style={{
              flex: 1,
              minWidth: "120px",
            }}
            onClick={onRandom}
          >
            🎲 Sortear
          </button>
        </div>
      )}
    </div>
  );
}