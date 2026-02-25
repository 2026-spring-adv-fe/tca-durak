//exported type definitions

type ConnectFourColumn = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type GameResult = {
    winner: string;
    players: string[];

    start: string;
    end: string;

    firstMove: ConnectFourColumn;

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
        lastPlayed: `${mostRecentlyPlayedInMS / 1000 / 3600 / 24} days ago`,
        totalGames: games.length,
        shortestGame: `${Math.min(...gameDurationInMSec) / 1000 / 60}min`,
        longestGame: `${Math.max(...gameDurationInMSec) / 1000 / 60}min`,

    }
};

//helper functions

export const getMostPopularFirstMove = (games: GameResult[]): string => {
    if (games.length === 0) return "N/A";

    const grouped = Map.groupBy(games, game => game.firstMove);

    const maxCount = Math.max(...Array.from(grouped.values()).map(arr => arr.length));

    const mostPopular = Array.from(grouped.entries())
        .filter(([_, arr]) => arr.length === maxCount)
        .map(([col, arr]) => `column${col} (${arr.length})`)
        .sort();

    return mostPopular.join(", ");
};