const particles = [];
//setup function
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  //create more particles based on window size
  const particlesLength = Math.floor(window.innerWidth / 14);
  //loop through
  for (let i = 0; i < particlesLength; i++) {
    particles.push(new Particle());
  }
}

//draw function
function draw() {
  background(0, 0, 0);
  particles.forEach((p, index) => {
    p.update();
    p.draw();
    p.checkParticles(particles.slice(index));
  });
}

//create class for particles
class Particle {
  constructor() {
    //position
    this.position = createVector(random(width), random(height));
    //velocity
    this.velocity = createVector(random(-1, 2), random(-2, 1));
    //size
    this.size = 20;
  }

  //create velocity (how much it is going to move)
  update() {
    this.position.add(this.velocity);
    this.edges();
  }

  //draw particle, size and color
  draw() {
    noStroke();
    fill("rgba(255, 255, 255, 0.8)");
    circle(this.position.x, this.position.y, this.size);
  }
  edges() {
    if (this.position.x < 0 || this.position.x > width) {
      this.velocity.x *= -1;
    }

    if (this.position.y < 0 || this.position.y > width) {
      this.velocity.y *= -1;
    }
  }
  //connect the particles
  checkParticles(particles) {
    particles.forEach(particle => {
      const d = dist(
        this.position.x,
        this.position.y,
        particle.position.x,
        particle.position.y
      );

      if (d < 130) {
        stroke("rgba(255, 255, 255, 0.2");
        line(
          this.position.x,
          this.position.y,
          particle.position.x,
          particle.position.y
        );
      }
    });
  }
}
