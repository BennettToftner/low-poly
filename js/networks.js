//TODO: stop triangles from overlapping

var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext('2d');

var NUM_POINTS_X = 10;
var NUM_POINTS_Y = 10;

var LOWER_RED = 0;
var HIGHER_RED = 200;
var LOWER_GREEN = 64;
var HIGHER_GREEN = 200;
var LOWER_BLUE = 200;
var HIGHER_BLUE = 255;

var distance = 75;

var points = generatePoints(NUM_POINTS_X, NUM_POINTS_Y);
drawNetwork(points);

function drawNetwork(points)
{
    for (var i = 0; i < points.length; i++)
    {
        for (var j = 0; j < points[i].length; j++)
        {
            ctx.beginPath();
            if (j < points[i].length - 1 && i < points.length - 1)
            {
                color = generateColor(LOWER_RED, HIGHER_RED, LOWER_GREEN, HIGHER_GREEN, LOWER_BLUE, HIGHER_BLUE);
                console.log(color);
                drawTriangle(points[i][j][0], points[i][j][1], points[i+1][j+1][0], points[i+1][j+1][1], points[i][j+1][0], points[i][j+1][1], color);
                color = generateColor(LOWER_RED, HIGHER_RED, LOWER_GREEN, HIGHER_GREEN, LOWER_BLUE, HIGHER_BLUE);
                console.log(color);
                drawTriangle(points[i][j][0], points[i][j][1], points[i+1][j+1][0], points[i+1][j+1][1], points[i+1][j][0], points[i+1][j][1], color);
            }
            ctx.stroke();
        }
    }
}

function generateColor(lowerRed, higherRed, lowerGreen, higherGreen, lowerBlue, higherBlue)
{
    var rStr = (Math.floor(Math.random() * (higherRed - lowerRed)) + lowerRed).toString(16);
    var gStr = (Math.floor(Math.random() * (higherGreen - lowerGreen)) + lowerGreen).toString(16);
    var bStr = (Math.floor(Math.random() * (higherBlue - lowerBlue)) + lowerBlue).toString(16);
    if (rStr.length == 1)
    {
        rStr = "0" + rStr;
    }
    if (gStr.length == 1)
    {
        gStr = "0" + gStr;
    }
    if (bStr.length == 1)
    {
        bStr = "0" + bStr;
    }
    var color = "#" + rStr + gStr + bStr;
    return color;
}

function generatePoints(xNum, yNum)
{
    var points = [];
    for (var i = -1; i <= xNum; i++)
    {
        points.push([]);
        for (var j = -1; j <= yNum; j++)
        {
            points[i + 1].push([]);
            points[i + 1][j + 1].push(Math.floor(Math.random() * (canvas.width / xNum)) + (i * (canvas.width / xNum)));
            points[i + 1][j + 1].push(Math.floor(Math.random() * (canvas.height / yNum)) + (j * (canvas.width / yNum)));
            //points[i][j].push(Math.floor(0.5 * (canvas.width / xNum)) + (i * (canvas.width / xNum)));
            //points[i][j].push(Math.floor(0.5 * (canvas.height / yNum)) + (j * (canvas.width / yNum)));
        }
    }
    return points;
}

function drawTriangle(x1, y1, x2, y2, x3, y3, color)
{
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x1, y1);
    ctx.fill();
}