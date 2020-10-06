
// Models
let person;
let chunkyBoi;
let dotFont;

// Movement
let translation = [ 0, 0, 200 ], rotation = [ 0, 0, 0 ];

let sliders = [];

function setup() {
  const main = select('#main');
  const cnv = createCanvas(600, 450, WEBGL);
  dotFont = loadFont('/../assets/fonts/Calvera.ttf', setupLoading);
  //setupLoading(dotFont);
  const cnvDiv = createDiv();
  cnv.parent(cnvDiv);
  cnvDiv.class('container');
  cnvDiv.parent(main);

  // Human model:
  // https://clara.io/view/23d8ae52-6bb1-4c5a-8f69-365640f48893#
  loadModel('/../assets/objs/standard-male-figure.obj', (model) => {
	person = new Human(model);
	console.log('Model for average human has been loaded');
  });
  // a380 model:
  // https://skfb.ly/6SBUC
  loadModel('/../assets/objs/a-three-eighty.obj', (model) => {
	chunkyBoi = new Plane(model);
	console.log('Model for a380 has been loaded');
  });
  const step = 0.5;
  let sliderTags = {
	Translation: {
	  x: {
		max: 200, initVal: 0, step
	  },
	  y: {
		min: 4, max: 500, initVal: 10, step
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
		let sMin = typeof sliderCfg.min === 'number' ? sliderCfg.min : -sliderCfg.max;
		let slider = createSlider(sMin, sliderCfg.max, sliderCfg.initVal, sliderCfg.step);
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
  if (!person || !chunkyBoi) {
  	drawLoading();
  } else {
	background(51);
	noStroke();
	for(let i = 0; i < translation.length; i++) {
	  translation[i] = sliders[i].slide.value();
	  let prev = sliders[i].label.html();
	  sliders[i].label.html(`${prev.substr(0, prev.indexOf(':') + 1)} ${translation[i]}`);
	  if (translation[2] == 890) {
	  	person.pos.z = -540;
	  } else if (translation[2] >= 350) {
	  	person.pos.z = map(translation[2], 350, 890, chunkyBoi.pos.z, -540);
	  } else {
	  	person.pos.z = chunkyBoi.pos.z;
	  }
	}

	ambientLight(60);
	pointLight(255, 255, 255, -translation[0], translation[1], translation[2] + 100);
	pointLight(color(250), chunkyBoi.pos.x + 100, chunkyBoi.pos.y - 200, chunkyBoi.pos.z + 100);
	translate(-translation[0], translation[1], translation[2]);

	push();
	translate(0, 10, 0);
	fill(200);
	box(5000, 20, 5000);
	pop();
	
	person.render();
	chunkyBoi.render();
  }
}
