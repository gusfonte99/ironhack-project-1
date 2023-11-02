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
    this.enemyElm = null;

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
  constructor(mouseX, mouseY) {
    this.positionX = player.getPosX() + player.width / 2;
    this.positionY = player.getPosY() + player.height / 2;
    this.speed = 1.25;
    
    this.mouseX = mouseX
    this.mouseY = mouseY

    this.width = 0.5;
    this.height = 1;
    this.bulletElm = null;
    
    this.createDomElement();
  }

  createDomElement() {
    this.bulletElm = document.createElement("div");
    this.bulletElm.classList.add("bullet");

    this.bulletElm.style.width = this.width + "vw";
    this.bulletElm.style.height = this.height + "vh";
    this.bulletElm.style.left = this.positionX + "vw";
    this.bulletElm.style.bottom = this.positionY + "vh";

    const parentElm = document.getElementById("board");
    parentElm.appendChild(this.bulletElm);
  }

  moveBullet() {
    const dx = this.mouseX - this.positionX;
    const dy = this.mouseY - this.positionY;

    const magnitude = Math.sqrt(dx * dx + dy * dy);
    const normDX = dx / magnitude
    const normDY = dy / magnitude

    this.mouseX += normDX * this.speed
    this.mouseY += normDY * this.speed
    this.positionX += normDX * this.speed
    this.positionY += normDY * this.speed

    this.bulletElm.style.left = this.positionX + 'vw'
    this.bulletElm.style.bottom = this.positionY + 'vh'
  }
}

// create char instances
const enemyArr = [];
const bulletsArr = [];
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
      //console.log("game over!");
      //location.href = "./gameover.html";
    }
  });
}, 30);

// bullet collision detection loop
setInterval(() => {
  bulletsArr.forEach((bulletInstance) => {
    // detect collision (lopp through enemy arr)
    enemyArr.forEach((enemyInstance) => {
      if (
        bulletInstance.positionX <
          enemyInstance.positionX + enemyInstance.width &&
        bulletInstance.positionX + bulletInstance.width >
          enemyInstance.positionX &&
        bulletInstance.positionY <
          enemyInstance.positionY + enemyInstance.height &&
        bulletInstance.positionY + bulletInstance.height >
          enemyInstance.positionY
      ) {
        // Collision detected!
        console.log("enemy hit!");
      }
    });
  });
}, 30);

// move key triggers
document.addEventListener("keydown", (e) => {
  switch (e.code) {
    /*     case "ArrowUp" && "ArrowLeft":
      player.moveUp();
      player.moveLeft();
      break;
    case "ArrowUp" && "ArrowRight":
      player.moveUp();
      player.moveRight();
      break;
    case "ArrowDown" && "ArrowLeft":
      player.moveDown();
      player.moveLeft();
      break;
    case "ArrowDown" && "ArrowRight":
      player.moveDown();
      player.moveRight();
      break; */

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
document.addEventListener("click", (e) => {
  const vw = [document.documentElement.clientWidth];
  const vh = [document.documentElement.clientHeight];

  const mouseX = (e.clientX / vw) * 100;
  const mouseY = 100 - (e.clientY / vh) * 100;

  const bullet = new Bullet(mouseX, mouseY);
  bulletsArr.push(bullet);
  //bullet.moveBullet();
  console.log(bulletsArr)
});
