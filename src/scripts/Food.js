function Food(board) {
  this.board = board;
}

Food.prototype.generateRandom = function() {
  const x = Math.floor(Math.random() * this.board.gridRowLength);
  const y = Math.floor(Math.random() * this.board.gridRowLength);
  if (this.board.getGridItemValue(x, y) === 0) {
    this.board.setGridItemValue(x, y, 2);
    this.board.foodExists = true;
  };
};

export default Food;
