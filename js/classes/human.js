class Human extends JM_3DBasics {
	constructor(model) {
		super(0, 0, -540);
		this.model = model;
		this.rotate.z = 180;
		this.texture = null;
	}

	move(x, y, z) {
		this.pos.add(x, y, z);
	}

	render() {
		push();
		this.rotationOfSelf();
		this.translateToSelf();
		if (JM_3DBasics.isValidTexture(this.texture)) {
			texture(this.texture);
		}
		ambientMaterial(200);
		model(this.model);
		pop();
	}

	copy() {
		cpy = new Human(this.model);
		cpy.pos = this.pos.copy();
		cpy.rotate = this.rotate.copy();
		return cpy;
	}
}