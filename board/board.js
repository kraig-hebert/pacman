class Board {
  constructor(eastWarpPosition, gameBoard, layout, westWarpPostition) {
    this.eastWarpPosition = eastWarpPosition;
    this.gameBoard = gameBoard;
    this.ghost = null;
    this.layout = layout;
    this.pacman = null;
    this.westWarpPostition = westWarpPostition;
  }

  renderBoard() {
    this.gameBoard.innerHTML = ""; // Clear board before rendering

    // create game board
    this.layout.forEach((row, y) => {
      row.forEach((cell, x) => {
        const div = document.createElement("div");
        if (cell === 1) {
          div.classList.add("wall");
        } else if (cell === 2) {
          div.classList.add("pellet");
        } else if (cell === 3) {
          div.classList.add("power-pellet");
        } else if (cell === "P") {
          div.classList.add("pacman");
          div.textContent = "LB";
        } else if (cell === "G") {
          div.classList.add("ghost");
          div.textContent = "KH";
        } else if (cell === "<") {
          div.id = "warp-west";
          div.classList.add("warp-square");
          div.textContent = "<";
        } else if (cell === ">") {
          div.id = "warp-east";
          div.classList.add("warp-square");
          div.textContent = ">";
        } else {
          div.classList.add("empty");
        }
        this.gameBoard.appendChild(div);
      });
    });
  }

  setGamePieces(ghost, pacman) {
    this.ghost = ghost;
    this.pacman = pacman;
  }

  setLayout(layout) {
    this.gameBoard.style.gridTemplateColumns = `repeat(${layout[0].length}, 30px)`;
    this.gameBoard.style.gridTemplateRows = `repeat(${layout.length}, 30px)`;
    this.layout = layout;
    this.renderBoard();
  }

  setWarpSquares(eastWarpPosition, westWarpPosition) {
    this.eastWarpPosition = eastWarpPosition;
    this.westWarpPosition = westWarpPosition;
  }
}
export default Board;
