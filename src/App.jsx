import { useState } from "react";
import { groups } from "./data/teams";
import GroupStage from "./components/GroupStage";
import KnockoutStage from "./components/KnockoutStage";
import fotoDaniel from "./assets/daniel.jpeg";

import {
  generateMatches,
  initializeTable,
} from "./utils/groupUtils";

import {
  getQualifiedTeams,
  allGroupMatchesPlayed,
} from "./utils/knockoutUtils";

function createTournament() {
  const tournament = {};

  Object.entries(groups).forEach(([group, teams]) => {
    tournament[group] = {
      matches: generateMatches(teams),
      table: initializeTable(teams),
    };
  });

  return tournament;
}

function createMatches(teams) {
  const matches = [];

  for (let i = 0; i < teams.length; i += 2) {
    matches.push({
      team1: teams[i],
      team2: teams[i + 1],
      winner: null,
    });
  }

  return matches;
}

export default function App() {
  const [tournament, setTournament] =
    useState(createTournament());

  const [qualified, setQualified] =
    useState([]);

  const [showKnockout, setShowKnockout] =
    useState(false);

  const [round32, setRound32] =
    useState([]);

  const [round16, setRound16] =
    useState([]);

  const [quarters, setQuarters] =
    useState([]);

  const [semis, setSemis] =
    useState([]);

  const [finalMatch, setFinalMatch] =
    useState([]);

  const [champion, setChampion] =
    useState(null);

  function updateResult(
    groupName,
    matchIndex,
    result
  ) {
    const copy =
      structuredClone(tournament);

    const match =
      copy[groupName].matches[
        matchIndex
      ];

    if (match.result) return;

    if (result === "RANDOM") {
      const options = [
        "HOME",
        "DRAW",
        "AWAY",
      ];

      result =
        options[
          Math.floor(
            Math.random() *
              options.length
          )
        ];
    }

    match.result = result;

    const table =
      copy[groupName].table;

    if (result === "HOME") {
      table[match.home].points += 3;
      table[match.home].wins += 1;

      table[match.away].losses += 1;
    }

    if (result === "AWAY") {
      table[match.away].points += 3;
      table[match.away].wins += 1;

      table[match.home].losses += 1;
    }

    if (result === "DRAW") {
      table[match.home].points += 1;
      table[match.away].points += 1;

      table[match.home].draws += 1;
      table[match.away].draws += 1;
    }

    setTournament(copy);
  }

  function generateKnockout() {
    if (
      !allGroupMatchesPlayed(
        tournament
      )
    ) {
      alert(
        "Complete todos os jogos da fase de grupos."
      );
      return;
    }

    const teams =
      getQualifiedTeams(
        tournament
      );

    setQualified(teams);

    setRound32(
      createMatches(teams)
    );

    setShowKnockout(true);
  }

  function nextRound(
    matches,
    setter
  ) {
    if (
      matches.some(
        (match) =>
          !match.winner
      )
    ) {
      alert(
        "Finalize todos os jogos."
      );
      return;
    }

    const winners =
      matches.map(
        (match) =>
          match.winner
      );

    setter(
      createMatches(winners)
    );
  }

  function chooseRound32Winner(
    index,
    winner
  ) {
    const copy = [...round32];

    copy[index].winner =
      winner;

    setRound32(copy);
  }

  function chooseRound16Winner(
    index,
    winner
  ) {
    const copy = [...round16];

    copy[index].winner =
      winner;

    setRound16(copy);
  }

  function chooseQuarterWinner(
    index,
    winner
  ) {
    const copy = [...quarters];

    copy[index].winner =
      winner;

    setQuarters(copy);
  }

  function chooseSemiWinner(
    index,
    winner
  ) {
    const copy = [...semis];

    copy[index].winner =
      winner;

    setSemis(copy);
  }

  function chooseFinalWinner(
    index,
    winner
  ) {
    const copy =
      [...finalMatch];

    copy[index].winner =
      winner;

    setFinalMatch(copy);

    setChampion(winner);
  }

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >

      <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "25px",
    flexWrap: "wrap",
    background: "white",
    padding: "15px",
    borderRadius: "12px",
  }}
