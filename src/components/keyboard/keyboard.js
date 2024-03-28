import { useRef, useState } from 'react';
import './keyboard.css';

export const Keyboard = ({ lettresGood, lettresWrong, AutorisLetter, refInput, disabled}) => {

    return (
        <div className="keyboard">
            {
                AutorisLetter.map((letter, index) => {
                    return <Keycap key={index} letter={letter} variant={lettresWrong.includes(letter) ? "wrong" : lettresGood.includes(letter) ? "good" : ''} refInput={refInput} disabled={disabled} />
                })
            }
            <KeySuppr refInput={refInput} />
        </div>
    );
}

const Keycap = ({ letter, variant, refInput, disabled }) => {

    const refKeycap = useRef(null);

    const className = `keyboard__keycap ${
            variant === "wrong" ? "keyboard__keycap--wrong"
            : variant === "good" ? "keyboard__keycap--good"
                : ""
        }`;

    const style = {
        gridArea: letter
    }

    const onClickInput = () => {
        refInput.current.value = letter;
    }

    // document.addEventListener('keydown', (e) => {
    //     if (e.key === letter) {
    //         console.log('click');
    //         setClass(className + ' keyboard__keycap--active');
    //     }
    // })

    // document.addEventListener('keyup', (e) => {
    //     if (e.key === letter) {
    //         console.log('unclick');
    //         setClass(className.replace(' keyboard__keycap--active', ''));
    //     }
    // })

    return (
        <button ref={refKeycap} onClick={() => { onClickInput() }} className={className} style={style} disabled={disabled ? disabled : variant === "good" ? true : variant === "wrong" ? true : false}>{letter}</button>
    );
}

const KeySuppr = ({ refInput }) => {

    const onClickInput = () => {
        refInput.current.value = '';
    }

    return (
        <button onClick={() => { onClickInput() }} className="keyboard__keycap keyboard__keycap--suppr">Suppr</button>
    );
}