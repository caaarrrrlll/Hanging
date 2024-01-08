import { useEffect, useState } from 'react';
import { letters } from './letters';

import './App.css';
import { HangImage } from './components/HangImage';
import { getRandomWord } from './getRandomWord'

function App() {

  const [ word, setWord ] =useState( getRandomWord());
  const [ hidenWord, sethiddenWord ] = useState( '_ '.repeat(word.length) );
  const[ attempts, setAttempts ] = useState(0);
  const[lose, setLose ] = useState(false);
  const[win, setWin ] = useState(false);

  //si la persona perdio
  useEffect( () => {
    if (attempts >=9){
      setLose(true);
    }
  }, [ attempts] );

  //lo contrario xd
  useEffect(() => {
    const currentHiddenWord = hidenWord.split(' ').join('');
    if ( currentHiddenWord === word ) {
      setWin( true );
    }

  }, [ hidenWord ])
  


  const checkletters = (letters: string) =>{
    if ( lose ) return;
    if (!word.includes (letters) ){
      setAttempts( Math.min(attempts+1, 9) );
      return;

    }
    
    const hiddenWordArray = hidenWord.split(' '); 
    for (let i = 0; i < word.length; i++){
      if (word[i] === letters){
        hiddenWordArray[i] = letters;

      }
    }

    sethiddenWord(hiddenWordArray.join (' ') );
    }
  
    const newGame = () =>{ 
      const newWord = getRandomWord();

      setWord(newWord);
      sethiddenWord( '_ '.repeat( newWord.length ));
      setAttempts(0);    
      setLose(false);
      setWin(false);
    }

  return (<div className="read-the-docs">
      
      {/* Imagenes */ }
      <HangImage imageNumber = { attempts }/>

      {/* Palabra oculta*/ }
      <h3>{hidenWord}</h3>

      {/* Contador de intentos*/ }
      <h3>Intentos = {attempts}</h3>

      {/*Mensaje de derrota */}
      {
        (lose) 
        ?<h2>Acabaste de perder :C, la palabra era {word}</h2> 
        : ''
      }

      {/*Mensaje de ganar */}
      { 
        (win) 
          ?<h2>usted acabo de ganar :D!!!</h2>
          : ''
      }

      {/* Botones de letras */ }
      {
        letters.map( (letters) => (
          <button 
            onClick={()=>checkletters(letters)}
            key ={letters}
            >{  letters  }
          </button>
        ) )
      }

      <br /><br />
      <button onClick={newGame}>Volver a jugar?</button>


    </div>
  );
};

export default App;
