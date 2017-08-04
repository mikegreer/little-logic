var drop = document.querySelector('.drop');
var dropColors = ['#e74c3c','#3498db', '#2ecc71', '#e67e22', '#f1c40f', '#8e44ad', '#2c3e50'];
var arrow = document.querySelector('.direction-arrow');
var directionIncrements = 90;

//color drop
drop.setAttribute('dcolor', 1);
drop.addEventListener('click', function(e){
    var currentDrop = parseInt(drop.getAttribute('dcolor'))
    var nextDrop = currentDrop + 1;
    if(nextDrop >= dropColors.length){
        nextDrop = 0;
    }
    drop.setAttribute('dcolor', nextDrop);
    drop.style.fill = dropColors[nextDrop];
});

//direction picker
//add arrow that turns to point in compass direction
arrow.setAttribute('direction', 0);
arrow.addEventListener('click', function(e){
    var currentDirection = parseInt(arrow.getAttribute('direction'));
    var nextDirection = currentDirection + directionIncrements;
    arrow.setAttribute('direction', nextDirection);
    arrow.style.transform = "rotate("+nextDirection+"deg)";
})

//shape selector
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};
var pointLimit = 6;
function generatePath(pointsCount) {
    var path = "";
    var rotationOffset = 45;
    var angleUnit = Math.radians(360/pointsCount);
    for(var i = 1; i <= pointLimit; i++){
        if(i < pointsCount){
            var pointAngle = angleUnit * i + rotationOffset;
        }else{
            var pointAngle = angleUnit * pointsCount + rotationOffset;
        }
        var px = Math.cos(pointAngle) * 50 + 50;
        var py = Math.sin(pointAngle) * 50 + 50;
        if(path === ""){
            path = "M" + px + " " + py + " ";
        }
        path += "L " + px + " " + py + " ";
    }
    path += "Z";
    return path;
}

var shape = document.createElementNS("http://www.w3.org/2000/svg", "path");
var interval;
var container = document.querySelector('.shape-select');

shape.setAttribute('points', 3);
shape.setAttribute('d', generatePath(3));
container.appendChild(shape);
shape.className = "shape";

shape.addEventListener('click', function(e){
    var currentPoints = parseInt(shape.getAttribute('points'));
    var nextPoints = currentPoints + 1;
    if(nextPoints > pointLimit){
        nextPoints = 3;
    }
    shape.setAttribute('points', nextPoints);
    tweenPoints(shape, currentPoints, nextPoints);
});

function tweenPoints(shape, from, to){
    shape.style.transition = "all 300ms ease-in"
    if(from === to - 1 || from === to + 1){
        shape.setAttribute('d', generatePath(to));
    }
    else{
        shape.style.transition = "all 150ms ease-in"
        interval = setInterval(function () {
            from -= 1;
            if(from >= 3){
                shape.setAttribute('d', generatePath(from));
            }else{
                interval = null;
                console.log(interval);
            }
        }, 150);
    }
}
