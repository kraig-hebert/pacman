class Board {
  constructor(gameBoard, layout) {
    this.eastWarpPosition = this.findSingleElementPosition(">");
    this.gameBoard = gameBoard;
    this.layout = layout;
    this.powerMode = false;
    this.powerFoodSquares = this.findAllElementPositions(3);
    this.westWarpPostition = this.findSingleElementPosition("<");
    this.renderBoard();
  }

  renderBoard() {
    this.gameBoard.innerHTML = ""; // Clear board before rendering

    // create game board
    this.layout.forEach((row) => {
      row.forEach((cell) => {
        const div = document.createElement("div");
        if (cell === 1) div.classList.add("wall");
        else if (cell === 2) div.classList.add("pellet");
        else if (cell === 3) div.classList.add("power-pellet");
        else if (cell === "P") {
          div.classList.add("pacman");
          div.textContent = "LB";
        } else if (cell === "G") {
          div.classList.add("ghost");
          if (this.powerMode) div.classList.add("ghost-active");
          div.textContent = "KH";
        } else if (cell === "<") {
          div.id = "warp-west";
          div.classList.add("warp-square");
          div.textContent = "<";
        } else if (cell === ">") {
          div.id = "warp-east";
          div.classList.add("warp-square");
          div.textContent = ">";
        } else div.classList.add("empty");

        this.gameBoard.appendChild(div);
      });
    });
  }

  resetBoard(layout) {
    this.gameBoard.style.gridTemplateColumns = `repeat(${layout[0].length}, 30px)`;
    this.gameBoard.style.gridTemplateRows = `repeat(${layout.length}, 30px)`;
    this.layout = layout;
    this.renderBoard();
    this.eastWarpPosition = this.findSingleElementPosition(">");
    this.westWarpPosition = this.findSingleElementPosition("<");
    this.powerFoodSquares = this.findAllElementPositions(3);
  }

  updateLayout(positionsToUpdate) {
    positionsToUpdate.forEach(
      ({ position, value }) => (this.layout[position.y][position.x] = value)
    );
    this.renderBoard();
  }

  findSingleElementPosition(element) {
    let x, y;
    try {
      y = this.layout.findIndex((row) => row.includes(element));
      x = this.layout[y].indexOf(element);
    } catch (e) {
      if (e.name == "TypeError") return false;
    }
    return { x, y };
  }

  findAllElementPositions(elementType) {
    const elementPositionList = [];
    this.layout.forEach((row, rowIndex) => {
      row.forEach((element, elementIndex) => {
        if (element === elementType)
          elementPositionList.push({ x: elementIndex, y: rowIndex });
      });
    });
    return elementPositionList;
  }

  getTotalFood() {
    return this.layout.flat().filter((cell) => cell === 2).length;
  }

  activatePowerMode() {
    this.powerMode = true;
  }

  deactivatePowerMode() {
    this.powerMode = false;
  }

  checkIfWall(direction, pacmanPosition) {
    const newX = pacmanPosition.x + this.directions[direction].dx;
    const newY = pacmanPosition.y + this.directions[direction].dy;
    return this.layout[newY][newX] === 1;
  }
}
export default Board;
