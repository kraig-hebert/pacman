// import game elements
import Board from "../board/board.js";
import GhostController from "../ghost/ghostController.js";
import Pacman from "../pacman/pacman.js";
import ScoreBoard from "../scoreboard/scoreboard.js";

// import game modes
import Easy from "../board/mazes/easy.js";
import Medium from "../board/mazes/medium.js";
import Hard from "../board/mazes/hard.js";
import VeryHard from "../board/mazes/veryHard.js";

class GameController {
  constructor(gameBoard, points) {
    this.activeMode = new Easy();
    this.board = this.initializeBoard(gameBoard);
    this.gameActive = false;
    this.ghostController = this.initializeGhostController();
    this.pacman = this.initializePacman();
    this.pointsDIV = points;
    this.scoreBoard = this.initializeScoreBoard();
    this.handleKeydownEventListener =
      this.handleKeydownEventListener.bind(this);
    this.powerModeTimeout = null;
  }

  addKeydownEventListener() {
    window.addEventListener("keydown", this.handleKeydownEventListener);
  }

  removeKeydownEventListener() {
    window.removeEventListener("keydown", this.handleKeydownEventListener);
  }

  setGameActive() {
    this.gameActive = true;
  }

  deactivateGame() {
    this.gameActive = false;
  }

  initializeBoard(gameBoard) {
    return new Board(gameBoard, this.activeMode.layout, this.check);
  }

  renderBoard() {
    this.board.renderBoard();
  }

  updateBoardLayout(position, value) {
    this.board.updateLayout(position, value);
    this.renderBoard();
  }

  initializeGhostController() {
    return new GhostController({
      ghostPositionList: this.board.findAllElementPositions("G"),
      speed: this.activeMode.ghostSpeed,
      targetPosition: this.board.findSingleElementPosition("P"),
    });
  }

  // check if ghost has caught pacman or move to newGhostPosition
  handleGhostMove(params) {
    const { key, newGhostPosition } = params;
    const selectedGhost = this.ghostController.ghosts[key];
    if (
      newGhostPosition.x === this.pacman.position.x &&
      newGhostPosition.y === this.pacman.position.y
    ) {
      if (selectedGhost.mode === "chase" || selectedGhost.mode === "scatter")
        this.endGame();
      else if (selectedGhost.mode === "frightened")
        selectedGhost.changeMode("eaten");
    } else {
      const nextCellValue =
        this.board.layout[newGhostPosition.y][newGhostPosition.x];
      this.board.updateLayout([
        {
          position: selectedGhost.position,
          value: selectedGhost.currentCellPreviousValue,
        },
        { position: newGhostPosition, value: "G" },
      ]);
      selectedGhost.setPosition(newGhostPosition);
      selectedGhost.setCurrentCellPreviousValue(nextCellValue);
    }
  }

  initializePacman() {
    return new Pacman(
      this.board.findSingleElementPosition("P"),
      this.activeMode.pacmanSpeed
    );
  }

  handleKeydownEventListener(e) {
    if (!this.gameActive) {
      this.ghostController.startAllGhosts({
        boardLayout: this.board.layout,
        handleGhostMove: (params) => this.handleGhostMove(params),
      });
      this.setGameActive();
    }
    if (this.board.checkIfWall(e.key, this.pacman)) {
      this.pacman.setNextDirection(e.key);
    } else {
      if (e.key !== this.pacman.direction) {
        this.pacman.setDirection(e.key);
        this.pacman.beginMoving({
          handlePacmanMove: (position) => this.handlePacmanMove(position),
        });
      }
    }
  }

