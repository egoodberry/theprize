App.Models.Hero = function() {
  this.x = 0;
  this.y = 0;

  this.vx = 10;
  this.vy = 10;

  this.size = 50;

  this.prizes = [];

  this.draw = function(context) {
    this.drawBody(context);
    this.drawEyes(context);
    this.drawBelt(context);
    this.drawPrizes(context);
  };

  this.drawBody = function(context) {
    context.beginPath();
    App.roundedRect(context, this.x, this.y, this.size, this.size, 4);
    context.fillStyle = "#9900FF";
    context.fill();
  };

  this.drawEyes = function(context) {
    context.beginPath();
    App.roundedRect(context, this.x + 30, this.y + 10, 2, 5, 2);
    context.fillStyle = "#000000";
    context.fill();

    context.beginPath();
    App.roundedRect(context, this.x + 20, this.y + 10, 2, 5, 2);
    context.fillStyle = "#000000";
    context.fill();
  };

  this.drawBelt = function(context) {
    context.beginPath();
    context.rect(this.x, this.y + 30, this.size, 5);
    context.fillStyle = "#555555";
    context.fill();
  };

  this.drawPrizes = function(context) {
    for (var i = 0; i < this.prizes.length; i++) {
      context.beginPath();
      context.rect(this.x + (9 * i) + (4 * i), this.y + 28, 9, 9);
      context.fillStyle = this.prizes[i].color;
      context.fill();
    }
  };
};
