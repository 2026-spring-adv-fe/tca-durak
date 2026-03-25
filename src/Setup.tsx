import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

type SetupProps = {
    setTitle: (t: string) => void;
    previousPlayers: string[];
}

export const Setup: React.FC<SetupProps> = ({ setTitle, previousPlayers }) => {
    const [availablePlayers, setAvaliablePlayers, setCurrentPlayers ] = useState(
        previousPlayers.map(
            x => ({ name: x, checked: false})
        )
    );
    const nav = useNavigate();
    useEffect(
        () => setTitle("Setup Screen"),
        [],
    );
    //code
    return (
        <>
       
        <button className="btn  btn-soft btn-lg w-full lg:w-64" onClick={
            setCurrentPlayers
            () => nav('/PlayPage');

        }
        
        >Play the game</button>
        <div className="mt-4">
            {
                availablePlayers.map(
                    x => (
                        <label className="block mt-2">
                            <input type="checkbox" className="mr-2 size-4"checked={x.checked} onChange={
    () => setAvaliablePlayers(
        availablePlayers.map(
            y => ({
               name: y.name,
                checked: y.name == x.name ? !y.checked : y.checked
            })
        )
    }
                            />
                            {x.name}
                        </label>
                    )
                )
            }
        </div>
        </>
    );
};