const INITIAL_VELOCIY = 0.025;
const VELOCITY_INCREASE = 0.000003;

export default class Ball {
  constructor(ballElem) {
    this.ballElem = ballElem;
    this.reset();
  }

  // Helper functions to get and set positions for ball
  get x() {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"));
  }
  set x(value) {
    this.ballElem.style.setProperty("--x", value);
  }

  get y() {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"));
  }
  set y(value) {
    this.ballElem.style.setProperty("--y", value);
  }

  rect() {
    return this.ballElem.getBoundingClientRect();
  }

  // Setting direction
  reset() {
    this.x = 50;
    this.y = 50;
    this.direction = { x: 0 };
    while (
      Math.abs(this.direction.x) <= 0.2 ||
      Math.abs(this.direction.x) >= 0.9
    ) {
      const heading = randomNumberBetween(0, 2 * Math.PI); // Direction of where ball is heading
      this.direction = { x: Math.cos(heading), y: Math.sin(heading) }; // converting heading direction to unit vector directions // always = 1
    }
    // Velocity
    this.velocity = INITIAL_VELOCIY;
  }

  // To bounce of the bricks
  update(delta, brickRects) {
    this.x += this.direction.x * this.velocity * delta;
    this.y += this.direction.y * this.velocity * delta;

    // To increase velocity incrementally
    this.velocity += VELOCITY_INCREASE * delta;

    // TO bounce of top and bottom
    const rect = this.rect();

    if (rect.bottom >= window.innerHeight || rect.top <= 0) {
      this.direction.y *= -1;
    }

    // To bounce of bricks
    // Changes the direction if collided with rects
    if (brickRects.some((r) => isCollision(r, rect))) {
      this.direction.x *= -1;
    }
  }
}

// Getting a random number b/w 0 and 1
function randomNumberBetween(min, max) {
  return Math.random() * (max - min) + min;
}

// Checks if ball is colliding
function isCollision(rect1, rect2) {
  return (
    rect1.left <= rect2.right &&
    rect1.right >= rect2.left &&
    rect1.top <= rect2.bottom &&
    rect1.bottom >= rect2.top
  );
}
