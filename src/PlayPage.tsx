import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";
import type { GameResult, WinnerEvent } from "./GameResults";
import durakImg from "./img/durak.jpg";

type PlayProps = {
  addNewGameResult: (g: GameResult) => void;
  setTitle: (t: string) => void;
  players: string[];
  trumpSuit?: string | null;
  dealer?: string | null;
  getDurakCount?: (player: string) => number;
};

export const Play: React.FC<PlayProps> = ({
  addNewGameResult,
  setTitle,
  players,
  trumpSuit,
  dealer,
  getDurakCount,
}) => {
  const nav = useNavigate();
  const [startTimestamp] = useState(new Date().toISOString());
  const [finishedPlayers, setFinishedPlayers] = useState<string[]>([]);
  const [winnerEvents, setWinnerEvents] = useState<WinnerEvent[]>([]);
  const [deckEmptyAt, setDeckEmptyAt] = useState<string | null>(null);
  const [durakPlayer, setDurakPlayer] = useState<string | null>(null);
  const [durakCountText, setDurakCountText] = useState("");

  const modalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    setTitle("Play");
  }, [setTitle]);

  const activePlayers = useMemo(
    () => players.filter((player) => !finishedPlayers.includes(player)),
    [players, finishedPlayers]
  );

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const getOrdinal = (n: number) => {
    if (n % 100 >= 11 && n % 100 <= 13) return `${n}th`;
    if (n % 10 === 1) return `${n}st`;
    if (n % 10 === 2) return `${n}nd`;
    if (n % 10 === 3) return `${n}rd`;
    return `${n}th`;
  };

  const markWinner = (player: string) => {
    if (finishedPlayers.includes(player) || !!durakPlayer) {
      return;
    }

    const timestamp = new Date().toISOString();
    const newWinnerEvent: WinnerEvent = { player, timestamp };
    const updatedFinishedPlayers = [...finishedPlayers, player];
    const updatedWinnerEvents = [...winnerEvents, newWinnerEvent];

    setFinishedPlayers(updatedFinishedPlayers);
    setWinnerEvents(updatedWinnerEvents);

    const remainingPlayers = players.filter(
      (currentPlayer) => !updatedFinishedPlayers.includes(currentPlayer)
    );

    if (remainingPlayers.length === 1) {
      const loser = remainingPlayers[0];
      setDurakPlayer(loser);

      if (getDurakCount) {
        const nextCount = getDurakCount(loser) + 1;
        setDurakCountText(`${loser} is durak for the ${getOrdinal(nextCount)} time.`);
      } else {
        setDurakCountText(`${loser} is the durak in this game.`);
      }

      addNewGameResult({
        loser,
        players,
        start: startTimestamp,
        end: new Date().toISOString(),
        trumpSuit: trumpSuit ?? undefined,
        dealer: dealer ?? undefined,
        deckEmptyAt: deckEmptyAt ?? undefined,
        winnerEvents: updatedWinnerEvents,
      });

      modalRef.current?.showModal();
    }
  };

  const markDeckEmpty = () => {
    if (deckEmptyAt) return;
    setDeckEmptyAt(new Date().toISOString());
  };

  const closeModalAndGoHome = () => {
    modalRef.current?.close();
    nav(-2);
  };

  return (
    <div className="w-full px-2 sm:px-4 lg:px-6 pb-10">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold">round in progress</h1>
          <p className="mt-2 text-base-content/70">
            mark each player when they run out of cards
          </p>
        </div>

        <div className="card bg-base-100 shadow-lg border border-base-300">
          <div className="card-body p-4 sm:p-6">
            <button
              type="button"
              className={`btn ${deckEmptyAt ? "btn-disabled" : "btn-outline"}`}
              onClick={markDeckEmpty}
              disabled={!!deckEmptyAt}
            >
              {deckEmptyAt ? "deck is empty" : "mark deck empty"}
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="card bg-base-100 shadow-lg border border-base-300">
            <div className="card-body p-4 sm:p-6">
              <h2 className="card-title text-2xl">who is already out?</h2>
              <p className="text-sm text-base-content/70 mt-1">
                tap a player when they have no cards left
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {players.map((player) => {
                  const isFinished = finishedPlayers.includes(player);
                  const winnerInfo = winnerEvents.find((entry) => entry.player === player);

                  return (
                    <button
                      key={player}
                      type="button"
                      onClick={() => markWinner(player)}
                      disabled={isFinished || !!durakPlayer}
                      className={`card border text-left transition-all ${
                        isFinished
                          ? "border-base-content bg-base-200"
                          : "border-base-300 bg-base-100 hover:border-base-content/50 hover:-translate-y-0.5"
                      } ${durakPlayer ? "cursor-default" : "cursor-pointer"}`}
                    >
                      <div className="card-body p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-bold text-lg">{player}</h3>
                            <p className="text-sm text-base-content/70 mt-1">
                              {isFinished ? "Finished" : "Still in game"}
                            </p>
                          </div>

                          <input
                            type="checkbox"
                            className="checkbox pointer-events-none"
                            checked={isFinished}
                            readOnly
                          />
                        </div>

                        {winnerInfo && (
                          <p className="text-sm mt-3 text-base-content/70">
                            Finished at{" "}
                            <span className="font-semibold">
                              {formatTime(winnerInfo.timestamp)}
                            </span>
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card bg-base-100 shadow-lg border border-base-300">
              <div className="card-body p-4 sm:p-6">
                <h2 className="card-title text-xl">Round status</h2>

                <div className="mt-4 grid gap-3 rounded-2xl bg-base-200/60 p-4 text-sm sm:text-base">
                  <p>
                    <span className="font-semibold">Started:</span>{" "}
                    {formatTime(startTimestamp)}
                  </p>
                  <p>
                    <span className="font-semibold">Dealer:</span>{" "}
                    {dealer ?? "not selected"}
                  </p>
                  <p>
                    <span className="font-semibold">Trump suit:</span>{" "}
                    <span className="capitalize">{trumpSuit ?? "not selected"}</span>
                  </p>
                  <p>
                    <span className="font-semibold">Deck empty:</span>{" "}
                    {deckEmptyAt ? formatTime(deckEmptyAt) : "Not marked yet"}
                  </p>
                  <p>
                    <span className="font-semibold">Players out:</span>{" "}
                    {finishedPlayers.length}
                  </p>
                  <p>
                    <span className="font-semibold">Still playing:</span>{" "}
                    {activePlayers.length > 0 ? activePlayers.join(", ") : "Round complete"}
                  </p>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg border border-base-300">
              <div className="card-body p-4 sm:p-6">
                <h2 className="card-title text-xl">Finish order</h2>

                {winnerEvents.length === 0 ? (
                  <p className="text-base-content/70 mt-2">No winners marked yet.</p>
                ) : (
                  <ul className="timeline timeline-vertical timeline-compact mt-3">
                    {winnerEvents.map((entry, index) => (
                      <li key={`${entry.player}-${entry.timestamp}`}>
                        {index > 0 && <hr className="bg-base-300" />}
                        <div className="timeline-middle">
                          <div className="badge badge-neutral badge-sm">{index + 1}</div>
                        </div>
                        <div className="timeline-end pb-4 pl-4 w-full">
                          <div className="rounded-2xl border border-base-300 bg-base-100 px-4 py-3">
                            <p className="font-semibold">{entry.player}</p>
                            <p className="text-sm text-base-content/70">
                              Finished at {formatTime(entry.timestamp)}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>

        <dialog ref={modalRef} className="modal">
          <div className="modal-box max-w-md">
            <div className="flex justify-center mb-4">
              <img
                src={durakImg}
                alt="durak"
                className="max-h-56 rounded-2xl object-cover"
              />
            </div>

            <h3 className="font-bold text-2xl text-center">
              {durakPlayer ? `${durakPlayer} is Durak` : "Game over"}
            </h3>

            <p className="py-3 text-center text-base-content/80">
              {durakCountText}
            </p>

            <div className="modal-action">
              <button
                type="button"
                className="btn btn-neutral w-full"
                onClick={closeModalAndGoHome}
              >
                haha go home
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};