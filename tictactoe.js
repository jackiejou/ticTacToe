const prompt = require('prompt');

class TicTacToe {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = [['_','_','_'],['_','_','_'],['_','_','_']];
    this.winCondition = 'It\'s a tie!';
  };
  showBoard() {
    this.board.forEach(row => {
      console.log(row.join('|'));
    });
  };
  startMove(player) { // [1,2] // first row, second square
    console.log(player + '\'s turn to place');
    prompt.get([{
      name: 'row',
      required: true,
      pattern: /^[1-3]$/,
      message: 'Row number must be between 1 and 3'
    }, {
      name: 'col',
      required: true,
      pattern: /^[1-3]$/,
      message: 'Column number must be between 1 and 3'
    }], (err, results) => {
      console.log('Row: ' + results.row);
      console.log('Column: ' + results.col);
      if (this.board[+results.row - 1][+results.col - 1] !== '_') {
        console.log('INVALID MOVE');
        this.startMove(player);
      } else {
        this.board[+results.row - 1][+results.col - 1] = player;
        this.showBoard();
        if (this.checkBoard()) {
          console.log(this.winCondition);
          return;
        } else {
          player === this.player1 ? this.startMove(this.player2) : this.startMove(this.player1);
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
  checkAllSquares() {
    let fill = true;
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board.length; j++) {
        if (this.board[i][j] === '_') {
          fill = false;
        }
      }
    }
    return fill;
  }
  checkBoard() {
    for (let i = 0; i < this.board.length; i++) {
      if (this.checkThree(...this.board[i])) {
        this.winCondition = this.board[i][0] + ' wins!\nHorizontal row ' + (i + 1);
        return true;
      }
      if (this.checkThree(...this.getColumns(i))) {
        this.winCondition = this.getColumns(i)[0] + ' wins!\nVertical col ' + (i + 1);
        return true;
      }
    }
    if (this.checkMajorDiag()) {
      this.winCondition = this.board[0][0] + ' wins!\nMajor Diag';
      return true;
    }
    if (this.checkMinorDiag()) {
      this.winCondition = this.board[0][2] + ' wins!\nMinor Diag';
      return true;
    }
    if (this.checkAllSquares()) {
      return true;
    }
    return false;
  }
};

prompt.start();
let playerSchema = {
  properties: {
    player1: {
      pattern: /^\S$/,
      message: 'Player must be single character',
      required: true
    },
    player2: {
      pattern: /^\S$/,
      message: 'Player must be single character',
      required: true
    }
  }
}
prompt.get(playerSchema, (err, results) => {
  let game = new TicTacToe(results.player1, results.player2);
  game.showBoard();
  game.startMove(game.player1);
});
