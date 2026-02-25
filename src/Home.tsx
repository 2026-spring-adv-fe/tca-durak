import { useNavigate } from "react-router";
import type { GeneralFacts } from "./GameResults";
 type HomeProps = {
    generalFacts: GeneralFacts;
    popularMove: string;
};

export const Home: React.FC<HomeProps> = ({
    generalFacts,
    popularMove
}) => {
    console.log('generalFacts:', generalFacts);
    console.log('popularMove:', popularMove);
    const nav = useNavigate();
    //code
    return (
        <>
        <h1>Home</h1>
        <button className="btn btn-primary btn-outline" onClick={
            () => nav('/Setup')
        }>Setup a Game</button>
        </>
    );
};