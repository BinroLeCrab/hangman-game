//* -- Import React

import { useEffect, useState } from 'react';

//* -- Import Components

import { Word } from './components/word/word';

//* -- Import utils

import { checkLetter } from './utils/checkInput.js';

//* -- Import Styles

import './App.css';
import { Input } from './components/input/input';
import { BadLetter } from './components/badLetter/badLetter';

//? ----- App.js -----

export function App() {

  const [word, setWord] = useState('');
  const [loadWord, setLoading] = useState(false);
  const [wordView, setWordView] = useState('');
  const [lettresGood, setLettresGood] = useState([]);
  const [lettresWrong, setLettresWrong] = useState([]);
  const [inputLetter, setInputLetter] = useState('');
  const [parcoursFlag, setParcoursFlag] = useState(0);
  const [pv, setPV] = useState(11);

  useEffect(() => {

    const fetchWord = async () => {

      console.log('Loading word...');

      fetch('https://node-hangman-api-production.up.railway.app/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body:
          new URLSearchParams({
            locale: 'fr-FR'
          })
      }).then(response => response.json())
        .then(data => {
          console.log('Word:', data.word);
          setWord(data.word);
          setLoading(true);
        })
        .catch(error => {
          console.error('Error fetching word:', error);
        });
    }

    fetchWord();
    console.log('Mot:', word);


  }, []);

  useEffect(() => {

    const checkInput = () => {

      const Letter = inputLetter.toLowerCase();

      if (!checkLetter(Letter)) {
        console.log('Mauvais Input:', Letter);
        return;
      } else {
        if (word.includes(Letter)) {
          Letter != '' && setLettresGood([...lettresGood, Letter]);
        } else {
          if (!lettresWrong.includes(Letter)) {
            Letter != '' && setLettresWrong([...lettresWrong, Letter]);
            setPV(pv - 1);
          }
        }

        console.log('Lettres bonnes:', lettresGood);
        console.log('Lettres mauvaises:', lettresWrong);
        setParcoursFlag(parcoursFlag + 1);
      }
    }

    checkInput();

  }, [inputLetter]);

  useEffect(() => {

    const AffichageWord = () => {
      setWordView(word.replace(/[a-zA-Z]/g, (letter) => {
        // console.log('Lettre:', letter);
        if (lettresGood.includes(letter)) {
          return letter;
        } else {
          return '_'
        }
      }));

    }

    AffichageWord();
  }, [word, parcoursFlag]);

  return (
    <div>
      <h1>Hangman Game</h1>
      <p>PV: {pv}</p>
      < Word>{loadWord ? wordView : 'en chargement...'}</Word>
      < Input setInput={setInputLetter} disabled={pv <= 0 ? true : false}>Entrez une lettre</Input>
      < BadLetter lettresWrong={lettresWrong} />
      {pv <= 0 && (
        <>
          <h2>Vous avez perdu !</h2>
          <p>Le mot était "{word}"</p>
        </>
      )}
    </div>
  );
}
