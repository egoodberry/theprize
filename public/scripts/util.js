App.getRandomCoordinates = function() {
  var x = App.getRandomNumber(0, App.gridSize - 1)
    , y = App.getRandomNumber(0, App.gridSize - 1);

  return { x: x, y: y };
};

App.getRandomNumber = function(min, max) {
  var min = min || 0
    , max = max || $scope.maximum;
  return Math.floor(Math.random() * (max - min + 1) + min);
}

App.roundedRect = function(ctx,x,y,width,height,radius){
  ctx.beginPath();
  ctx.moveTo(x,y+radius);
  ctx.lineTo(x,y+height-radius);
  ctx.quadraticCurveTo(x,y+height,x+radius,y+height);
  ctx.lineTo(x+width-radius,y+height);
  ctx.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);
  ctx.lineTo(x+width,y+radius);
  ctx.quadraticCurveTo(x+width,y,x+width-radius,y);
  ctx.lineTo(x+radius,y);
  ctx.quadraticCurveTo(x,y,x,y+radius);
  ctx.stroke();
};
