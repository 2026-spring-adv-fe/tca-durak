import { durationFormatter } from "human-readable";

export type GameResult = {
    loser: string;
    players: string[];
    start: string;
    end: string;
};

export type LeaderboardEntry = {
    escapes: number;
    durakTimes: number;
    escapeRate: string;
    name: string;
};

export type GeneralFacts = {
    lastPlayed: string;
    totalGames: number;
    shortestGame: string;
    longestGame: string;
};

export type AvgGameDuration = {
    numberOfPlayers: number;
    numberOfGames: number;
    avgGameDuration: string;
};

export type gameCountByMonth = {
    month: string;
    count: number;
};

export const getMostDurak = (leaderboard: LeaderboardEntry[]) => {
    if (leaderboard.length === 0) return null;

    return leaderboard.reduce((max, current) =>
        current.durakTimes > max.durakTimes ? current : max
    );
};
export const getGeneralFacts = (games: GameResult[]): GeneralFacts => {
    if (games.length === 0) {
        return {
            lastPlayed: "N/A",
            totalGames: 0,
            shortestGame: "N/A",
            longestGame: "N/A",
        };
    }

    const now = Date.now();

    const gamesLastPlayedAgoInMilliseconds = games.map(
        x => now - Date.parse(x.end)
    );

    const mostRecentlyPlayedInMilliseconds = Math.min(
        ...gamesLastPlayedAgoInMilliseconds
    );

    const gameDurationsInMilliseconds = games.map(
        x => Date.parse(x.end) - Date.parse(x.start)
    );

    return {
        lastPlayed: `${formatLastPlayed(
            mostRecentlyPlayedInMilliseconds
        )} ago`,
        totalGames: games.length,
        shortestGame: formatGameDuration(
            Math.min(...gameDurationsInMilliseconds)
        ),
        longestGame: formatGameDuration(
            Math.max(...gameDurationsInMilliseconds)
        ),
    };
};



export const getLeaderboard = (
    games: GameResult[]
): LeaderboardEntry[] => getPreviousPlayers(games)
    .map(
        player => getLeaderboardEntry(
            games,
            player
        )
    )
    .sort((a, b) =>
        a.escapeRate === b.escapeRate
            ? a.escapes === 0 && b.escapes === 0
                ? (a.escapes + a.durakTimes) - (b.escapes + b.durakTimes)
                : (b.escapes + b.durakTimes) - (a.escapes + a.durakTimes)
            : Number.parseFloat(b.escapeRate) - Number.parseFloat(a.escapeRate)
    );

export const getPreviousPlayers = (
    games: GameResult[]
) => games
    .flatMap(
        x => x.players
    )
    .filter(
        (x, i, a) => i === a.findIndex(
            y => y === x
        )
    )
    .sort(
        (a, b) => a.localeCompare(b)
    );

    export const getAvgGameDurationsByPlayerCount = (results: GameResult[]): AvgGameDuration[] => {

    const grouped = Map.groupBy(
        results,

        (x) => x.players.length,
        // ({ players }) => players.length,
        
        // (x) => x.winner,
        // (x) => new Date(x.start).getMonth(),
        // (x) => new Date(x.start).toLocaleString(
        //     'default',
        //     {
        //         month: 'short',
        //     },
        // ),
    );

    // console.log(
    //     [
    //         ...grouped
    //     ]
    // );

    return [
        ...grouped
    ]
        .map(
            x => ({
                numberOfPlayers: x[0],
                numberOfGames: x[1].length,
                avgGameDuration: formatGameDuration(getAvgGameDurationInMilliseconds(x[1])),
            })
        )
        .sort(
            (a, b) => a.numberOfPlayers - b.numberOfPlayers
        )
    ;
};
export const getGameCountByMonth = (results: GameResult[]): gameCountByMonth[] => {
    const grouped = Map.groupBy(
        results,
        (x) => new Date(x.start).toLocaleString(
            'default',
            {
                month: 'short',
            }
        ),
    );

    // console.log(
    //     grouped
    // );

    return [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ]
        .map(
            x => ({
                month: x,
                count: grouped.get(x)?.length ?? 0
            })
        )
    ;
};


const formatGameDuration = durationFormatter<string>();

const formatLastPlayed = durationFormatter<string>({
    allowMultiples: ["y", "mo", "d"],
});

const getLeaderboardEntry = (
    games: GameResult[],
    player: string,
): LeaderboardEntry => {
    const durakTimes = games.filter(
        x => x.loser === player
    ).length;

    const totalGames = games.filter(
        x => x.players.some(
            y => y === player
        )
    ).length;

    const escapes = totalGames - durakTimes;

    const escapeRate = totalGames > 0
        ? escapes / totalGames
        : 0;

    return {
        escapes,
        durakTimes,
        escapeRate: `${escapeRate.toFixed(3)}`,
        name: player,
    };
};
const getGameDurationInMilliseconds = (result: GameResult) => Date.parse(result.end) 
    - Date.parse(result.start)
;

const getAvgGameDurationInMilliseconds = (results: GameResult[]) => {

    // Add up the game durations for a total, simple reduce.
    const sum = results.reduce(
        (acc, x) => acc + getGameDurationInMilliseconds(x),
        0,
    );

    // Avg is total divided by number of games, accounting for divide by zero...
    return results.length > 0
        ? sum / results.length
        : 0
    ;
};