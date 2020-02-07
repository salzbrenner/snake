import Snake from './Snake';
import Food from './Food';
import {debounce, throttle} from './utils';

function Board(boardSize, gridItemRatio, gameEl) {
  this.animateSpeed = 80;
  this.gameEl = gameEl;
  this.gridItemSize = boardSize * gridItemRatio;
  this.gridRowLength = boardSize / this.gridItemSize;
  this.grid = this.createGrid(this.gridRowLength);
  this.foodExists = false;
  this.stopGame = false;
  this.snake = new Snake(10, 10, this);
  this.init();
}

Board.prototype.init = function() {
  this.setUpBoard();
  this.addDirectionListeners();

  const animate = setInterval(() => {
    this.draw(this.gameEl);
    if (this.stopGame) {
      clearInterval(animate);
    }
  }, this.animateSpeed);
};

Board.prototype.createGrid = function(gridRowLength) {
  const grid = [];
  for (let row = 0; row < gridRowLength; row++) {
    grid[row] = [];
    for (let col = 0; col < gridRowLength; col++) {
      if (row === 0 || col === 0 || row === gridRowLength - 1 || col ===
          gridRowLength - 1) {
        grid[row][col] = {
          element: null,
          value: 1,
        };
      }
      else {
        grid[row][col] = {
          element: null,
          value: 0,
        };
      }
    }
  }
  return grid;
};

Board.prototype.setUpBoard = function() {
  this.gameEl.setAttribute('style',
      `width: ${this.gridItemSize * this.gridRowLength}px; height: ${this.gridItemSize * this.gridRowLength}px; border: solid 1px green; position: relative;`);

  this.grid.forEach((arr, x) => {
    arr.forEach((item, y) => {
      const boxDomEl = document.createElement('div');
      boxDomEl.classList.add('grid-item');
      const boxSize = `${this.gridItemSize}px`;

      boxDomEl.setAttribute(
          `style`,
          `left: ${x * this.gridItemSize}px;
            top: ${y * this.gridItemSize}px;
            width: ${boxSize};
            height: ${boxSize};
            background: ${item.value > 0 ? 'red' : 'transparent'};
          `,
      );
      item.element = boxDomEl;
      this.gameEl.appendChild(boxDomEl);
    });
  });
};

Board.prototype.addDirectionListeners = function() {
  const debounced = throttle(this.setDirection.bind(this),
      this.animateSpeed);
  document.addEventListener('keydown', debounced);
};

Board.prototype.setDirection = function(event) {
  const keyCodes = {
    'ArrowRight': 1,
    'ArrowUp': 0,
    'ArrowLeft': 3,
    'ArrowDown': 2,
  };
  if (!Object.keys(keyCodes).includes(event.key)) {
    return;
  }
  this.snake.setDirection(keyCodes[event.key]);
};

Board.prototype.detectCollision = function(val, nextValue) {
  if (val === nextValue) {
    alert('Game over');
    this.stopGame = true;
  }
};

Board.prototype.getGridItemValue = function(row, col) {
  return this.grid[row][col].value;
};

Board.prototype.setGridItemValue = function(row, col, value) {
  this.grid[row][col] = {
    ...this.grid[row][col],
    value,
  };
};

Board.prototype.foodConsumed = function(foodX, foodY) {
  this.setGridItemValue(foodX, foodY, 0);
  this.foodExists = false;
};

Board.prototype.draw = function() {
  this.snake.move();

  if (!this.foodExists) {
    const food = new Food(this);
    food.generateRandom();
  }

  this.grid.forEach(arr => {
    arr.forEach(item => {
      if (item.value === 1) {
        item.element.style.background = 'red';
      }
      else if (item.value === 2) {
        item.element.style.background = 'blue';
      }
      else {
        item.element.style.background = 'transparent';
      }
    });
  });
};

export default Board;
