class Board {
  constructor(gameBoard, layout) {
    this.gameBoard = gameBoard;
    this.layout = layout;
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
        } else {
          div.classList.add("empty");
        }
        this.gameBoard.appendChild(div);
      });
    });
  }

  setLayout(layout) {
    this.gameBoard.style.gridTemplateColumns = `repeat(${layout[0].length}, 30px)`;
    this.gameBoard.style.gridTemplateRows = `repeat(${layout.length}, 30px)`;
    this.layout = layout;
    this.renderBoard();
  }
}
export default Board;
