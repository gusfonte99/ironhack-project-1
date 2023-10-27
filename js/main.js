class Player {
  constructor() {
    this.positionX = 50; // maybe check how to do actual mid of screen
    this.positionY = 50;
    this.width = 3;
    this.height = 5; // check notes

    this.playerElm = document.getElementById("player");
    this.playerElm.style.width = this.width + "vw";
    this.playerElm.style.height = this.height + "vh";
    this.playerElm.style.left = this.positionX + "vw";
    this.playerElm.style.bottom = this.positionY + "vh";
  }

  moveUp() {
    this.positionY++;
    this.playerElm.style.bottom = this.positionY + "vh";
  }

  moveDown() {
    this.positionY--;
    this.playerElm.style.bottom = this.positionY + "vh";
  }

  moveLeft() {
    this.positionX--;
    this.playerElm.style.left = this.positionX + "vw";
  }

  moveRight() {
    this.positionX++;
    this.playerElm.style.left = this.positionX + "vw";
  }
}

const player = new Player();

document.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowLeft":
      player.moveLeft();
      break;
    case "ArrowRight":
      player.moveRight();
      break;
    case "ArrowUp":
      player.moveUp();
      break;
    case "ArrowDown":
      player.moveDown();
      break;
    case "Space":
      console.log("pressing spacebar");
      break;
  }
});
