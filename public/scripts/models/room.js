App.Models.Boundary = function() {
};

App.Models.Door = function() {
  this.prototype = App.Models.Boundary;
  this.isPassable = true;
};

App.Models.Wall = function() {
  this.prototype = App.Models.Boundary;
  this.isPassable = false;
};

App.Models.Room = function(x, y, prize) {
  this.x = x;
  this.y = y;
  this.prize = prize;

  var generateBoundary = function(isGridEdge) {
    return isGridEdge ? new App.Models.Wall() : new App.Models.Door();
  };

  this.north = generateBoundary(y === 0);
  this.east = generateBoundary(x === App.gridSize - 1);
  this.south = generateBoundary(y === App.gridSize - 1);
  this.west = generateBoundary(x === 0);

  this.color = "#000000";
  this.thickness = 10;

  this.drawWall = function(context, x, y, x2, y2) {
    context.beginPath();
    context.rect(x, y, x2, y2);
    context.fillStyle = this.color;
    context.fill();
  };

  this.draw = function(context) {
    if (!this.north.isPassable) {
      this.drawWall(context, 0, 0, App.width, this.thickness);
    }
    if (!this.east.isPassable) {
      this.drawWall(context, App.width - this.thickness, 0, App.width, App.height);
    }
    if (!this.south.isPassable) {
      this.drawWall(context, 0, App.height - this.thickness, App.width, App.height);
    }
    if (!this.west.isPassable) {
      this.drawWall(context, 0, 0, this.thickness, App.height);
    }

    if (this.prize) {
      this.prize.draw(context);
    }
  };
};
