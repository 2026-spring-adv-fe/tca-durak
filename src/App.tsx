import "./App.css";
import { HashRouter, Routes, Route } from "react-router";
import { APP_TITLE, Home } from "./Home";
import { Setup } from "./Setup";
import { Play } from "./PlayPage";
import {
  getGeneralFacts,
  getGameCountByMonth,
  getAvgGameDurationsByPlayerCount,
  getLeaderboard,
  getPreviousPlayers,
  type GameResult,
} from "./GameResults";
import { useEffect, useRef, useState } from "react";
import localforage from "localforage";
import { marshall } from "@aws-sdk/util-dynamodb";
import { saveGameToCloud, loadGamesFromCloud } from "./tca-cloud-api";

const DEFAULT_THEME = "light";

const dummyGameResults: GameResult[] = [
  {
    loser: "Harry",
    players: ["Harry", "Hermione", "Ron"],
    start: "2026-01-11T11:55:50.620Z",
    end: "2026-01-11T13:43:50.320Z",
    trumpSuit: "hearts",
    dealer: "Ron",
  },
  {
    loser: "Hermione",
    players: ["Harry", "Hermione", "Ron"],
    start: "2026-02-14T18:23:50.320Z",
    end: "2026-02-14T19:43:50.320Z",
    trumpSuit: "spades",
    dealer: "Harry",
  },
];
console.log(dummyGameResults);

const App = () => {
  const [gameResults, setGameResults] = useState<GameResult[]>([]);
  const [title, setTitle] = useState(APP_TITLE);
  const [theme, setTheme] = useState(DEFAULT_THEME);

  const [currentPlayers, setCurrentPlayers] = useState<string[]>([]);
  const [currentTrumpSuit, setCurrentTrumpSuit] = useState<string | null>(null);
  const [currentDealer, setCurrentDealer] = useState<string | null>(null);

  const [emailInDialog, setEmailInDialog] = useState("foo@bar.com");


  const [emailForCloudApi, setEmailForCloudApi] = useState("");

  const emailDialog = useRef<HTMLDialogElement | null>(null);



  useEffect(() => {
    let ignore = false;

    const loadTheme = async () => {
      const result =
        (await localforage.getItem<string>("theme")) ?? DEFAULT_THEME;
      if (!ignore) {
        setTheme(result);
      }
    };

    loadTheme();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;

    const loadEmail = async () => {
      const result = (await localforage.getItem<string>("email")) ?? "";
      if (!ignore) {
        setEmailInDialog(result);
        setEmailForCloudApi(result);
      }
    };

    loadEmail();

    return () => {
      ignore = true;
    };
  }, []);

useEffect(() => {
  if (!emailForCloudApi) return;

  let ignore = false;

  const loadGames = async () => {
    try {
      const games = await loadGamesFromCloud(
        emailForCloudApi,
        "tca-durak-26s",
      );

      if (!ignore) {
        setGameResults(games);
      }
    } catch (err) {
      console.error("failed to load games:", err);
    }
  };

  loadGames();

  return () => {
    ignore = true;
  };
}, [emailForCloudApi]);
  const addNewGameResult = async (gameResult: GameResult) => {

    if (emailForCloudApi.trim().length > 0) {
        await saveGameToCloud(
              emailForCloudApi,
              "tca-durak-26s",
              gameResult.end,
              gameResult
            );
    }

    setGameResults((prev) => [...prev, gameResult]);
  };

  const generalFacts = getGeneralFacts(gameResults);
  const leaderboard = getLeaderboard(gameResults);
  const avgGameDurationsByPlayerCount =
    getAvgGameDurationsByPlayerCount(gameResults);
  const gameCountByMonthData = getGameCountByMonth(gameResults);

  return (
    <div className="min-h-screen" data-theme={theme}>
      <div className="navbar bg-neutral text-neutral-content overflow-x-hidden flex flex-row">
        <p className="text-xl font-bold text-nowrap">{title}</p>

        <div className="ml-auto flex flex-row">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-7 cursor-pointer"
            onClick={() => {
              if (emailDialog.current) {
                emailDialog.current.showModal();
              }
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>

          <label className="swap swap-rotate ml-3">
            <input
              type="checkbox"
              checked={DEFAULT_THEME !== theme}
              onChange={async () => {
                const result = await localforage.setItem<string>(
                  "theme",
                  theme === DEFAULT_THEME ? "dark" : DEFAULT_THEME
                );
                setTheme(result);
              }}
            />

            <svg
              className="swap-on h-7 w-7 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            <svg
              className="swap-off h-7 w-7 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
        </div>
      </div>

      <div className="p-3">
        <HashRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  generalFacts={generalFacts}
                  avgGameDurationsByPlayerCount={avgGameDurationsByPlayerCount}
                  gameCountByMonth={gameCountByMonthData}
                  leaderboard={leaderboard}
                  gameResults={gameResults}
                  setTitle={setTitle}
                />
              }
            />

            <Route
              path="/setup"
              element={
                <Setup
                    setTitle={setTitle}
                    previousPlayers={getPreviousPlayers(gameResults)}
                    setCurrentPlayers={setCurrentPlayers}
                    setCurrentTrumpSuit={setCurrentTrumpSuit}
                    setCurrentDealer={setCurrentDealer}
                  />
              }
            />

            <Route
              path="/play"
              element={
                <Play
                  setTitle={setTitle}
                  addNewGameResult={addNewGameResult}
                  players={currentPlayers}
                  trumpSuit={currentTrumpSuit}
                  dealer={currentDealer}
                  getDurakCount={(player) =>
                    gameResults.filter((game) => game.loser === player).length
                  }
                />
              }
            />
          </Routes>
        </HashRouter>

        <dialog ref={emailDialog} className="modal">
          <div className="modal-box">
            <h3 className="font-bold pb-4 text-lg">who r u?</h3>

            <input
              type="text"
              placeholder="Type your email here"
              className="input input-bordered w-full max-w-xs"
              value={emailInDialog}
              onChange={(e) => setEmailInDialog(e.target.value)}
            />

            <div className="modal-action">
              <form method="dialog">
                <button
                  className="btn btn-lg"
                  onClick={async () =>
                   { const saveEmail = await localforage.setItem("email", emailInDialog);
                    setEmailForCloudApi(saveEmail);
                   }
                  }
                >
                  save
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default App;