// to make sure that computer brick is not as fast as the ball speed
const SPEED = 0.02;

export default class Brick {
  constructor(brickElem) {
    this.brickElem = brickElem;
  }

  // Paddle elements position getter and setter
  get position() {
    return parseFloat(
      getComputedStyle(this.brickElem).getPropertyValue("--position")
    );
  }
  set position(value) {
    this.brickElem.style.setProperty("--position", value);
  }

  // Returns if ball is touching brick
  rect() {
    return this.brickElem.getBoundingClientRect();
  }

  reset() {
    this.position = 50;
  }

  // Gets ball position to update computer brick
  update(delta, ballHeight) {
    this.position += SPEED * delta * (ballHeight - this.position);
  }
}
