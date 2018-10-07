import React, { Component } from 'react';
import { BrowserRouter,
         Route,
         Switch,
         Redirect } from 'react-router-dom';

// App Components
import LandingPage from './components/LandingPage';
import DifficultySelect from './components/DifficultySelect';
import Game from './components/Game';
import GameOver from './components/GameOver'

import './css/normalize.css';
import './css/style.css';

class App extends Component {
  swap = {
    x:"o",
    o:"x"
  }

  wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  state = {
    board: [
      "", "", "",
      "", "", "",
      "", "", ""
    ],
    player: "o",
    gameOver: false,
    winner: "",
    isOnePlayerGame: false,
    level: .3,
    levels: {
      easy:.3,
      medium:.6,
      hard:.9
    },
    waitFor: 1500 // miliseconds before returning a value
  }

  resetState = isOnePlayer => {
    const reset = {
      board: [
        "", "", "",
        "", "", "",
        "", "", ""
      ],
      player: "o",
      gameOver: false,
      winner: "",
    };

    this.setState({
      ...this.state,
      ...reset,
      isOnePlayerGame: isOnePlayer?true:false
    })
  }

  setLevel = diff => {
    this.setState({
      ...this.state,
      level: this.state.levels[diff]
    });
  }

  getLevel = () => {
    const level = this.state.level;
    const levels = this.state.levels;
    for (let diff in levels) {
      if (levels[diff] === level) {
        return diff;
      }
    }
  }

// Gameplay
  humanMove = index => {
    if ( !this.state.board[index] ) {
      this.fillBox(index)
      .then(this.checkForWinner).then( winner => this.setStateSync(winner))
      .then(this.changePlayer)
      .then(() => {
        // Computers Turn
        if ( !this.state.gameOver && this.state.isOnePlayerGame ) {
          setTimeout(() => {
            this.computerMove()
            .then(this.checkForWinner).then( winner => this.setStateSync(winner))
            .then(this.changePlayer)
          }, this.state.waitFor);
        }
      });
    }
  }

  computerMove = () => {
    const isSmart = Math.random() <= this.state.level;

    const currentBoard = [...this.state.board];
    const possibleMoves = this.getEmptyBoxes();

    const i = Math.floor( Math.random() * possibleMoves.length );
    const randomMove = possibleMoves[i];

    let chosenMove = randomMove;

    // Lookahead
    if (isSmart) {
      let newBoard = [];
      //Can computer win?
      const winningMoves = possibleMoves.filter( index => {
        newBoard = currentBoard.map((box, i) => i===index?"x":box);
        return this.checkForWinner(newBoard, "x");
      });
      //Can Computer Lose?
      const opponentWinningMoves = possibleMoves.filter( index => {
        newBoard = currentBoard.map((box, i) => i===index?"o":box);
        return this.checkForWinner(newBoard, "o");
      });
      // Can computer fill 2 of 3 in blank row?
      const almostWins = possibleMoves.filter( index => {
        newBoard = currentBoard.map((box, i) => i===index?"x":box);
        return this.wins.filter( boxes => boxes.filter(box => newBoard[box] === "").length === 1
                                       && boxes.filter(box => newBoard[box] === "x").length === 2 ).length;
      });
      if (winningMoves.length) {
        //Chose winning move
        chosenMove = winningMoves[0];
      } else if (opponentWinningMoves.length) {
        // Or block opponent
        chosenMove = opponentWinningMoves[0];
      } else if (almostWins.length) {
        const i = Math.floor( Math.random() * almostWins.length )
        chosenMove = almostWins[i];
      }
    }
    return this.fillBox(chosenMove);
  }

  getEmptyBoxes = () => {
    const emptyIndices = [];
    this.state.board.forEach((box, index) => {
      if (box === "") {
        emptyIndices.push(index);
      }
    })
    return emptyIndices;
  }

// Helper functions for each turn
  fillBox = index => {
    return this.setStateSync({
      board: this.state.board.map((box, i) => i===index?this.state.player:box)
    });
  }

  checkForWinner = (newBoard, newPlayer) => {
    const player = newPlayer?newPlayer:this.state.player;
    const board = newBoard?newBoard:this.state.board;

    const isBoardFull = !board.filter( box => box === "").length;
    const isWinner = !!this.wins.filter( boxes => ( board[boxes[0]] === player
                                                 && board[boxes[1]] === player
                                                 && board[boxes[2]] === player)).length;
    const gameOver = isWinner || isBoardFull;
    const winner = isWinner?player:"";
    // When called with arguments (during the computer's lookahead)
    // the function completes immediately
    if(newBoard || newPlayer) {
      return gameOver?{gameOver, winner}:false
    } else {
    // When called without arguments, the function returns a promise
      if (!gameOver) {
        return new Promise( resolve => resolve(false));
      } else {
        return new Promise( resolve => {
          setTimeout(() => {
            resolve({gameOver, winner});
          }, this.state.waitFor);
        })
      }
    }
  }

  changePlayer = () => {
    return this.setStateSync({
      player: this.swap[this.state.player]
    });
  }

  setStateSync = state => {
    return new Promise((resolve, reject) => {
      if (state) {
        this.setState({
          ...this.state,
          ...state
        }, () => {resolve()});
      } else {
        resolve();
      }
    });
  }

  getGameOverMessage = () => {
    if(!this.state.winner) {
      return "It's a Tie!"
    } else if (!this.state.isOnePlayerGame) {
      return "You've Won!"
    } else if (this.state.winner==="x") {
      return "You've Lost..."
    } else {
      return "You've Won!"
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={ () => <LandingPage reset={this.resetState} />} />

          <Route path="/1p"
                 render={ () => <DifficultySelect setDifficulty={this.setLevel}
                                                  diff={this.getLevel()}
                                                  levels={Object.keys(this.state.levels)} />
                        } />

          <Route path="/play"
                 render={ () => this.state.gameOver?
                                 <Redirect to="/gameover"/>
                                 :
                                 <Game board={this.state.board}
                                       move={this.humanMove}
                                       player={this.state.player} />
                        } />
          <Route path="/gameover"
                 render={ () => <GameOver winner={this.state.winner}
                                          reset={this.resetState}
                                          message={this.getGameOverMessage()} />
                        } />
          <Route render={ () => <Redirect to="/" /> } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
