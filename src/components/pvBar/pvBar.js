import './pvBar.css';

export const PvBar = ({ pv }) => {
    return (
        <div className='pv__container'>
            <h2 className='title pv__title'>PV</h2>
            < PvPoint key={11} number={11} pv={pv} />
            < PvPoint key={10} number={10} pv={pv} />
            < PvPoint key={9} number={9} pv={pv} />
            < PvPoint key={8} number={8} pv={pv} />
            < PvPoint key={7} number={7} pv={pv} />
            < PvPoint key={6} number={6} pv={pv} />
            < PvPoint key={5} number={5} pv={pv} />
            < PvPoint key={4} number={4} pv={pv} />
            < PvPoint key={3} number={3} pv={pv} />
            < PvPoint key={2} number={2} pv={pv} />
            < PvPoint key={1} number={1} pv={pv} />
            <p className='pv_alt'>{pv}</p>
        </div>
    );
}

const PvPoint = ({ number, pv }) => {

    const className = `pv__point ${number > pv ? 'pv__point--empty'
            : number > 7 ? 'pv__point--green'
                : number > 3 ? 'pv__point--yellow'
                    : 'pv__point--red'
        }`;

    return (
        <div className={className}>
        </div>
    );
}