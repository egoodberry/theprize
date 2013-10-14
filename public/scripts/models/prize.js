App.Models.Prize = function(spawnPoint) {
  this.x = App.getRandomNumber(10, App.width);
  this.y = App.getRandomNumber(10, App.height);

  this.color = App.allPrizeColors.pop();
  this.size = 15;

  var getRoomCoordinates = function() {
    var coordinates = { x: null, y: null };
    do { coordinates = App.getRandomCoordinates(); }
    while (coordinates.x === spawnPoint.x && coordinates.y === spawnPoint.y);
    return coordinates;
  };

  var room = getRoomCoordinates();
  this.roomX = room.x;
  this.roomY = room.y;

  this.draw = function(context) {
    context.beginPath();
    context.rect(this.x, this.y, this.size, this.size);
    context.fillStyle = this.color;
    context.fill();
  };
};
