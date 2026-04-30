export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function createBox(x, y, width, height) {
  return { x, y, width, height };
}

export function boxesIntersect(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

export function separateFighters(a, b, world) {
  if (!boxesIntersect(a.getBodyBox(), b.getBodyBox())) {
    return;
  }

  const aCenter = a.x + a.width / 2;
  const bCenter = b.x + b.width / 2;
  const overlap = Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x);
  const direction = aCenter <= bCenter ? -1 : 1;
  const push = Math.max(0, overlap / 2);

  a.x = clamp(a.x + direction * push, world.stagePadding, world.width - a.width - world.stagePadding);
  b.x = clamp(b.x - direction * push, world.stagePadding, world.width - b.width - world.stagePadding);
}
