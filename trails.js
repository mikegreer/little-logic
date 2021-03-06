var canvas = document.getElementById('trails');
canvas.width = 800;
canvas.height = 400;
var ctx = canvas.getContext('2d');

var bgColor = '#000F6D';
var shapeColor = '#00FF6D';
var shadowColor = '#0AE864';

function drawCircle(x, y, r, color) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
}

//example shape object
// var shape = {
//     trailLines : [{
//         'y' : divisionY,
//         'baseLength' : baseLength + baseLength * Math.random(),
//         'shadowLength' : Math.random() * radius/6 + radius / 4
//     },{
//         'y' : divisionY,
//         'baseLength' : baseLength + baseLength * Math.random(),
//         'shadowLength' : Math.random() * radius/6 + radius / 4
//     }],
//     x : 200,
//     y : 200,
//     radius : 70,
//     blurSegments : 17,
//     primaryColor : '#00FF6D',
//     secondaryColor : '#0AE864',
//     stretch : 10
// }

var shapes = [];

function createShape(shapeX, shapeY, shapeR, blurSegments, shapeColor, shadowColor, stretch){
    var shape = {
        trailLines : [],
        x : shapeX,
        y : shapeY,
        radius : shapeR,
        blurSegments : blurSegments,
        primaryColor : shapeColor,
        secondaryColor : shadowColor,
        stretch : stretch
    };
    var segmentHeight = shapeR * 2 / blurSegments;
    shape.trailLines = [];
    for(var i = 0; i < blurSegments; i++){
        var divisionY = shapeY - shapeR + segmentHeight*i + segmentHeight/2;
        var distToCurve = Math.sqrt((shapeR * shapeR) - (shapeY - divisionY) * (shapeY - divisionY));
        var baseLength = distToCurve + shapeR;
        shape.trailLines.push({
            'y' : divisionY,
            'baseLength' : baseLength + baseLength * Math.random(),
            'shadowLength' : Math.random() * shapeR/6 + shapeR / 4
        });
    }
    for(var j = 0; j < blurSegments; j++){
        var line = shape.trailLines[j];
        if(j%2){
            if(line.baseLength > shape.trailLines[j-1].baseLength){
                line.baseLength = shape.trailLines[j-1].baseLength / 2;
            }
            if(j != blurSegments - 1){
                if(line.baseLength > shape.trailLines[j+1].baseLength){
                    line.baseLength = shape.trailLines[j+1].baseLength / 2;
                }
            }
        }
    }
    return shape;
}

function draw(){
    //bg
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.fillStyle = bgColor;
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();

    //shapes
    for(var i = 0; i < shapes.length; i++){
        var shape = shapes[i];
        // shape.velocity += 0.0002
        // shape.x -= shape.velocity * 20;
        // shape.velocity *= 1.05;
        // console.log(shape.x);
        drawCircle(shape.x, shape.y, shape.radius, shape.primaryColor);
        for(var j = 0; j < shape.blurSegments; j++){
            // var velocity = 5;
            var divisionHeight = shape.radius * 2 / shape.blurSegments;
            var line = shape.trailLines[j];
            var lineLength = (line.baseLength + shape.stretch) * .8;
            ctx.beginPath();
            ctx.strokeStyle = shape.primaryColor;
            ctx.lineWidth = divisionHeight + 1;
            ctx.lineCap = "round";
            ctx.moveTo(shape.x, line.y);
            ctx.lineTo(shape.x + lineLength, line.y);
            ctx.stroke();
            if(j%2){
                ctx.beginPath();
                ctx.strokeStyle = shape.secondaryColor;
                ctx.moveTo(shape.x + lineLength, line.y);
                ctx.lineTo(shape.x + lineLength - line.shadowLength, line.y);
                ctx.stroke();
                drawCircle(shape.x + lineLength + 3, line.y, divisionHeight/2 - .5, bgColor)
            }
        }
    }
    requestAnimationFrame(draw);
}

shapes.push(createShape(620, 300, 30, 9, '#FFDC00', '#FFBA0A', 20));
shapes.push(createShape(400, 100, 20, 5, '#FFDC00', '#FFBA0A', 5));
shapes.push(createShape(550, canvas.height / 2, 70, 17, '#00FF6D', '#0AE864', 60));
// shapes[0].velocity = .005;
// shapes[1].velocity = .01;
// shapes[2].velocity = .001;
shapes[0].step = 0;
shapes[1].step = 0;
shapes[2].step = 0;
requestAnimationFrame(draw);