
// Models
let person = {
	model: null,
	pos: {x:0, y:0, z:-540},
	rotate: {x:0, y:0, z:0}
};
let chunkyBoi = {
	model: null,
	pos: {x:100, y:0, z:10},
	rotate: {x:0, y:0, z:0},
	textures: [ null, null, null, null, null, null ],
	texture: null,
	texturesLoaded: false
};

// Movement
let translation = [ 0, 0, 200 ], rotation = [ 0, 0, 0 ];

let sliders = [];

function setup() {
  const main = select('#main');
  const cnv = createCanvas(600, 450, WEBGL);
  const cnvDiv = createDiv();
  cnv.parent(cnvDiv);
  cnvDiv.class('container');
  cnvDiv.parent(main);

  // Human model:
  // https://clara.io/view/23d8ae52-6bb1-4c5a-8f69-365640f48893#
  loadModel('assets/objs/standard-male-figure.obj', (model) => {
	person.model = model;
	console.log('Model for average human has been loaded');
  });
  // a380 model and textures:
  // https://skfb.ly/6SBUC
  loadModel('assets/objs/a-three-eighty.obj', (model) => {
	chunkyBoi.model = model;
	console.log('Model for a380 has been loaded');
  });
  const max = 1000, step = 0.5;
  let sliderTags = {
	Translation: {
	  x: {
		max: 600, initVal: 0, step
	  },
	  y: {
		max: 600, initVal: 10, step
	  },
	  z: {
		max:890, initVal: 890, step
	  }
	}
  }
  for(let Type in sliderTags) {
	let typeDiv = createDiv(`<h4>${Type}</h4>`);
	typeDiv.class('container');
	for(sliderN in sliderTags[Type]) {
		const sliderCfg = sliderTags[Type][sliderN];
		const type = Type.toLowerCase();
		let sliderDiv = createDiv();
		// sliderDiv.class('container-fluid');
		let sliderLbl = createElement('label', `<h6>${sliderN}: ${sliderCfg.initVal}</h6>`);
		sliderLbl.attribute('for', `${type}-${sliderN}`)
		let slider = createSlider(-sliderCfg.max, sliderCfg.max, sliderCfg.initVal, sliderCfg.step);
		slider.id(`${type}-${sliderN}`);
		slider.class('custom-range');
		slider.style('width', `${width}px`);
		sliderLbl.parent(sliderDiv);
		slider.parent(sliderLbl);
		sliderDiv.parent(typeDiv);
		sliders.push({slide:slider, label:select(`label[for="${type}-${sliderN}"] h6`)});
	}
	typeDiv.parent(main);
  }
  angleMode(DEGREES);
}

function draw() {
  background(51);
  noStroke();
  for(let i = 0; i < translation.length; i++) {
	translation[i] = sliders[i].slide.value();
	let prev = sliders[i].label.html();
	sliders[i].label.html(`${prev.substr(0, prev.indexOf(':') + 1)} ${translation[i]}`);
  }
  ambientLight(60);
  pointLight(255, 255, 255, -translation[0], translation[1], translation[2] + 100);
  translate(-translation[0], translation[1], translation[2]);
  // rotateY(90);


  if (person.model) {
	push();
	rotateZ(180);
	translate(person.pos.x, person.pos.x, person.pos.z);
	ambientMaterial(200);
	model(person.model, true);
	pop();
  }

  if (chunkyBoi.model) {
	push();
	translate(chunkyBoi.pos.x, chunkyBoi.pos.y, chunkyBoi.pos.z);
	rotateY(-90);
	rotateZ(180);
	// scale(0.00885); // Size of human model
	// 0.117705 = 0.00885 * 13.3;
	scale(0.117705);
	ambientMaterial(250);
	if (chunkyBoi.texturesLoaded) {
		texture(chunkyBoi.texture);
	}
	model(chunkyBoi.model, true);
	pop();
  }
}
