class Hard {
  constructor() {
    this.foodPoint = 4;
    this.layout = [
      [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1,
      ],
      [
        1, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        2, 3, 1,
      ],
      [
        1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1,
        1, 2, 1,
      ],
      [
        1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1,
        1, 2, 1,
      ],
      [
        1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        2, 2, 1,
      ],
      [
        1, 2, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1,
        1, 2, 1,
      ],
      [
        1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2,
        2, 2, 1,
      ],
      [
        1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1,
        1, 1, 1,
      ],
      [
        1, 1, 1, 1, 1, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 1, 1,
        1, 1, 1,
      ],
      [
        1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 0, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1,
        1, 1, 1,
      ],
      [
        "<",
        2,
        2,
        2,
        2,
        2,
        2,
        1,
        2,
        1,
        0,
        0,
        "G",
        "G",
        "G",
        0,
        0,
        1,
        2,
        1,
        2,
        2,
        2,
        2,
        2,
        2,
        ">",
      ],
      [
        1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1,
        1, 1, 1,
      ],
      [
        1,
        1,
        1,
        1,
        1,
        1,
        2,
        1,
        2,
        2,
        2,
        2,
        2,
        "P",
        2,
        2,
        2,
        2,
        2,
        1,
        2,
        1,
        1,
        1,
        1,
        1,
        1,
      ],
      [
        1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1,
        1, 1, 1,
      ],
      [
        1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2,
        2, 2, 1,
      ],
      [
        1, 2, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1,
        1, 2, 1,
      ],
      [
        1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        2, 2, 1,
      ],
      [
        1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1,
        1, 2, 1,
      ],
      [
        1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1,
        1, 2, 1,
      ],
      [
        1, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        2, 3, 1,
      ],
      [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1,
      ],
    ];
    this.name = "hard";
    this.ghostSpeed = 400;
    this.powerFoodPoint = 12;
  }
}

export default Hard;
