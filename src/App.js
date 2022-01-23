import React, { Component } from 'react';
import './App.css'

const allBody = [
  <span className='head'></span>,
  <span className='cheast'></span>,
  <span className='rightHand'></span>,
  <span className='leftHand'></span>,
  <span className='leftLeg'></span>,
  <span className='rightLeg'></span>
]

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState();
  }

  initialState = () => {
    return {
      word: [],
      wrongAns: 0,
      correctAns: {},
      allAns: []
    }
  }

  allLittersObj = (littersArr) => {
    let obj = this.state.correctAns
    for (let i = 0; i < littersArr.length; i++) {
      obj[littersArr[i]] = 0
    };
    this.setState({
      correctAns: obj,
    });
  };

  checkLoser = (mistakes) => {
    if (mistakes > 5) {
      this.setState(this.initialState());
      return alert("you lose");
    };
  };

  checkWinner = (correctObj) => {
    for (const val in correctObj) {
      if (correctObj[val] === 0) {
        return;
      };
    };
      this.setState(this.initialState());
      return alert("you win");
  };

  checkInputs = (event, wrongAns, correct) => {
    const littersArr = this.state.word;
    let answers = this.state.allAns

    if (littersArr.length !== 0 && event.key.length === 1) {
      if (littersArr.includes(event.key)) {
        correct[event.key] = 1
      }

      if (!answers.includes(event.key)) {
        answers = [...answers, event.key]
        if (!littersArr.includes(event.key)) {
          wrongAns = wrongAns + 1
        }
      };

      this.setState({
        allAns: answers,
        wrongAns: wrongAns
      });
      this.checkWinner(correct);
      this.checkLoser(wrongAns);
    };
  }

  componentDidMount = () => {

    window.addEventListener("keydown", (event) => {
      let wrongAns = this.state.wrongAns;
      let correct = this.state.correctAns;
      this.checkInputs(event, wrongAns, correct);
    });
  }

  wordSubmit = (e) => {
    e.preventDefault();
    const word = e.target.word.value.split('')
    this.setState({
      word: word
    })
    this.allLittersObj(word)
    e.target.word.value = ""
  }

  inRange = (n) => {
    return [...Array(n).keys()]
  }

  render() {
    return (
      <div className='app'>
        {this.state.word != "" ? <h2>You can now start gussing by pressing any key</h2> :
          <form className='wordForm' onSubmit={(e) => this.wordSubmit(e)}>
          <label>Write your Word</label>
          <input name='word' type='text' />
          <button>START</button>
        </form>}

        <div className='gallows'>
          <span className='leftTopLine'></span>
          <span className='rightLine'></span>
        </div>

        <div className='body'>
          {
            this.inRange(this.state.wrongAns).map(i => {
              return allBody[i]
            })
          }
        </div>

        <div className='correctAns'>
          {this.state.word && this.state.word.map(litter => {
            return <p className='litters'>{this.state.correctAns[litter] > 0 ? litter : "_"}</p>
          })}
        </div>

      </div>
    );
  }
}

export default App;
