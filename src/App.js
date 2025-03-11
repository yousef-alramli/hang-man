import React, { useEffect, useState } from 'react';
import './App.css';

const allBody = [
  <span key='head' className='head'></span>,
  <span key='chest' className='chest'></span>,
  <span key='rightHand' className='rightHand'></span>,
  <span key='leftHand' className='leftHand'></span>,
  <span key='leftLeg' className='leftLeg'></span>,
  <span key='rightLeg' className='rightLeg'></span>
];

const App = () => {
  const [word, setWord] = useState([]);
  const [wrongAns, setWrongAns] = useState(0);
  const [correctAns, setCorrectAns] = useState({});
  const [allAns, setAllAns] = useState([]);

  useEffect(() => {
    window.addEventListener('keydown', checkInputs);

    if (word.length) {
      checkLoser();
      setTimeout(() => {
        checkWinner();
      }, 0);
    }

    return () => {
      window.removeEventListener('keydown', checkInputs);
    }
  }, [correctAns, wrongAns, word]);

  const resetState = () => {
    setWord([]);
    setWrongAns(0);
    setCorrectAns({});
    setAllAns([]);
  }

  const allLittersObj = (littersArr) => {
    let obj = correctAns
    for (let i = 0; i < littersArr.length; i++) {
      obj[littersArr[i]] = 0
    };
    setCorrectAns(obj);
  };

  const checkLoser = () => {
    if (wrongAns > 5) {
      alert('you lose');
      resetState();
    };
  };

  const checkWinner = () => {
    const isWinner = !Object.values(correctAns).includes(0);
    if (!isWinner) {
      return;
    }
    alert('you win');
    resetState();
  };

  const checkInputs = (event) => {
    let answers = allAns
    const key = event.key.toLowerCase();

    if (word.length !== 0 && key.length === 1) {
      if (word.includes(key)) {
        setCorrectAns({ ...correctAns, [key]: 1 })
      }

      if (!answers.includes(key)) {
        setAllAns([...answers, key]);

        if (!word.includes(key)) {
          setWrongAns(wrongAns + 1);
        }
      };

    };
  }

  const wordSubmit = (e) => {
    e.preventDefault();
    const word = e.target.word.value.toLowerCase().split('');
    setWord(word)
    allLittersObj(word)
    e.target.word.value = '';
  }

  const inRange = (n) => {
    return [...Array(n).keys()];
  }

  return (
    <div className='app'>
      {word.length ? <h2>You can now start guessing by pressing any key</h2> :
        <form className='wordForm' onSubmit={(e) => wordSubmit(e)}>
          <label>Write your Word</label>
          <input name='word' type='text' />
          <button>START</button>
        </form>}

      <div className='container'>
        <div className='gallows'>
          <span className='leftTopLine'></span>
          <span className='rightLine'></span>
          <span className='bottomLine'></span>
        </div>

        <div className='body'>
          {
            inRange(wrongAns).map(i => {
              return allBody[i];
            })
          }
        </div>
      </div>

      <div className='correctAns'>
        {word && word.map((litter, i) => {
          return <p key={litter + i} className='litters'>{correctAns[litter] ? litter : '_' }</p>
        })}
      </div>
    </div>
  );
}

export default App
