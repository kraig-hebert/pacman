class Board {
  constructor(gameBoard) {
    this.gameBoard = gameBoard;
    this.layout = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 1, 1, 1, 1, 0, 1, 2, 1],
      [1, 2, 1, "G", 0, 0, 0, 1, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 2, 2, "P", 2, 2, 2, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 3, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
  }

  renderBoard() {
    this.gameBoard.innerHTML = ""; // Clear board before rendering
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
}
export default Board;
