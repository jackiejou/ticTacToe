const prompt = require('prompt');

class TicTacToe {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = [['_','_','_'],['_','_','_'],['_','_','_']];
  };
  showBoard() {
    this.board.forEach(row => {
      console.log(row.join('|'));
      // console.log('-----');
    });
  };
  startMove(player) { // [1,2] // first row, second square
    console.log(player + '\'s turn to place');
    prompt.get(['row', 'col'], (err, results) => {
      console.log('Row: ' + results.row);
      console.log('Column: ' + results.col);
      this.board[+results.row - 1][+results.col - 1] = player;
      this.showBoard();
      if (this.checkBoard()) {
        console.log(this.winCondition);
        return;
      } else {
        if (player === this.player1) {
          this.startMove(this.player2);
        } else {
          this.startMove(this.player1);
        }
      }
    });
  };
  checkThree(x, y, z) {
    if (x !== '_' && y !== '_' && z !== '_') {
      return x === y && y === z && x === z;
    }
  }
  getColumns(col) {
    let arr = [];
    this.board.forEach(row => {
      arr.push(row[col]);
    });
    return arr;
  }
  checkMajorDiag() {
    let arr = [];
    this.board.forEach((row, index) => {
      arr.push(row[index]);
    });
    return this.checkThree(...arr);
  }
  checkMinorDiag() {
    let arr = [];
    this.board.forEach((row, index) => {
      arr.push(row[this.board.length - index - 1]);
    });
    return this.checkThree(...arr);
  }
  checkBoard() {
    for (let i = 0; i < this.board.length; i++) {
      if (this.checkThree(...this.board[i])) {
        // this.winner = this.board[i][0];
        this.winCondition = this.board[i][0] + ' wins!\nHorizontal row ' + (i + 1);
        return true;
      }
      if (this.checkThree(...this.getColumns(i))) {
        this.winCondition = this.getColumns(i)[0] + ' wins!\nVertical col ' + (i + 1);
        return true;
      }
      if (this.checkMajorDiag()) {
        this.winCondition = this.board[0][0] + ' wins!\nMajor Diag';
        return true;
      }
      if (this.checkMinorDiag()) {
        this.winCondition = this.board[0][2] + ' wins!\nMinor Diag';
        return true;
      }
    }
    return false;
  }
};

prompt.start();
prompt.get(['player1', 'player2'], (err, results) => {
  console.log('player 1: ' + results.player1);
  console.log('player 2: ' + results.player2);
  let game = new TicTacToe(results.player1, results.player2);
  game.showBoard();
  let player = game.player1;
  // while (!game.checkBoard()) {
  // }
  // if (game.checkBoard()) {
  //   console.log(game.winCondition);
  // };
  game.startMove(game.player1);
});
// console.log(player1);
// game.showBoard();
// game.startMove('o', 1, 2); // fisrt row, second square
// if (game.checkBoard()) {
//   game.showBoard();
//   console.log(game.winCondition);
// }
// console.log(game.getMinorDiag());
