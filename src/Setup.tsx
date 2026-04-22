import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";

type SetupProps = {
  setTitle: (t: string) => void;
  previousPlayers: string[];
  setCurrentPlayers: (players: string[]) => void;
  setCurrentTrumpSuit: (suit: string | null) => void;
  setCurrentDealer: (dealer: string | null) => void;
};

type PlayerOption = {
  name: string;
  checked: boolean;
};

const SUITS = [
  { suit: "hearts", icon: "♥" },
  { suit: "clubs", icon: "♣" },
  { suit: "diamonds", icon: "♦" },
  { suit: "spades", icon: "♠" },
];

export const Setup: React.FC<SetupProps> = ({
  setTitle,
  previousPlayers,
  setCurrentPlayers,
  setCurrentTrumpSuit,
  setCurrentDealer,
}) => {
  const nav = useNavigate();

  const [availablePlayers, setAvailablePlayers] = useState<PlayerOption[]>(
    previousPlayers.map((name) => ({
      name,
      checked: false,
    }))
  );

  const [newPlayerName, setNewPlayerName] = useState("");
  const [dealer, setDealer] = useState<string | null>(null);
  const [trumpSuit, setTrumpSuit] = useState<string | null>(null);

  useEffect(() => {
    setTitle("Setup");
  }, [setTitle]);

  const trimmedPlayerName = newPlayerName.trim();

  const dupePlayerName = availablePlayers.some(
    (player) => player.name.toLowerCase() === trimmedPlayerName.toLowerCase()
  );

  const selectedPlayers = useMemo(
    () =>
      availablePlayers
        .filter((player) => player.checked)
        .map((player) => player.name),
    [availablePlayers]
  );

  const enoughPlayers = selectedPlayers.length >= 2;
  const dealerIsValid = dealer !== null && selectedPlayers.includes(dealer);
  const trumpChosen = !!trumpSuit;
  const canStart = enoughPlayers && dealerIsValid && trumpChosen;

  const addPlayer = () => {
    if (!trimmedPlayerName || dupePlayerName) {
      return;
    }

    setAvailablePlayers((prev) =>
      [...prev, { name: trimmedPlayerName, checked: true }].sort((a, b) =>
        a.name.localeCompare(b.name)
      )
    );

    setNewPlayerName("");
  };

  const togglePlayer = (playerName: string) => {
    setAvailablePlayers((prev) =>
      prev.map((player) =>
        player.name === playerName
          ? { ...player, checked: !player.checked }
          : player
      )
    );

    const clickedPlayer = availablePlayers.find(
      (player) => player.name === playerName
    );

    if (clickedPlayer?.checked && dealer === playerName) {
      setDealer(null);
    }
  };

 const startGame = () => {
  if (!canStart) {
    return;
  }

  setCurrentPlayers(selectedPlayers);
  setCurrentTrumpSuit(trumpSuit);
  setCurrentDealer(dealer);

  nav("/play");
};

  const step1Done = enoughPlayers;
  const step2Done = dealerIsValid;
  const step3Done = trumpChosen;

  const getStepBadgeClass = (done: boolean, active: boolean) => {
    if (done) {
      return "badge-neutral";
    }

    if (active) {
      return "badge-outline";
    }

    return "badge-ghost";
  };

  return (
    <div className="w-full px-2 sm:px-4 lg:px-6 pb-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold">GAME SETUP</h1>
        </div>

        <ul className="timeline timeline-vertical timeline-compact w-full">
          <li>
            <div className="timeline-middle">
              <div className={`badge badge-lg ${getStepBadgeClass(step1Done, true)}`}>
                {step1Done ? "1" : "1"}
              </div>
            </div>
            <div className="timeline-end w-full pl-4 sm:pl-6 pb-8">
              <div className="card w-full bg-base-100 shadow-md border border-base-300">
                <div className="card-body p-4 sm:p-6">
                  <h2 className="card-title text-xl">add and choose players</h2>
                  <p className="text-sm text-base-content/70">
                    add a new player if needed, then select at least two players for the game
                  </p>

                  <div className="join w-full mt-3">
                    <input
                      type="text"
                      className={`input input-bordered join-item w-full ${
                        dupePlayerName ? "input-error" : ""
                      }`}
                      placeholder="New player name"
                      value={newPlayerName}
                      onChange={(e) => setNewPlayerName(e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn join-item"
                      onClick={addPlayer}
                      disabled={!trimmedPlayerName || dupePlayerName}
                    >
                      add
                    </button>
                  </div>

                  {dupePlayerName && (
                    <p className="mt-2 text-sm text-error">this player already exists((</p>
                  )}

                  <div className="mt-5 grid gap-3">
                    {availablePlayers.length === 0 ? (
                      <p className="text-base-content/70">no players yet.</p>
                    ) : (
                      availablePlayers.map((player) => (
                        <label
                          key={player.name}
                          className="flex cursor-pointer items-center gap-3 rounded-2xl border border-base-300 px-4 py-3 transition hover:bg-base-200/60"
                        >
                          <input
                            type="checkbox"
                            className="checkbox checkbox-sm sm:checkbox-md"
                            checked={player.checked}
                            onChange={() => togglePlayer(player.name)}
                          />
                          <span className="text-base font-medium">{player.name}</span>
                        </label>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li>
            <div className="timeline-middle">
              <div className={`badge badge-lg ${getStepBadgeClass(step2Done, step1Done && !step2Done)}`}>
                {step2Done ? "2" : "2"}
              </div>
            </div>
            <div className="timeline-end w-full pl-4 sm:pl-6 pb-8">
              <div className="card w-full bg-base-100 shadow-md border border-base-300">
                <div className="card-body p-4 sm:p-6">
                  <h2 className="card-title text-xl">choose dealer</h2>
                  <p className="text-sm text-base-content/70">
                    pick which selected player will deal the cards
                  </p>

                  {!enoughPlayers ? (
                    <div className="alert mt-4">
                      <span>select at least two players first.</span>
                    </div>
                  ) : (
                    <div className="mt-4 flex flex-wrap gap-3">
                      {selectedPlayers.map((player) => (
                        <button
                          key={player}
                          type="button"
                          className={`btn ${dealer === player ? "btn-neutral" : "btn-outline"}`}
                          onClick={() => setDealer(player)}
                        >
                          {player}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </li>

          <li>
            <div className="timeline-middle">
              <div className={`badge badge-lg ${getStepBadgeClass(step3Done, step2Done && !step3Done)}`}>
                {step3Done ? "3" : "3"}
              </div>
            </div>
            <div className="timeline-end w-full pl-4 sm:pl-6 pb-8">
              <div className="card w-full bg-base-100 shadow-md border border-base-300">
                <div className="card-body p-4 sm:p-6">
                  <h2 className="card-title text-xl">choose trump suit</h2>
                  <p className="text-sm text-base-content/70">
                    pick the trump suit for this round.
                  </p>

                  <div className="mt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-5">
                    {SUITS.map(({ suit, icon }) => (
                      <button
                        key={suit}
                        type="button"
                        onClick={() => setTrumpSuit(suit)}
                        className={`flex h-16 w-16 items-center justify-center rounded-full border-2 text-3xl transition duration-200 sm:h-20 sm:w-20 sm:text-4xl ${
                          trumpSuit === suit
                            ? "border-base-content bg-base-200 scale-105"
                            : "border-base-300 hover:border-base-content/50"
                        } ${
                          suit === "hearts" || suit === "diamonds"
                            ? "text-red-500"
                            : "text-base-content"
                        }`}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li>
            <div className="timeline-middle">
              <div className={`badge badge-lg ${getStepBadgeClass(canStart, step3Done && !canStart)}`}>
                {canStart ? "4" : "4"}
              </div>
            </div>
            <div className="timeline-end w-full pl-4 sm:pl-6">
              <div className="card w-full bg-base-100 shadow-lg border border-base-300">
                <div className="card-body p-4 sm:p-6">
                  <h2 className="card-title text-xl">start game</h2>
                  <p className="text-sm text-base-content/70">
                    review the setup and begin the round
                  </p>

                  <div className="mt-4 grid gap-2 rounded-2xl bg-base-200/60 p-4 text-sm sm:text-base">
                    <p>
                      <span className="font-semibold">players:</span>{" "}
                      {selectedPlayers.length > 0 ? selectedPlayers.join(", ") : "Not selected"}
                    </p>
                    <p>
                      <span className="font-semibold">dealer:</span> {dealer ?? "Not selected"}
                    </p>
                    <p>
                      <span className="font-semibold">trump suit:</span>{" "}
                      <span className="capitalize">{trumpSuit ?? "Not selected"}</span>
                    </p>
                  </div>

                  <button
                    type="button"
                    className="btn btn-neutral btn-lg mt-5 w-full"
                    onClick={startGame}
                    disabled={!canStart}
                  >
                    Play
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};