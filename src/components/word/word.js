import './word.css'

export const Word = ({children}) => {
    return (
        <div className='word__container'>
            <h2 className='word__title surlignage'>Mot à trouver</h2>
            <div className='word__content'>
            <p>{children}</p>
            </div>
        </div>
    );
}