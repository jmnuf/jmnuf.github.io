class CirclularVehicle {
	constructor(x, y) {
		this.pos = createVector(x + random(-5, 5), y + random(-5, 5));
		this.vel = createVector();
		this.acc = createVector();
		this.tar = createVector(x, y);
		this.r = 8;
		this.maxSpeed = 6;
		this.maxForce = 0.5;
		this.fleeR = 50;
		this.ZERO = createVector(0, 0);
	}

	applyForce(f) {
		this.acc.add(f);
	}

	update() {
		this.pos.add(this.vel);
		this.vel.add(this.acc);
		this.acc.mult(0);
	}

	flee(target) {
		let desired = p5.Vector.sub(target, this.pos);
		let d = desired.mag();
		if (d < this.fleeR) {
			desired.setMag(this.maxSpeed);
			desired.mult(-1);
			let steer = p5.Vector.sub(desired, this.vel);
			steer.limit(this.maxForce);
			return steer;
		} else {
			return this.ZERO;
		}
	}

	arrive(target) {
		let desired = p5.Vector.sub(target, this.pos);
		let d = desired.mag();
		let speed = this.maxSpeed;
		if (d < 100) {
			speed = map(d, 0, 100, 0, this.maxSpeed);
		}
		desired.setMag(speed);
		let steer = p5.Vector.sub(desired, this.vel);
		steer.limit(this.maxForce);
		return steer;
	}

	example_behaviors() {
		let arrive = this.arrive(this.tar);
		let flee = this.flee(createVector(mouseX, mouseY));
		arrive.mult(1);
		flee.mult(2);
		this.applyForce(arrive);
		this.applyForce(flee);
	}

	dobehaviors(fleeTar, arrTar = this.tar) {
		let arrive = this.arrive(arrTar);
		let flee = this.flee(fleeTar);
		arrive.mult(1);
		flee.mult(2);
		this.applyForce(arrive);
		this.applyForce(flee);
	}

	render(graphics) {
		if (graphics) {
			graphics.push();
			graphics.stroke(255);
			graphics.strokeWeight(this.r);
			graphics.point(this.pos.x, this.pos.y);
			graphics.pop();
		} else {
			push();
			stroke(255);
			strokeWeight(this.r);
			point(this.pos.x, this.pos.y);
			pop();
		}
	}
}