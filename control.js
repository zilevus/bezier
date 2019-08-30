import Bezier, {Vector} from './bezier.js';
import {drawProgress, removeProgress} from './visuals/index.js'

const $ = document.querySelectorAll.bind(document);
const [wrapper] = $('svg');
const [pathElement] = $('#bezier-curve');
const points = $('.point-wrapper');
const [progressGroup] = $('#progress');

const [p0toP1] = $('#p0-to-p1');
const [p2toP3] = $('#p2-to-p3');

const curve = new Bezier(
  new Vector(100, 100),
  new Vector(300, 100),
  new Vector(100, 300),
  new Vector(300, 300),
);

const redrawCurve = () => {
  pathElement.setAttribute('d', curve.pathString());

  // Redraw lines between 0-1 and 2-3
  p0toP1.setAttribute('x1', curve.p0.x);
  p0toP1.setAttribute('y1', curve.p0.y);
  p0toP1.setAttribute('x2', curve.p1.x);
  p0toP1.setAttribute('y2', curve.p1.y);

  p2toP3.setAttribute('x1', curve.p2.x);
  p2toP3.setAttribute('y1', curve.p2.y);
  p2toP3.setAttribute('x2', curve.p3.x);
  p2toP3.setAttribute('y2', curve.p3.y);

  // Reposition control points
  for (let i = 0; i < 4; i++) {
    const pointGroup = points[i];
    const pointVector = curve[`p${i}`];
    pointGroup.setAttribute('transform', `translate(${pointVector.x},${pointVector.y})`);
  }

  // Draw progress points
  drawProgress(curve, progressGroup);
};

let draggedElementIndex = -1;
let draggedElementPositionOffset = [0, 0];
points.forEach((point, index) => {
  point.addEventListener('mousedown', ({clientX, clientY}) => {
    const currentPosition = curve[`p${index}`];
    draggedElementPositionOffset = [currentPosition.x - clientX, currentPosition.y - clientY];
    draggedElementIndex = index;
  });
});

wrapper.addEventListener('mousemove', ({clientX, clientY}) => {
  if (draggedElementIndex !== -1) {
    // Find the new position
    const newX = clientX + draggedElementPositionOffset[0];
    const newY = clientY + draggedElementPositionOffset[1];

    // Update the point position
    const point = curve[`p${draggedElementIndex}`];
    point.x = newX;
    point.y = newY;

    // Re-draw the curve
    redrawCurve();
  }
});

wrapper.addEventListener('mouseup', (e) => {
  draggedElementIndex = -1;
});


redrawCurve();
