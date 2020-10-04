
// Models
let person = {
	model: null,
	pos: {x:0, y:0, z:-540},
	rotate: {x:0, y:0, z:0}
};
let chunkyBoi = {
	model: null,
	pos: {x:100, y:0, z:10},
	rotate: {x:0, y:0, z:0}
};

// Movement
let translation = [ 0, 0, 200], rotation = [ 0, 0, 0 ];

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
  // a380 model:
  // https://skfb.ly/6SBUC
  loadModel('assets/objs/a-three-eighty.obj', (model) => {
  	chunkyBoi.model = model;
  	console.log('Model for a380 has been loaded');
  });
  let sliderTags = [ 'x: ', 'y: ', 'z: ' ];
  for(let i = 0; i < sliderTags.length; i++) {
  	let div = createDiv(sliderTags[i]);
  	div.class('container-fluid');
  	const max = 1000;
  	let slider = createSlider(-max, max, 0, 0.5)
  	slider.style('width', `90%`);
  	slider.parent(div);
  	sliders.push(slider);
  	div.parent(main);
  }
  sliders[1].value(10);
  sliders[2].value(890);
  angleMode(DEGREES);
}

function draw() {
  background(51);
  for(let i = 0; i < translation.length; i++) {
  	translation[i] = sliders[i].value();
  }
  translate(-translation[0], translation[1], translation[2]);
  // rotateY(90);


  if (person.model) {
  	push();
  	rotateZ(180);
  	translate(person.pos.x, person.pos.x, person.pos.z);
  	normalMaterial();
  	model(person.model, true);
  	pop();
  }

  if (chunkyBoi.model) {
  	push();
  	translate(chunkyBoi.pos.x, chunkyBoi.pos.y, chunkyBoi.pos.z);
  	rotateY(-90);
  	rotateZ(180);
  	scale(0.11505);
  	// scale(0.00885); // Size of human model
  	normalMaterial();
  	model(chunkyBoi.model, true);
  	pop();
  }
}
