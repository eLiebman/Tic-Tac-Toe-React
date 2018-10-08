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
      hard:1
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

    const board = [...this.state.board];
    const possibleMoves = this.getEmptyBoxes();

    const i = Math.floor( Math.random() * possibleMoves.length );
    const randomMove = possibleMoves[i];

    let chosenMove = randomMove;

    // Lookahead
    if (isSmart) {
      const player = "x";
      const opponent = "o";

      // Rank possibleMoves
      const rankedMoves = possibleMoves.map( index => {
        const lines = this.wins.filter( line => line.includes(index));

        const myOpenLines = lines.filter( line => !line.filter( i => board[i] === opponent).length);
        const myOccupiedLines = myOpenLines.filter( line => line.filter( i => board[i] === player).length);
        const myWinningLines = myOccupiedLines.filter( line => line.filter(i => board[i] === player).length === 2);

        const enemyOpenLines = lines.filter( line => !line.filter( i => board[i] === player).length);
        const enemyOccupiedLines = enemyOpenLines.filter( line => line.filter( i => board[i] === opponent).length);
        const enemyWinningLines = enemyOccupiedLines.filter( line => line.filter( i => board[i] === opponent).length === 2);

        let score = 0;

        if(myWinningLines.length || enemyWinningLines.length) {
          score = 100;
        } else if (myOccupiedLines.length > 1 || enemyOccupiedLines.length > 1){
          score = 50;
        } else {
          score = myOpenLines.length + myOccupiedLines.length + enemyOpenLines.length + enemyOccupiedLines.length;
        }

        return {index, score};
      });

      chosenMove = rankedMoves.reduce( (high, current) => {
        return current.score > high.score?current:high
      }, {index: -1, score: 0}).index;
    }
    return this.fillBox(chosenMove);
  }

// Helper Functions
  getEmptyBoxes = () => {
    const emptyIndices = [];
    this.state.board.forEach((box, index) => {
      if (box === "") {
        emptyIndices.push(index);
      }
    })
    return emptyIndices;
  }

  fillBox = index => {
    return this.setStateSync({
      board: this.state.board.map((box, i) => i===index?this.state.player:box)
    });
  }

  checkForWinner = () => {
    const player = this.state.player;
    const board = this.state.board;

    const isBoardFull = !board.filter( box => box === "").length;
    const isWinner = !!this.wins.filter( boxes => ( board[boxes[0]] === player
                                                 && board[boxes[1]] === player
                                                 && board[boxes[2]] === player)).length;
    const gameOver = isWinner || isBoardFull;
    const winner = isWinner?player:"";

    const callback = resolve => gameOver?
                                setTimeout(() => {
                                   resolve({gameOver, winner})
                                 }, this.state.waitFor)
                               :resolve(false)

    return new Promise ( callback );
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
