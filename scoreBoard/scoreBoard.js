class ScoreBoard {
  constructor(foodPoint, powerFoodPoint, totalFood) {
    this.foodPoint = foodPoint;
    this.powerFoodPoint = powerFoodPoint;
    this.score = 0;
    this.totalFood = totalFood;
  }

  resetScoreBoard(foodPoint, powerFoodPoint, totalFood) {
    this.foodPoint = foodPoint;
    this.powerFoodPoint = powerFoodPoint;
    this.score = 0;
    this.totalFood = totalFood;
  }
}

export default ScoreBoard;
