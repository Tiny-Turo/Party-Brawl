window.random = function (min, max) {
  return Math.random() * (max - min) + min;
};

window.randomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

window.distanceSquared = function (a, b) {
  return Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2);
};