  handlePacmanMove(position) {
    let { newX, newY } = position;
    const result = this.board.layout[newY][newX];
    // Check if the new position is not a wall
    if (result !== 1) {
      // check if the new position is a food pellet
      if (result === 2) this.scoreBoard.addFoodPoint();
      // check if the new position is a power food pellet and set mode to power
      else if (result === 3) this.activatePowerMode();
      // check if warp square and warp pacman to opposite side of board
      else if (result === "<") newX = this.board.eastWarpPosition.x - 1;
      else if (result === ">") newY = this.board.westWarpPosition.x + 1;

      // check if all food has been eaten and claim victory
      if (this.board.getTotalFood() === 0) {
        this.ghostController.stopAllGhosts();
        alert("You win Batty Boy");
      }
      this.pointsDIV.innerText = this.scoreBoard.score;
      this.board.updateLayout([
        {
          position: { x: this.pacman.position.x, y: this.pacman.position.y },
          value: 0,
        },
        { position: { x: newX, y: newY }, value: "P" },
      ]);
      this.pacman.setPosition({ x: newX, y: newY });
      // reset all ghosts targetPosition if they are chasing you and not frightened
      if (this.pacman.mode !== "power")
        this.ghostController.setAllGhostsTargetPosition({
          ...this.pacman.position,
        });
    } else if (result === 1) {
      this.pacman.resetDirectionAfterStop();
      this.pacman.beginMoving({
        handlePacmanMove: (params) => this.handlePacmanMove(params),
      });
    }

    this.renderBoard();

    // check if pacman has run into any ghost
    Object.keys(this.ghostController.ghosts).forEach((key) => {
      if (
        newX === this.ghostController.ghosts[key].position.x &&
        newY === this.ghostController.ghosts[key].position.y
      ) {
        if (this.pacman.mode === "normal") this.endGame();
        else if (this.pacman.mode === "power") {
          this.ghostController.updateSingleGhostMode({
            boardLayout: this.board.layout,
            handleGhostMove: (params) => this.handleGhostMove(params),
            key,
            newMode: "eaten",
            targetPosition: this.ghostController.ghosts[key].startingPosition,
          });
          this.scoreBoard.addGhostPoint();
        }
      }
    });
  }

  activatePowerMode() {
    if (this.powerModeTimeout) clearTimeout(this.powerModeTimeout);
    this.pacman.setMode("power");
    this.ghostController.updateAllGhostsMode({
      boardLayout: this.board.layout,
      handleGhostMove: (params) => this.handleGhostMove(params),
      newMode: "frightened",
      targetPositions: this.board.powerFoodSquares,
    });
    this.board.activatePowerMode();
    this.powerModeTimeout = setTimeout(() => this.deactivatePowerMode(), 10000);
  }

  deactivatePowerMode() {
    this.pacman.setMode("normal");
    this.ghostController.updateAllGhostsMode({
      boardLayout: this.board.layout,
      handleGhostMove: (params) => this.handleGhostMove(params),
      newMode: "chase",
      targetPosition: this.pacman.position,
    });
    this.board.deactivatePowerMode();
  }

  initializeScoreBoard() {
    return new ScoreBoard(this.activeMode, this.board.getTotalFood());
  }

  updateScoreBoard(pointType) {
    switch (pointType) {
      case 1:
        this.scoreBoard.addFoodPoint();
        break;
      case 2:
        this.scoreBoard.addGhostPoint();
        break;
      case 3:
        this.scoreBoard.addPowerFoodPoint();
        break;
    }
  }

  resetScoreBoard() {
    this.scoreBoard.resetScoreBoard(this.activeMode, this.board.getTotalFood());
  }

  resetGame(e, updateMazeLinks) {
    if (e.target.id === "easy") this.activeMode = new Easy();
    else if (e.target.id === "medium") this.activeMode = new Medium();
    else if (e.target.id === "hard") this.activeMode = new Hard();
    else if (e.target.id === "very-hard") this.activeMode = new VeryHard();
    this.deactivateGame();
    this.pacman.stopMoving();
    this.ghostController.stopAllGhosts();
    this.board.resetBoard(this.activeMode.layout);
    this.ghostController.resetGhosts(
      this.board.findAllElementPositions("G"),
      this.activeMode.ghostSpeed,
      this.board.findSingleElementPosition("P")
    );
    if (this.powerModeTimeout) clearTimeout(this.powerModeTimeout);
    this.pacman.setPosition(this.board.findSingleElementPosition("P"));
    this.pacman.setDirection(null);
    this.scoreBoard.resetScoreBoard(
      this.activeMode,
      this.board.getTotalFood(),
      this.pointsDIV
    );
    this.addKeydownEventListener();
    updateMazeLinks();
  }

  startGame() {
    this.setGameActive();
    this.addKeydownEventListener();
    this.ghostController.startAllGhosts({
      boardLayout: this.board.layout,
      handleGhostMove: (params) => this.handleGhostMove(params),
      targetPosition: this.pacman.position,
    });
  }

  endGame() {
    alert("You lose Batty Boy");
    this.pacman.stopMoving();
    this.ghostController.stopAllGhosts();
    this.removeKeydownEventListener();
    this.renderBoard();
    this.deactivateGame();
  }
}

export default GameController;
