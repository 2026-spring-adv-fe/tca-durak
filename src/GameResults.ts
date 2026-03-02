import { durationFormatter} from 'human-readable';

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
//helper functions

const formatGameDuration = durationFormatter<string>();
const formatLastPlayed = durationFormatter<string>({
    allowMultiples: ["y", "mo", "d",],
});

