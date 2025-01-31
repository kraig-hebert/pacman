class Hard {
  constructor() {
    this.foodPoint = 4;
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
    this.name = "hard";
    this.ghostPosition = { x: 3, y: 5 };
    this.ghostSpeed = 400;
    this.pacmanPosition = { x: 4, y: 7 };
    this.powerFoodPoint = 12;
  }
}

export default Hard;
