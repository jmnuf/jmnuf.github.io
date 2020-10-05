class JM_3DBasics {
	constructor(x, y, z) {
		this.pos = createVector(x, y, z);
		this.rotate = createVector();
	}

	rotationOfSelf() {
		if (this.rotate.x != 0) {
			rotateX(this.rotate.x);
		}
		if (this.rotate.y != 0) {
			rotateY(this.rotate.y);
		}
		if (this.rotate.z != 0) {
			rotateZ(this.rotate.z);
		}
	}

	translateToSelf() {
		translate(this.pos.x, this.pos.y, this.pos.z);
	}

	static isValidTexture(texture) {
		if (texture == null || texture == undefined) return false;
		return texture instanceof p5.Image || texture instanceof p5.MediaElement || p5.Graphics
	}
}