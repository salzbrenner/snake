import '../styles/index.scss';
import Board from './Board';

const el = document.body.querySelector('#game');
const board = new Board(500, 0.04, el);
