let nPelotas = 1000;
let pelotas = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	for (let i = 0; i < nPelotas; i++) {
		pelotas[i] = new RandomWalek(i);
	}
}

function draw() {
	for (let i = 0; i < nPelotas; i++) {
		pelotas[i].update();
		pelotas[i].display();
	}
}

// -------------------------------
// ----------- Classes -----------
// -------------------------------

// ------ Random Walker -------------
class RandomWalek {
	constructor(_name) {
		this.red = random(0, 255);
		this.green = random(100, 255);
		this.blue = random(100, 150);

		this.t = 0;
		this.tSpeed = random(0.5);
		this.noiseShift = random(1000);

		this.pos = createVector(width / 2, height / 2);
		this.speed = createVector(random(-2, 2), random(-2, 2));
		this.diametro = random(5, 15);
		print('Hola! soy la pelota ' + this.name);
	}
	update(_t) {
		this.speed.rotate(
			map(noise(this.t + this.noiseShift), 0, 1, -0.5, 0.5)
		);
		this.pos.add(this.speed);

		this.t += this.tSpeed;
	}
	display() {
		stroke('rgba(0,0,0,.2)');
		strokeWeight(3);
		fill(this.red, this.green, this.blue);
		ellipse(this.pos.x, this.pos.y, this.diametro, this.diametro);
	}
}
