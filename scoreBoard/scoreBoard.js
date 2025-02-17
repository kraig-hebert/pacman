class ScoreBoard {
  constructor(activeMode, totalFood) {
    this.foodPoint = activeMode.foodPoint;
    this.ghostPoint = activeMode.ghostPoint;
    this.powerFoodPoint = activeMode.powerFoodPoint;
    this.score = 0;
  }

  resetScoreBoard(activeMode, totalFood, pointsElement) {
    this.foodPoint = activeMode.foodPoint;
    this.ghostPoint = activeMode.ghostPoint;
    this.powerFoodPoint = activeMode.powerFoodPoint;
    this.score = 0;
    pointsElement.innerText = this.score;
  }

  addFoodPoint() {
    this.score += this.foodPoint;
  }

  addGhostPoint() {
    this.score += this.ghostPoint;
  }

  addPowerFoodPoint() {
    this.score += this.powerFoodPoint;
  }
}

export default ScoreBoard;
