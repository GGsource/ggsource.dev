// Drawing on the canvas on top of the SVG
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasParent = canvas.parentElement;
canvas.width = canvasParent.clientWidth;
canvas.height = canvasParent.clientHeight;
ctx.translate(canvas.width / 2, canvas.height / 2);

// Let's create 6 points for our hexagon
// To make it easier, make them in polar coordinates then convert to cartesian
// Top & bottom are pointy ends
// diameter of hex
var radius = canvas.width / 2.2;
var polarPoints = [
    [90, radius],
    [30, radius],
    [330, radius],
    [270, radius],
    [210, radius],
    [150, radius]
];

// Function to convert polar coordinates to cartesian
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = angleInDegrees * Math.PI / 180.0;
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

var cartesianPoints = [];

for (var i = 0; i < polarPoints.length; i++) {
    cartesianPoints.push(polarToCartesian(0, 0, polarPoints[i][1], polarPoints[i][0]));
}

// Draw the hexagon
ctx.beginPath();
// move cursor to first position
ctx.moveTo(cartesianPoints[0].x, cartesianPoints[0].y);
// draw the rest of the points
for (var i = 1; i < cartesianPoints.length; i++) {
    ctx.lineTo(cartesianPoints[i].x, cartesianPoints[i].y);
}

ctx.lineWidth = 30;
ctx.strokeStyle = "#f12e2e";
// round corners
ctx.lineCap = "round";
ctx.lineJoin = "round";
// close the path
ctx.closePath();
ctx.fillStyle = "#5c0202b2";
ctx.fill();
// Apply the stroke
ctx.stroke();
// fill the hexagon

// declare where the points are for one of the G's that we will draw on the logo. In polar coordinates
var innerRadius = radius * 0.8;
var gPoints = [
    [-103, innerRadius / 2.1], // 0
    [-95, innerRadius - 8.5], // 1
    [-150, innerRadius], // 2
    [-210, innerRadius], // 3
    [-265, innerRadius - 8.5], // 4
    [-260, innerRadius / 8], // 5
    [-210, innerRadius * 3 / 5], // 6
];

// Map the polar coordinates into cartesian coordinates and put in a new array
var gCartesianPoints = [];
for (var i = 0; i < gPoints.length; i++) {
    gCartesianPoints.push(polarToCartesian(0, 0, gPoints[i][1], gPoints[i][0]));
}

// Points 0, 1, 4, and 5 should all be vertically parallel and should be calculated off of point 0
// We can take point 0's cartesian coordinate x value and use it for the other points
gCartesianPoints[1].x = gCartesianPoints[0].x;
gCartesianPoints[4].x = gCartesianPoints[0].x;
gCartesianPoints[5].x = gCartesianPoints[0].x;


// Draw the G
ctx.beginPath();
// move cursor to first position
ctx.moveTo(gCartesianPoints[0].x, gCartesianPoints[0].y);
// draw the rest of the points
for (var i = 1; i < gCartesianPoints.length; i++) {
    ctx.lineTo(gCartesianPoints[i].x, gCartesianPoints[i].y);
}

// Apply the stroke
ctx.lineWidth = 30;
ctx.strokeStyle = "#961a1a";
// round corners
ctx.lineCap = "round";
ctx.lineJoin = "round";
ctx.stroke();

// Mirror all the points to the other side of the y axis to make the second G
gCartesianPoints = gCartesianPoints.map(function (point) {
    return {
        x: -point.x,
        y: point.y
    };
});

// Draw the second G
ctx.moveTo(gCartesianPoints[0].x, gCartesianPoints[0].y);
for (var i = 1; i < gCartesianPoints.length; i++) {
    ctx.lineTo(gCartesianPoints[i].x, gCartesianPoints[i].y);
}
ctx.stroke();

// // save the canvas as an image
// var canvasImage = canvas.toDataURL("../images/");
// // Apply it to an image
// var img = new Image();
// img.src = canvasImage;

// var link = document.createElement('a');
// link.download = 'favicon.png';
// link.href = canvasImage;

// link.click();