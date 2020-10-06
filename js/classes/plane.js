class Plane extends JM_3DBasics {
	constructor(model) {
		super(100, 0, -10);
		this.model = model;
		this.rotate.y = -90;
		this.rotate.z = 180;
		this.texture = null;
	}

	render() {
		push();
		this.translateToSelf();
		this.rotationOfSelf();
		if (JM_3DBasics.isValidTexture(this.texture)) {
			texture(this.texture);
		}
		ambientMaterial(230);
		scale(0.117705);
		model(this.model);
		pop();
	}

}