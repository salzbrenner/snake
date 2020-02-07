function Snake(x, y, board) {
  this.board = board;
  this.direction = 1;
  this.body = [[10, 10]];
}

Snake.prototype.setDirection = function(direction) {
  if (!(this.direction === 0 && direction === 2) &&
      !(this.direction === 2 && direction === 0) &&
      !(this.direction === 1 && direction === 3) &&
      !(this.direction === 3 && direction === 1)) {
    this.direction = direction;
  }
};

Snake.prototype.getMovingDir = function() {
  let xMove;
  let yMove;
  switch (this.direction) {
    case 0:
      xMove = 0;
      yMove = -1;
      break;

    case 1:
      xMove = 1;
      yMove = 0;
      break;

    case 2:
      xMove = 0;
      yMove = 1;
      break;

    case 3:
      xMove = -1;
      yMove = 0;
      break;

  }

  return [xMove, yMove];
};

Snake.prototype.move = function() {
  const tail = this.getTail();
  this.board.setGridItemValue(tail[0], tail[1], 0);
  this.body = this.shiftCoords();
  this.postMove();
};

Snake.prototype.postMove = function() {
  const [x, y] = this.getHead();
  const currentHeadCoordinateValue = this.board.getGridItemValue(x, y);
  this.board.detectCollision(currentHeadCoordinateValue, 1);
  if (currentHeadCoordinateValue === 2) {
    this.eat(currentHeadCoordinateValue);
  }
  this.board.setGridItemValue(x, y, 1);
};

Snake.prototype.eat = function(foodCoordinate) {
  const [tailX, tailY] = this.getTail();
  const [foodX, foodY] = this.getHead();
  const [nextX, nextY] = this.body[this.body.length -
  (this.body.length > 1 ? 2 : 1)];
  const newTail = [tailX + tailX - nextX, tailY + tailY - nextY];
  this.body.push(newTail);
  this.board.foodConsumed(foodX, foodY);
};

Snake.prototype.shiftCoords = function() {
  const [xMove, yMove] = this.getMovingDir();
  const [x, y] = this.getHead();
  const newHead = [x + xMove, y + yMove];
  this.body.pop();
  return [newHead, ...this.body];
};

Snake.prototype.setHeadOnGrid = function() {
  const [x, y] = this.getHead();
  const currentHeadCoordinateValue = this.board.getGridItemValue(x, y);
  this.board.detectCollision(currentHeadCoordinateValue, 1);
  this.board.setGridItemValue(x, y, 1);
};

Snake.prototype.getHead = function() {
  return this.body[0];
};

Snake.prototype.getTail = function() {
  return this.body[this.body.length - 1];
};

export default Snake;
