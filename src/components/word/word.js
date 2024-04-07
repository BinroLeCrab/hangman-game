import './word.css'

export const Word = ({children}) => {
    return (
        <div className='word__container'>
            <h2 className='title word__title'>Mot à trouver</h2>
            <div className='word__content'>
            <p>{children}</p>
            </div>
        </div>
    );
}