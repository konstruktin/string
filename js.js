var nodesQ = 362;
var gapsQ = nodesQ-1;
var stringScreenRatio;
var nn;

var tension = 0.1;
var sympathy = 0.01;
var damp = 0.999;

var x = new Array(nodesQ);
var y = new Array(nodesQ).fill(0);
var v = new Array(nodesQ).fill(0);
var a = new Array(nodesQ).fill(0);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function setup() {
	createCanvas(windowWidth, windowHeight);
	fill(0, 64, 64);
	stroke(0, 255, 255);

	stringScreenRatio = height/2;
	nn = new Array(windowWidth);
	xnn();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function draw() {
	background(32);

	beginShape();
	for (var i = 0; i < nodesQ; i++) {
		vertex(x[i], (y[i] + 1) * stringScreenRatio);
	}
	endShape();

	for (var i = 1; i < gapsQ; i++) {
		a[i] = (y[i-1] - y[i] + y[i+1] - y[i]) * tension + (v[i-1] - v[i] + v[i+1] - v[i]) * sympathy;
	}

	for (var i = 1; i < gapsQ; i++) {
		v[i] = v[i] * damp + a[i];
		y[i] += v[i];
	}

	if (mouseIsPressed) {
		y[nn[mouseX]] = mouseY / stringScreenRatio - 1;
		v[nn[mouseX]] = 0;
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function xnn() {
	var distanceBetweenNodes = width / gapsQ;

	for (var node = 0; node < nodesQ; node++) {
		x[node] = node * distanceBetweenNodes;
	}

	var currentBorder = distanceBetweenNodes / 2;
	var currentNearestNode = 0;

	for (var i = 0; i < width; i++) {
		if (i > currentBorder) {
			currentBorder += distanceBetweenNodes;
			currentNearestNode++;
		}
		nn[i] = currentNearestNode;
	}
}