import { useNavigate } from "react-router";

export const PlayPage = () => {
    const nav = useNavigate();
    //code
    return (
        <>
        <h1>Play Page</h1>
        <button className="btn btn-primary btn-outline" onClick={
            () => nav(-2)
        }>Game over</button>
        </>
    );
};