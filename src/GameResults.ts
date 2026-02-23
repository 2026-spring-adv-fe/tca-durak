//exported type definitions
export type GameResult = {
    winner: string;
    players: string[];

    start: string;
    end: string;
};

export type GeneralFacts = {
    lastPlayed: string;
    totalGames: number;
    shortestGame: string;
    longestGame: string;
}
//exported functions
export const generalFacts = (games: GameResult[]): GeneralFacts => {

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