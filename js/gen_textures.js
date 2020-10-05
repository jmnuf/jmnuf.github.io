
function loadA380Textures() {
  for(let i = 0; i < 6; i++) {
  	loadImage(`assets/textures/a-three-eighty/_${i + 1}.jpg`, (img) => {
  		chunkyBoi.textures[i] = img;
  		chunkyBoi.textures[`_${i + 1}`] = img;
  		if (!chunkyBoi.textures.includes(null)) {
  			chunkyBoi.texturesLoaded = true;
  			generateA380Texture();
  			console.log('All a380 textures have been loaded');
  		}
  	});
  }
}

function generateA380Texture(parent) {
	// 1787 + 1646x2 = 5079
	// 512 + 1644x2 = 3800
	let g = createGraphics(5079, 3800);
	g.background(51);
	g.imageMode(CENTER);
	g.image(chunkyBoi.textures['_3'], g.width / 2, g.height / 2);
	g.imageMode(CORNER);
	g.image(chunkyBoi.textures['_4'], 0, (g.height / 2) - (519 / 2));
	g.image(chunkyBoi.textures['_2'],  g.width - 1646, (g.height / 2) - (519 / 2));
	if (parent) {
		g.parent(parent);
		g.show();
	}
	chunkyBoi.texture = g;
}
