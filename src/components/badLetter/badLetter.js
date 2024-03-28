export const BadLetter = ({ lettresWrong }) => {
    return (
        <div>
            <h3>Wrong letters</h3>
            {lettresWrong.map((letter, index) => {
                return <span key={index}>{letter} </span>
            })}
        </div>
    );
}