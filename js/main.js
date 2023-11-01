class Player {
  constructor() {
    this.width = 3;
    this.height = 5; // check notes
    this.positionX = 15;
    this.positionY = 50;

    this.playerElm = document.getElementById("player");
    this.playerElm.style.width = this.width + "vw";
    this.playerElm.style.height = this.height + "vh";
    this.playerElm.style.left = this.positionX + "vw";
    this.playerElm.style.bottom = this.positionY + "vh";
  }

  moveUp() {
    if (this.positionY < 100 - this.height) {
      this.positionY++;
      this.playerElm.style.bottom = this.positionY + "vh";
    }
  }

  moveDown() {
    if (this.positionY > 0) {
      this.positionY--;
      this.playerElm.style.bottom = this.positionY + "vh";
    }
  }

  moveLeft() {
    if (this.positionX > 0) {
      this.positionX--;
      this.playerElm.style.left = this.positionX + "vw";
    }
  }

  moveRight() {
    if (this.positionX < 100 - this.width) {
      this.positionX++;
      this.playerElm.style.left = this.positionX + "vw";
    }
  }

  getPosX() {
    return this.positionX;
  }

  getPosY() {
    return this.positionY;
  }
}

class Enemy {
  constructor() {
    this.width = 3;
    this.height = 5;
    this.positionX = Math.floor(Math.random() * (100 - this.width + 1));
    this.positionY = Math.floor(Math.random() * (100 - this.height + 1));
    
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

  trackPlayer(playerPosX, playerPosY) {

    // Adjust enemy position to get closer to the player
    if (this.positionX < playerPosX) {
      this.positionX += 0.25;
      this.enemyElm.style.left = this.positionX + "vw";
    } else if (this.positionX > playerPosX) {
      this.positionX -= 0.25;
      this.enemyElm.style.left = this.positionX + "vw";
    }

    if (this.positionY < playerPosY) {
      this.positionY += 0.25;
      this.enemyElm.style.bottom = this.positionY + "vh";
    } else if (this.positionY > playerPosY) {
      this.positionY -= 0.25;
      this.enemyElm.style.bottom = this.positionY + "vh";
    }
  }
}

class Bullet {
  constructor(){
    this.positionX =
    this.positionY =
    this.width = 
    this.height = 
    this.speed = 1
  }
}

// create char instances
const enemyArr = [];
const player = new Player();

// spawn new enemies
setInterval(() => {
  const newEnemy = new Enemy(); // Create a new enemy instance
  enemyArr.push(newEnemy);
}, 3000);

// enemy movement loop
setInterval(() => {
  
  //loop through enemy arr
  enemyArr.forEach((enemyInstance) => {
    // move enemies
    enemyInstance.trackPlayer(player.positionX, player.positionY);

    // detect collision
    if (
      player.positionX < enemyInstance.positionX + enemyInstance.width &&
      player.positionX + player.width > enemyInstance.positionX &&
      player.positionY < enemyInstance.positionY + enemyInstance.height &&
      player.positionY + player.height > enemyInstance.positionY
    ) {
      
      // Collision detected!
      console.log("game over!");
      //location.href = "./gameover.html";
    }
  });
}, 30);

// bullet movement loop
/* setInterval(() => {
  //move bullets

  // detect collision


 // remove bullets off viewport??
}, 30); */

// move key triggers
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

// click event
/* document.addEventListener("click", () =>) */