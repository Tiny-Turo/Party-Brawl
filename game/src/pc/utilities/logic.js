window.isEllipsesColliding = function (a, b, minDistance) {
  const dx = a.x - b.x;
  const dy = (a.y - b.y) * 2;
  const r = minDistance;

  return dx * dx + dy * dy <= r * r;
};

window.randomPositionInSpawn = function () {
  // Precompute weights (you can cache these if spawnAreas is constant)
  const weights = spawnAreas.map((a) => a.width * a.height);
  const total = weights.reduce((s, w) => s + w, 0);

  // Pick a rectangle weighted by its area
  let r = Math.random() * total;
  let areaIndex = 0;
  for (; areaIndex < spawnAreas.length; areaIndex++) {
    r -= weights[areaIndex];
    if (r <= 0) break;
  }

  const area = spawnAreas[areaIndex];

  // Then pick uniformly within that rectangle
  const x = random(area.x, area.x + area.width);
  const y = random(area.y, area.y + area.height);

  return { x, y };
};
