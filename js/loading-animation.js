let vehicles = [];
let loading;

function setupLoading(font, x = 50, y = height / 2, fSize = 150) {
	loading = createGraphics(width, height);
	let destPoints = font.textToPoints('Loading', x, y, fSize);
	for(let pt of destPoints) {
		vehicles.push(new CirclularVehicle(pt.x, pt.y));
	}
}

function drawLoading() {
	if (!loading) return;
	loading.background(51);
	let mouse = createVector(mouseX, mouseY);
	for(let v of vehicles) {
		v.dobehaviors(mouse);
		v.update();
		v.render(loading);
	}
	imageMode(CORNER);
	image(loading, -width / 2, -height / 2);
}