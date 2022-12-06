import './App.css';
import React from 'react';
import {Board, calculateWinner } from './index';

class App extends React.Component {
  constructor(props){
    super(props);

    const oldState = JSON.parse(localStorage.getItem('state'));

    const defaultState = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext:true,
    };

    this.state = oldState ? oldState : defaultState;
    // this.state = oldState || defaultState;
  }

  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step%2)===0,
    });
  }

  
  handleClick(i){
    const history = this.state.history.slice(0, this.state.stepNumber+1);
    const current = history[history.length-1];
    const squares = current.squares.slice();
    if(calculateWinner(squares)||squares[i]){
      return;
    }
    squares[i]=this.state.xIsNext ? 'X' : 'O';

    const newState = {
      history: history.concat([{
        squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    };

    localStorage.setItem('state', JSON.stringify(newState));

    this.setState(newState);
  }

  render() {
    console.log(this.state)

    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step,move)=>{
      const desc = move ? 
        'Go to move #' + move :
        'Go to game start';
      return(
        <li key={move}>
          <button onClick={()=> this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    let status;
    if(winner){
      status = 'Winner:' + winner;
    }else{
      status = 'Next player:' + (this.state.xIsNext ? 'X':'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={
              current.squares
            }
            onClick={(i)=> this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default App;
