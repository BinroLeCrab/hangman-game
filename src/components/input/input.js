import './input.css';

export const Input = ({ children, setInput, disabled, refObject }) => {

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if (!refObject.current.value.trim()) return;

        const value = refObject.current.value.trim();
        // console.log(value);

        refObject.current.value = '';

        setInput(value);
    };

    return (
        <form onSubmit={onSubmitHandler} className='insert__container'>
            <input className='insert__input' type="text" placeholder={children} ref={refObject} maxLength={1} disabled={disabled} autoFocus required/>
            <button className='insert__submit' type="submit">
                <span className='insert__submit__text'>Valider</span>
            </button>
        </form>
    );
}