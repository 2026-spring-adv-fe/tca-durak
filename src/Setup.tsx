import { useEffect } from "react";
import { useNavigate } from "react-router";

type SetupProps = {
    setTitle: (t: string) => void;
    previousPlayers: string[];
}

export const Setup: React.FC<SetupProps> = ({ setTitle, previousPlayers }) => {
    console.log(previousPlayers);
    const nav = useNavigate();
    useEffect(
        () => setTitle("Setup Screen"),
        [],
    );
    //code
    return (
        <>
       
        <button className="btn  btn-soft btn-lg w-full lg:w-64" onClick={
            () => nav('/PlayPage')
        }>Play the game</button>
        </>
    );
};