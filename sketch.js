let pelotas = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	for (let i = 0; i < pelotas.length; i++) {
		if (pelotas[i].isAlife) {
			pelotas[i].update();
			pelotas[i].display();
		} else {
			pelotas.splice(i, 1);
		}
	}
}

function mouseClicked() {
	background('rgba(255,255,255,0.2)');
	for (let i = 0; i < 200; i++) {
		let nuevaPlanta = new Plantita(mouseX, mouseY);
		pelotas.push(nuevaPlanta);
	}
	// print(pelotas.length);
}

// -------------------------------
// ----------- Classes -----------
// -------------------------------

// ------ Random Walker -------------
class Plantita {
	constructor(_mouseX, _mouseY) {
		this.red = random(150, 255);
		this.green = random(100, 255);
		this.blue = random(100, 150);

		this.t = 0;
		this.tSpeed = random(0.2);
		this.noiseShift = random(1000);
		this.lifespan = int(random(30, 50));

		this.isAlife = true;

		this.pos = createVector(_mouseX, _mouseY);
		this.speed = createVector(random(-4, 4), random(-4, 4));
		this.diametro = random(10, 30);
		this.bolitaFinal = this.diametro / 2;
		print('Hola: viviré ' + this.lifespan + ' frames.');
	}
	update(_t) {
		this.speed.rotate(
			map(noise(this.t + this.noiseShift), 0, 1, -0.1, 0.1)
		);

		this.pos.add(this.speed);
		this.t += this.tSpeed;

		this.lifespan--;
	}
	display() {
		stroke('rgba(0,0,0,.2)');
		strokeWeight(3);
		fill(this.red, this.green, this.blue);
		ellipse(this.pos.x, this.pos.y, this.diametro, this.diametro);

		if (this.lifespan <= 0) {
			this.muriending();
		}
	}

	muriending() {
		this.diametro -= 0.6;
		if (this.diametro <= 0) {
			this.isAlife = false;
			print('me morí, porque mi vida es ' + this.isAlife);
			ellipse(this.pos.x, this.pos.y, this.bolitaFinal, this.bolitaFinal);
		}
	}
}
