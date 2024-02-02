import type {Match, Player} from "./types";

const api = {
  match: {
    list: async (): Promise<Match[]> => {
      return fetch(
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vSM9tyX3AWG1X2ozkR9j86E8FykG0YBSTlVCdJtINaJUj3o5KYY30ifwDahGATJe1A08cXEulYJ8JxN/pub?output=tsv",
        {next: {tags: ["matches"]}},
      )
        .then((res) => res.text())
        .then((text) => {
          return text
            .split("\n")
            .slice(1)
            .map((row) => {
              const [date, team1, team2, goals1, goals2] = row.split("\t");

              return {
                date,
                team1,
                team2,
                goals1: parseInt(goals1),
                goals2: parseInt(goals2),
              };
            });
        });
    },
  },
  player: {
    list: async (): Promise<Player[]> => {
      const matches = await api.match.list();
      const players = new Map<string, Player>();

      for (const {team1, team2, goals1, goals2} of matches) {
        if (!team1 || !team2) break;

        const players1 = team1.split(",");
        const players2 = team2.split(",");

        for (let name of players1) {
          name = name.trim();

          const player = players.get(name) || {
            name,
            matches: 0,
            ties: 0,
            wins: 0,
            losses: 0,
          };

          const didWin: boolean = goals1 > goals2;
          const didTie: boolean = goals1 === goals2;

          player.matches++;
          if (didTie) {
            player.ties += 1;
          } else {
            player.wins += didWin ? 1 : 0;
            player.losses += !didWin ? 1 : 0;
          }

          players.set(name, player);
        }

        for (let name of players2) {
          name = name.trim();

          const player = players.get(name) || {
            name,
            matches: 0,
            ties: 0,
            wins: 0,
            losses: 0,
          };

          const didWin: boolean = goals2 > goals1;
          const didTie: boolean = goals2 === goals1;

          player.matches++;
          if (didTie) {
            player.ties += 1;
          } else {
            player.wins += didWin ? 1 : 0;
            player.losses += !didWin ? 1 : 0;
          }

          players.set(name, player);
        }
      }

      return Array.from(players.values()).sort((a, b) => b.wins - a.wins);
    },
  },
};

export default api;
