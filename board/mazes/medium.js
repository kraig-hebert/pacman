class Medium {
  constructor() {
    this.foodPoint = 2;
    this.layout = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1],
      [1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1],
      [1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1],
      [1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1],
      [1, 2, 1, 2, 1, 1, 1, 1, 0, 1, 2, 1, 2, 1],
      [1, 2, 1, 2, 1, "G", 0, 0, 0, 1, 2, 1, 2, 1],
      [1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1],
      [1, 2, 1, 2, 2, 2, "P", 2, 2, 2, 2, 1, 2, 1],
      [1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1],
      [1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1],
      [1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    this.name = "medium";
    this.ghostPosition = { x: 3, y: 5 };
    this.ghostSpeed = 700;
    this.pacmanPosition = { x: 4, y: 7 };
    this.powerFoodPoint = 6;
  }
}

export default Medium;
