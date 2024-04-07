import './badLetter.css';

export const BadLetter = ({ lettresWrong }) => {
    return (
        <div className="badLetter__container">
            <h2 className="title badLetter__title">Mauvaises Lettres</h2>
            <div className="badLetter__content">
            {lettresWrong.map((letter, index) => {
                return <span className="badLetter__object" key={index}>{letter} </span>
            })}
            </div>
        </div>
    );
}