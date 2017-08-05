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
drop.addEventListener('mouseenter', function(e){
    showTooltip(e.target);
});
drop.addEventListener('mouseleave', function(e){
    hideTooltip();
});

//direction picker
arrow.setAttribute('direction', 0);
arrow.addEventListener('click', function(e){
    var currentDirection = parseInt(arrow.getAttribute('direction'));
    var nextDirection = currentDirection + directionIncrements;
    arrow.setAttribute('direction', nextDirection);
    arrow.style.transform = "rotate("+nextDirection+"deg)";
});
arrow.addEventListener('mouseenter', function(e){
    showTooltip(e.target);
});
arrow.addEventListener('mouseleave', function(e){
    hideTooltip();
});

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
shape.addEventListener('mouseenter', function(e){
    showTooltip(e.target);
});
shape.addEventListener('mouseleave', function(e){
    hideTooltip();
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
                clearTimeout(interval);
            }
        }, 150);
    }
}

//music selector
var drum = document.querySelector('.drum');
var marker = document.querySelector('.drum-marker');
var nextSample = 0;
drum.addEventListener('click', function(e){
    nextSample++;
    var currentX = nextSample % 3;
    var currentY = Math.floor(nextSample/3) % 3;
    marker.setAttribute('x', currentX * 14.5 + 4);
    marker.setAttribute('y', currentY * 14.5 + 3.5);
});
drum.addEventListener('mouseenter', function(e){
    showTooltip(e.target);
});
drum.addEventListener('mouseleave', function(e){
    hideTooltip();
});

//tootltip
var tooltip = document.querySelector('.tooltip');
var tooltipBody = document.querySelector('.tooltip-body');
var tooltipTail = document.querySelector('.tail');
function showTooltip(target){
    //xpos = middle of target - half width of tooltip
    //      = bounds.left + ((bounds.right - bounds.left) / 2) - half width of tooltip
    var tipBounds = tooltip.getBoundingClientRect();
    var bounds = target.getBoundingClientRect();
    xpos = bounds.left + (bounds.width / 2) - (tipBounds.width / 2);
    ypos = bounds.top - 80;
    tooltip.style.left = xpos+"px";
    tooltip.style.top = ypos+"px";
    tooltipBody.style.height = "20px";
    tooltipBody.style.padding = "16px 30px";
    window.setTimeout(function(){
        tooltipTail.style.display = "block";
        window.setTimeout(function(){
            tooltipTail.style.bottom = "9px";
        }, 100);
    }, 200);
}
function hideTooltip(){
    tooltipTail.style.bottom = "19px";
    window.setTimeout(function(){
        tooltipTail.style.display = "none";
        window.setTimeout(function(){
            tooltipBody.style.height = "0";
            tooltipBody.style.padding = "0 30px";
        }, 50);
    }, 100);
}
