
class MathHelper {
  static distance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  }

  static collition(velocity1, velocity2, weight1, weight2) {
    return new Vector2f(
      ((weight1 - weight2) * velocity1.x + 2 * weight2 * velocity2.x) / (weight1 + weight2),
      ((weight1 - weight2) * velocity1.y + 2 * weight2 * velocity2.y) / (weight1 + weight2),
    );
  }

  static sphereVolume(r) {
    return 4 / 3 * Math.PI * r * r * r;
  }
}