App.Models.Hero = function() {
  this.x = 0;
  this.y = 0;

  this.vx = 10;
  this.vy = 10;

  this.color = "#9900FF";
  this.size = 50;

  this.draw = function(context) {
    context.beginPath();
    context.rect(this.x, this.y, this.size, this.size);
    context.fillStyle = this.color;
    context.fill();
  };
};
