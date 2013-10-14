App.Models.LevelMatrix = function(spawnPoint) {
  this.rows = [];

  this.prizes = [];
  var allAvailablePrizeCount = App.allPrizeColors.length;
  for (var i = 0; i < allAvailablePrizeCount; i++) {
    this.prizes.push(new App.Models.Prize(spawnPoint));
  }

  this.prizeForRoom = function(x, y) {
    for (var i = 0; i < this.prizes.length; i++) {
      var prize = this.prizes[i];
      if (prize.roomX === x && prize.roomY === y) {
        return prize;
      }
    }
    return null;
  };

  for (var y = 0; y < App.gridSize; y++) {
    row = [];
    for (var x = 0; x < App.gridSize; x++) {
      row[x] = new App.Models.Room(x, y, this.prizeForRoom(x, y));
    }
    this.rows[y] = row;
  }

  this.findRoom = function(x, y) {
    return this.rows[y][x];
  };
};
