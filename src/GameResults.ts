import { durationFormatter} from 'human-readable';

//exported type definitions
export type GameResult = {
    winner: string;
    players: string[];

    start: string;
    end: string;
};

export type LeaderboardEntry = {
    wins: number;
    losses: number;
    avg: string;
    name: string;
};

export type GeneralFacts = {
    lastPlayed: string;
    totalGames: number;
    shortestGame: string;
    longestGame: string;
}
//exported functions
export const getGeneralFacts = (games: GameResult[]): GeneralFacts => {

    if (games.length === 0) {
        return {
            lastPlayed: "N/A",
            totalGames: 0,
            shortestGame: "N/A",
            longestGame: "N/A",
        }
    }
    const now = Date.now();

    const gamesLastPlayedAgoInMS = games.map(
        x => now - Date.parse(x.end)
    );

    const mostRecentlyPlayedInMS = Math.min(
        ...gamesLastPlayedAgoInMS
    );
    const gameDurationInMSec = games.map(
        x => Date.parse(x.end) - Date.parse(x.start)
    );
    // console.log(
    //     gamesLastPlayedAgoInMS
    // );
    return {
        lastPlayed: `${formatLastPlayed(mostRecentlyPlayedInMS)} ago`,
        totalGames: games.length,
        shortestGame: formatGameDuration(Math.min(...gameDurationInMSec)),
        longestGame: formatGameDuration(Math.max(...gameDurationInMSec)),

    }
};

export const getLeaderboard = (
    games: GameResult[]
): LeaderboardEntry[] => getPreviousPlayers(games)
    .map(
        x => ({
            ...getLeaderboardEntry(
                games,
                x,
            )
        })
    )
    .sort(
        (a, b) => a.avg == b.avg
            ? a.wins == 0 && b.wins == 0
                ? (a.wins + a.losses) - (b.wins + b.losses)
                : (b.wins + b.losses) - (a.wins + a.losses)
            : Number.parseFloat(b.avg) - Number.parseFloat(a.avg)
    )
;
//helper functions

const formatGameDuration = durationFormatter<string>();
const formatLastPlayed = durationFormatter<string>({
    allowMultiples: ["y", "mo", "d",],
});


const getLeaderboardEntry = (
    games: GameResult[],
    player: string,
): LeaderboardEntry => {

    const countOfWins = games.filter(
        x => x.winner == player
    ).length;

    const totalGames = games.filter(
        x => x.players.some(
            y => y == player
        )
    ).length;

    const avg = totalGames > 0
        ? countOfWins / totalGames
        : 0
    ;

    return {
        wins: countOfWins,
        losses: totalGames - countOfWins,
        avg: `${avg.toFixed(3)}`,
        name: player

    };
};

 export const getPreviousPlayers = (
    games: GameResult[]
) => games 
    .flatMap(
        x => x.players
    )
    .filter(
        (x, i, a) => i == a.findIndex(
            y => y == x
        )
    )
    .sort(
        (a, b) => a.localeCompare(b)
    )
;
