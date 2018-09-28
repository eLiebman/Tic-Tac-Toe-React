function Box() {
  this.filled = false;
}

Box.prototype.fill = function(player) {
  this.filled = player;
}

Box.prototype.check = function(player) {
  if (this.filled === player) {
    return true;
  }
  return false;
}