>
  <img
    src={fotoDaniel}
    alt="Daniel"
    style={{
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      objectFit: "cover",
      border: "3px solid gold",
    }}
  />

  <div>
    <h2
      style={{
        margin: 0,
      }}
    >
      Daniel Moura
    </h2>

    <p
      style={{
        margin: "5px 0 0 0",
        color: "#666",
      }}
    >
      Criador do Simulador da Copa 2026 
    </p>
  </div>
</div>
      <h1>
         Copa do Mundo 2026
      </h1>

      {!showKnockout && (
        <>
          {Object.entries(
            tournament
          ).map(
            ([groupName, data]) => (
              <GroupStage
                key={groupName}
                groupName={
                  groupName
                }
                matches={
                  data.matches
                }
                table={
                  data.table
                }
                updateResult={
                  updateResult
                }
              />
            )
          )}

          <button
            onClick={
              generateKnockout
            }
            style={{
              padding:
                "12px 20px",
              fontSize:
                "18px",
            }}
          >
            Gerar Mata-Mata
          </button>
        </>
      )}

      {showKnockout && (
        <>
          <h2>
            Classificados
          </h2>

          <ol>
            {qualified.map(
              (team) => (
                <li key={team}>
                  {team}
                </li>
              )
            )}
          </ol>

          {round32.length >
            0 && (
            <>
              <KnockoutStage
                stageName="32 Avos"
                matches={
                  round32
                }
                chooseWinner={
                  chooseRound32Winner
                }
              />

              <button
                onClick={() =>
                  nextRound(
                    round32,
                    setRound16
                  )
                }
              >
                Gerar Oitavas
              </button>
            </>
          )}

          {round16.length >
            0 && (
            <>
              <KnockoutStage
                stageName="Oitavas"
                matches={
                  round16
                }
                chooseWinner={
                  chooseRound16Winner
                }
              />

              <button
                onClick={() =>
                  nextRound(
                    round16,
                    setQuarters
                  )
                }
              >
                Gerar Quartas
              </button>
            </>
          )}

          {quarters.length >
            0 && (
            <>
              <KnockoutStage
                stageName="Quartas"
                matches={
                  quarters
                }
                chooseWinner={
                  chooseQuarterWinner
                }
              />

              <button
                onClick={() =>
                  nextRound(
                    quarters,
                    setSemis
                  )
                }
              >
                Gerar Semifinal
              </button>
            </>
          )}

          {semis.length >
            0 && (
            <>
              <KnockoutStage
                stageName="Semifinal"
                matches={
                  semis
                }
                chooseWinner={
                  chooseSemiWinner
                }
              />

              <button
                onClick={() =>
                  nextRound(
                    semis,
                    setFinalMatch
                  )
                }
              >
                Gerar Final
              </button>
            </>
          )}

          {finalMatch.length >
            0 && (
            <KnockoutStage
              stageName="Final"
              matches={
                finalMatch
              }
              chooseWinner={
                chooseFinalWinner
              }
            />
          )}

         {champion && (
  <div
    style={{
      marginTop: "40px",
      display: "flex",
      justifyContent: "center"
    }}
  >
    <div
      style={{
        width: "600px",
        background: "#ffffff",
        border: "4px solid gold",
        borderRadius: "20px",
        padding: "30px",
        textAlign: "center",
        boxShadow: "0 0 15px rgba(0,0,0,0.2)"
      }}
    >
      <h1> COPA DO MUNDO 2026</h1>

      <h2>CAMPEÃO</h2>

      <div
        style={{
          fontSize: "42px",
          fontWeight: "bold",
          margin: "20px 0"
        }}
      >
        {champion}
      </div>

      <hr />

      <h3>Minha Simulação</h3>

      <table
        style={{
          width: "100%",
          marginTop: "20px",
          borderCollapse: "collapse"
        }}
      >
        <tbody>
          <tr>
            <td><strong>Campeão</strong></td>
            <td>{champion}</td>
          </tr>

          <tr>
            <td><strong>Finalistas</strong></td>
            <td>
              {finalMatch[0]?.team1} x {finalMatch[0]?.team2}
            </td>
          </tr>

          <tr>
            <td><strong>Semifinalistas</strong></td>
            <td>
              {semis.flatMap(m => [m.team1, m.team2]).join(", ")}
            </td>
          </tr>
        </tbody>
      </table>

      <div
        style={{
           padding: "15px",
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
            boxSizing: "border-box"
        }}
      >
        Simulado em Meu Simulador da Copa 
      </div>
    </div>
  </div>
)}
        </>
      )}
    </div>
  );
}