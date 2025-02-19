class Medium {
  constructor() {
    this.foodPoint = 2;
    this.ghostPoint = 6;
    this.name = "medium";
    this.ghostSpeed = 500;
    this.pacmanSpeed = 485;
    this.powerFoodPoint = 4;
    this.layout = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1],
      [1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1],
      [1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1],
      [1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1],
      [1, 2, 1, 2, 1, 1, 1, 1, 0, 1, 2, 1, 2, 1],
      [1, 2, 1, 2, 1, "G", "G", 0, 0, 1, 2, 1, 2, 1],
      [1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1],
      [1, 2, 1, 2, 2, 2, "P", 2, 2, 2, 2, 1, 2, 1],
      [1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1],
      [1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1],
      [1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
  }
}

export default Medium;
