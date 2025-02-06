class ScoreBoard {
  constructor(foodPoint, powerFoodPoint, totalFood) {
    this.foodPoint = foodPoint;
    this.powerFoodPoint = powerFoodPoint;
    this.score = 0;
    this.totalFood = totalFood;
  }

  resetScoreBoard(activeMode, totalFood, pointsElement) {
    this.foodPoint = activeMode.foodPoint;
    this.powerFoodPoint = activeMode.powerFoodPoint;
    this.score = 0;
    this.totalFood = totalFood;
    pointsElement.innerText = this.score;
  }

  addFoodPoint() {
    this.score += this.foodPoint;
    this.subtractFromTotalFood(1);
  }

  addPowerFoodPoint() {
    this.score += this.powerFoodPoint;
  }

  subtractFromTotalFood(amount) {
    this.totalFood -= amount;
  }
}

export default ScoreBoard;
