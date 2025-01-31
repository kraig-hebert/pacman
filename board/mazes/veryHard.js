class VeryHard {
  constructor() {
    this.foodPoint = 8;
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
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    this.name = "very-hard";
    this.ghostPosition = { x: 3, y: 5 };
    this.ghostSpeed = 200;
    this.pacmanPosition = { x: 4, y: 7 };
    this.powerFoodPoint = 24;
  }
}

export default VeryHard;
