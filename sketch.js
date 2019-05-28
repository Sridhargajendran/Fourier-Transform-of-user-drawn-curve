const USER = 0;
const FOURIER = 1;

let x = [];
let y = [];
let fourierX;
let fourierY;
let path = [];
var angle = 0;
let yvalues = [];
let drawing = [];
let state = -1;

function mousePressed() {
  state = USER;
  drawing = [];
  x = [];
  y = [];
  time = 0;
  path = [];
}

function mouseReleased() {
  state = FOURIER;
  const skip = 1;
  for (var i = 0; i < drawing.length; i += skip) {
    //let ang = map(i, 0, 100, 0, TWO_PI);
    x.push(drawing[i].x);
    y.push(drawing[i].y);
  }
  //y = [100, 100, 100, -100, -100, -100, 100, 100, 100, -100, -100, -100];
  fourierX = dft(x);
  fourierY = dft(y);

  fourierX.sort((a, b) => b.amp - a.amp);
  fourierY.sort((a, b) => b.amp - a.amp);
}

function setup() {
  createCanvas(800, 600);
}

function epiCycles(x, y, rotation, fourier) {
  for (var i = 0; i < fourier.length; i++) {
    let prevx = x;
    let prevy = y;
    let freq = fourier[i].freq;
    let radius = fourier[i].amp;
    let phase = fourier[i].phase;

    x += radius * cos(freq * angle + phase + rotation);
    y += radius * sin(freq * angle + phase + rotation);

    stroke(255);
    noFill();
    ellipse(prevx, prevy, radius * 2);
    //ellipse(x, y, 8, 8);
    line(prevx, prevy, x, y);
  }
  return createVector(x, y);
}

function draw() {
  background(0);
  if (state == USER) {
    var point = createVector(mouseX - width / 2, mouseY - height / 2);
    drawing.push(point);
    beginShape();
    stroke(255);
    noFill();
    for (let v of drawing) {
      vertex(v.x + width / 2, v.y + height / 2);
    }
    endShape();
  } else if (state == FOURIER) {
    let vx = epiCycles(width / 2, 50, 0, fourierX);
    let vy = epiCycles(50, height / 2, HALF_PI, fourierY);
    let v = createVector(vx.x, vy.y);
    path.unshift(v);

    beginShape();

    stroke(255);
    noFill();
    line(vx.x, vx.y, v.x, v.y);
    line(vx.y, vy.y, v.x, v.y);
    for (var i = 0; i < path.length; i++) {
      vertex(path[i].x, path[i].y);
    }
    endShape();

    //if (yvalues.length > 150) {
    //yvalues.pop();
    // }
    let dt = TWO_PI / fourierY.length;
    angle += dt;

    if (angle > TWO_PI) {
      angle = 0;
      path = [];
    }
  }
}
