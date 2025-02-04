class GhostController {
  constructor(ghostList) {
    this.ghostList = ghostList;
    this.ghostIntervalList = null;
  }

  setGhostList(ghostList) {
    this.ghostList = ghostList;
  }

  startGhosts() {
    this.ghostIntervalList = this.ghostList.map((ghost, index) =>
      setTimeout(
        () => setInterval(() => ghost.move(), ghost.speed),
        index * 25000
      )
    );
  }

  stopGhosts() {
    this.ghostIntervalList.forEach((inter) => clearInterval(inter));
    this.ghostIntervalList = [];
  }
}

export default GhostController;
