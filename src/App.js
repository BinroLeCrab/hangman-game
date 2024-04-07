//* -- Import React

import { useEffect, useState, useRef } from 'react';

//* -- Import Components

import { Word } from './components/word/word';
import { Input } from './components/input/input';
import { BadLetter } from './components/badLetter/badLetter';
import { Keyboard } from './components/keyboard/keyboard.js';
import { PvBar } from './components/pvBar/pvBar.js';
import { Score } from './components/score/score.js';

//* -- Import utils

import { checkLetter } from './utils/checkInput.js';
import { loadFromLocalStorage, saveToLocalStorage } from './utils/local-storage-manager.js';

//* -- Import Styles

import './App.css';

//? ----- App.js -----

export function App() {

  const AutorisLetter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];


  const [word, setWord] = useState('');
  const [loadWord, setLoading] = useState(false);
  const [wordView, setWordView] = useState('');
  const [lettresGood, setLettresGood] = useState([]);
  const [lettresWrong, setLettresWrong] = useState([]);
  const [inputLetter, setInputLetter] = useState('');
  const [parcoursFlag, setParcoursFlag] = useState(0);
  const [pv, setPV] = useState(11);
  const [win, setWin] = useState(false);
  const [betterScore, setBetterScore] = useState(0);

  const inputRef = useRef(null);

  useEffect(() => {

    const fetchWord = async () => {

      // console.log('Loading word...');

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

    if (loadFromLocalStorage('betterScore')) {
      setBetterScore(loadFromLocalStorage('betterScore'));
    } else {
      setBetterScore(1000);
      saveToLocalStorage('betterScore', 1000);
    }
    console.log('Meilleur score:', betterScore);
    // console.log('Mot:', word);


  }, []);

  useEffect(() => {

    const checkInput = () => {

      const Letter = inputLetter.toLowerCase();

      if (!checkLetter(Letter, AutorisLetter)) {
        // console.log('Mauvais Input:', Letter);
        return;
      } else {
        if (word.includes(Letter)) {
          Letter !== '' && setLettresGood([...lettresGood, Letter]);
        } else {
          if (!lettresWrong.includes(Letter)) {
            Letter !== '' && setLettresWrong([...lettresWrong, Letter]);
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

  useEffect(() => {
    if (word != '' & wordView === word) {
      console.log('Vous avez gagné !');
      setWin(true);
      console.log('meilleur score:', betterScore)
      if (parcoursFlag < betterScore) {
        saveToLocalStorage('betterScore', parcoursFlag);
        setBetterScore(parcoursFlag);
        console.log('Nouveau meilleur score:', betterScore);
      }
    }
  }, [wordView]);

  return (
    <main>
      <h1>🪑 Jeu du Pendu</h1>
      < Score score={betterScore == 1000 ? '--' : betterScore} />
      < Word>{loadWord ? wordView : 'en chargement...'}</Word>
      < PvBar pv={pv} />
      < BadLetter lettresWrong={lettresWrong} />
      < Input refObject={inputRef} setInput={setInputLetter} disabled={pv <= 0 ? true : false}>Entrez une lettre...</Input>
      < Keyboard lettresGood={lettresGood} lettresWrong={lettresWrong} AutorisLetter={AutorisLetter} refInput={inputRef} disabled={pv <= 0 ? true : false} />
      {pv <= 0 && (
        <section className='PopUp__Section'>
          <div className='PopUp__container'>
            <h2>Vous avez perdu ! 🤣</h2>
            <p>Le mot était <span className='bold'>"{word}"</span></p>
            <a href='/' className='PopUp__Button'>Rejouer</a>
          </div>
        </section>
      )}
      {win && (
        <section className='PopUp__Section'>
          <div className='PopUp__container'>
            <h2>Bravo vous avez gagné !✨</h2>
            <p>Le mot était bien <span className='bold'>"{word}"</span></p>
            <p><span className='bold'>Nombre de coup</span> {parcoursFlag}</p>
            <p><span className='bold'>Votre Meilleur score</span> {betterScore}</p>
            <a href='/' className='PopUp__Button'>Rejouer</a>
          </div>
        </section>
      )}
    </main>
  );
}
