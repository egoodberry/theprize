App.Models.Prize = function(spawnPoint) {
  this.x = App.getRandomNumber(10, App.width);
  this.y = App.getRandomNumber(10, App.height);

  this.color = '#4183c4';
  this.size = 15;

  this.roomX = App.getRandomNumber(0, App.gridSize - 1);
  this.roomY = App.getRandomNumber(0, App.gridSize - 1);

  this.draw = function(context) {
    context.beginPath();
    context.rect(this.x, this.y, this.size, this.size);
    context.fillStyle = this.color;
    context.fill();
  };
};
