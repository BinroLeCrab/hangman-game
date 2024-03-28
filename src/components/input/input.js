import { useRef } from 'react';

export const Input = ({ children, setInput, disabled }) => {
    const onSubmitHandler = (e) => {
        e.preventDefault();

        if (!inputRef.current.value.trim()) return;

        const value = inputRef.current.value.trim();
        // console.log(value);

        inputRef.current.value = '';

        setInput(value);
    };

    const inputRef = useRef(null);

    return (
        <form onSubmit={onSubmitHandler}>
            <input required type="text" placeholder={children} ref={inputRef} maxLength={1} disabled={disabled}/>
        </form>
    );
}
/*
export const TodoAction = ({ addTodo }) => {

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if (!inputRef.current.value.trim()) return;

        const value = inputRef.current.value.trim();
        console.log(value);

        inputRef.current.value = '';

        addTodo(value);
    };

    const inputRef = useRef(null);

    return (
        <div className={classes['todo-action']}>
            <p>Add a new task</p>
            <form onSubmit={onSubmitHandler} className={classes['todo-action__form']}>
                <label htmlFor="todo-action-input">
                    <input
                        required
                        id="todo-action-input"
                        type="text" placeholder="Write some action" ref={inputRef} maxLength={1}
                    />
                    <span className="sr-only">Todo Name</span>
                </label>
                <Button type="submit">Add</Button>
            </form>
        </div>
    );
};

*/