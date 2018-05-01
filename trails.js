var canvas = document.getElementById('trails');
canvas.width = 800;
canvas.height = 400;
var ctx = canvas.getContext('2d');

var radius = 70;
var centerX = canvas.width / 2;
var centerY = canvas.height / 2;
var divisions = 13;
var divisionHeight = radius*2 / divisions;
var trailLines = [];

var bgColor = '#000F6D';
var shapeColor = '#00FF6D';
var shadowColor = '#0AE864';

function drawCircle(x, y, r, color) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
}

function setup(){
    for(var i = 0; i < divisions; i++){
        var divisionY = centerY - radius + divisionHeight*i + divisionHeight/2;
        var distToCurve = Math.sqrt((radius * radius) - (centerY - divisionY) * (centerY - divisionY));
        var baseLength = distToCurve + radius;
        trailLines.push({
            'y' : divisionY,
            'baseLength' : baseLength + baseLength * Math.random(),
            'shadowLength' : Math.random() * radius/6 + radius / 4
        });
    }
    for(var j = 0; j < divisions; j++){
        var line = trailLines[j];
        if(j%2){
            if(line.baseLength > trailLines[j-1].baseLength){
                line.baseLength = trailLines[j-1].baseLength / 2;
            }
            if(j != divisions - 1){
                if(line.baseLength > trailLines[j+1].baseLength){
                    line.baseLength = trailLines[j+1].baseLength / 2;
                }
            }
        }
    }
}
setup();

function draw(){
    ctx.fillStyle = bgColor;
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();
    drawCircle(centerX, centerY, radius, shapeColor);

    for(var i = 0; i < divisions; i++){
        // var velocity = 5;
        var line = trailLines[i];
        ctx.beginPath();
        ctx.strokeStyle = shapeColor;
        ctx.lineWidth = divisionHeight + 1;
        ctx.lineCap = "round";
        lineLength = line.baseLength;
        ctx.moveTo(centerX, line.y);
        ctx.lineTo(centerX + lineLength, line.y);
        ctx.stroke();
        if(i%2){
            ctx.beginPath();
            ctx.strokeStyle = shadowColor;
            lineLength = line.baseLength;
            ctx.moveTo(centerX + lineLength, line.y);
            ctx.lineTo(centerX + lineLength - line.shadowLength, line.y);
            ctx.stroke();
            drawCircle(centerX + lineLength + 3, line.y, divisionHeight/2 - .5, bgColor)
        }
    }
}
draw();