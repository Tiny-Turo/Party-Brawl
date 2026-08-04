window.isEllipsesColliding = function (a, b, minDistance) {
  const dx = a.x - b.x;
  const dy = (a.y - b.y) * 2;
  const r = minDistance;

  return dx * dx + dy * dy <= r * r;
};
