import './score.css';

export const Score = ({ score }) => {
    return (
        <div className="betterScore__container">
            <img className="betterScore__img" src="https://em-content.zobj.net/source/microsoft/379/crown_1f451.png" alt="" />
            <p className="betterScore__title">Meilleur Score</p>
            <div className="betterScore__content">
                <p>{score}</p>
            </div>
        </div>
    );
}