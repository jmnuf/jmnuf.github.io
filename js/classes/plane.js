class Plane extends JM_3DBasics {
	constructor(model) {
		super(0, 0, 0);
		this.model = model;
		this.rotate.y = -90;
		this.rotate.z = 180;
		this.texture = null;
	}

	render() {
		push();
		rotationOfSelf();
		translateToSelf();
		if (JM_3DBasics.isValidTexture(this.texture)) {
			texture(this.texture);
		}
		ambientMaterial(200);
		model(this.model);
		pop();
	}

}