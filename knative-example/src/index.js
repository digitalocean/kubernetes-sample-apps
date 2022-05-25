import 'game-2048/style/main.css';
import Game from 'game-2048';

var gameContainerDiv = document.createElement('div');
gameContainerDiv.setAttribute('id', 'game-container');
gameContainerDiv.className = 'container';
document.body.appendChild(gameContainerDiv);

const game = new Game({
  gameContainer: gameContainerDiv
}); 
