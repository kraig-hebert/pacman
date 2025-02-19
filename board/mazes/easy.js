class Easy {
  constructor() {
    this.foodPoint = 1;
    this.ghostPoint = 3;
    this.layout = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 3, 2, 2, 2, 2, 2, 2, 2, 1],
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
    this.name = "easy";
    this.ghostSpeed = 1000;
    this.pacmanSpeed = 1100;
    this.powerFoodPoint = 2;
  }
}

export default Easy;
