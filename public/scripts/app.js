App = {
  width: 800,
  height: 600,
  gridSize: 3,
  allPrizeColors: ["#4183c4", "#c80000", "#007b00"]
};
App.Models = {};

(function() {
  var previousTime = 0
    , INTERVAL = 30
    , hero
    , level
    , currentRoom
    , LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;

  var loop = function() {
    var currentTime = new Date().getTime()
      , timeElapsed;

    if (previousTime === 0) {
      previousTime = currentTime;
    }

    timeElapsed = currentTime - previousTime;

    update(timeElapsed, currentTime);
    draw(canvas, timeElapsed, currentTime);

    previousTime = currentTime;
  };

  var update = function(timeElapsed, currentTime) {
    if (key.isPressed(RIGHT)) {
      hero.x += hero.vx;
    }
    if (key.isPressed(LEFT)) {
      hero.x -= hero.vx;
    }
    if (key.isPressed(UP)) {
      hero.y -= hero.vy;
    }
    if (key.isPressed(DOWN)) {
      hero.y += hero.vy;
    }

    // touch the prize!
    var prize = currentRoom.prize;
    if (prize &&
        hero.x + hero.size > prize.x &&
        hero.x < prize.x + prize.size &&
        hero.y + hero.size > prize.y &&
        hero.y < prize.y + prize.size
       )
    {
      hero.prizes.push(prize);
      currentRoom.prize = null;
    }

    if (hero.y < 0 && currentRoom.north.isPassable) {
      changeRoom(0, -1);
    }
    if (hero.x + hero.size > App.width && currentRoom.east.isPassable) {
      changeRoom(1, 0);
    }
    if (hero.y + hero.size > App.height && currentRoom.south.isPassable) {
      changeRoom(0, 1);
    }
    if (hero.x < 0 && currentRoom.west.isPassable) {
      changeRoom(-1, 0);
    }

    // constrain hero to bounds of screen.
    hero.x = Math.max(0, Math.min(hero.x, App.width - hero.size));
    hero.y = Math.max(0, Math.min(hero.y, App.height - hero.size));
  };

  var draw = function(canvas, timeElapsed, currentTime) {
    var context = canvas.getContext("2d");
    clearCanvas(canvas);

    hero.draw(context);
    currentRoom.draw(context);
  };

  var clearCanvas = function(canvas) {
    var c = canvas.getContext("2d");
    c.beginPath();
    c.rect(0, 0, App.width, App.height);
    c.fillStyle = "#CCCC99";
    c.fill();
  };

  var changeRoom = function(deltaX, deltaY) {
    var newRoom = level.findRoom(currentRoom.x + deltaX, currentRoom.y + deltaY);
    currentRoom = newRoom;

    // bump to opposite side of screen
    if (deltaY < 0) {
      hero.y = App.height - hero.size;
    }
    if (deltaY > 0) {
      hero.y = 0;
    }
    if (deltaX < 0) {
      hero.x = App.width - hero.size;
    }
    if (deltaX > 0) {
      hero.x = 0;
    }
  };

  App.start = function() {
    var canvas = document.getElementById("canvas")
      , c = canvas.getContext("2d");

    hero = new App.Models.Hero();
    hero.x = (App.width - hero.size) / 2;
    hero.y = (App.height - hero.size) / 2;

    var spawnPoint = App.getRandomCoordinates();
    level = new App.Models.LevelMatrix(spawnPoint);
    currentRoom = level.findRoom(spawnPoint.x, spawnPoint.y);

    setInterval(loop, INTERVAL);
  };
})();

window.onload = function() {
  App.start();
};
