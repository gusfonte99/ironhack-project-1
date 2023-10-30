class Player {
  constructor() {
    this.width = 3;
    this.height = 5; // check notes
    this.positionX = 15; /*  - (this.width / 2); */
    this.positionY = 50; /*  - (this.height / 2); */

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

  getPosX() {
    return this.positionX;
  }

  getPosY() {
    return this.positionY;
  }
}

class Enemy {
  constructor(player) {
    this.player = player;
    this.width = 3;
    this.height = 5;
    this.positionX = 70;
    this.positionY = 50;

    this.createDomElement();
  }

  createDomElement() {
    this.enemyElm = document.createElement("div");
    this.enemyElm.classList.add("enemy");

    this.enemyElm.style.width = this.width + "vw";
    this.enemyElm.style.height = this.height + "vh";
    this.enemyElm.style.left = this.positionX + "vw";
    this.enemyElm.style.bottom = this.positionY + "vh";

    const parentElm = document.getElementById("board");
    parentElm.appendChild(this.enemyElm);
  }

  trackPlayer() {
    const playerPosX = this.player.getPosX();
    const playerPosY = this.player.getPosY();

    // Adjust enemy position to get closer to the player
    if (this.positionX < playerPosX) {
      this.positionX++;
      this.enemyElm.style.left = this.positionX + "vw";
    } else if (this.positionX > playerPosX) {
      this.positionX--;
      this.enemyElm.style.left = this.positionX + "vw";
    }

    if (this.positionY < playerPosY) {
      this.positionY++;
      this.enemyElm.style.bottom = this.positionY + "vh";
    } else if (this.positionY > playerPosY) {
      this.positionY--;
      this.enemyElm.style.bottom = this.positionY + "vh";
    }
  }
}

// create char instances
const player = new Player();
const enemy = new Enemy(player);

// enemy movement loop
setInterval(() => {
  enemy.trackPlayer();
}, 400);

// spawn new enemies
/* let counter = 0;
setInterval(() => {
  enemy.createDomElement();
  counter++;
  console.log("creating a new enemy " + counter);
}, 3000); */

// key triggers
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
