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
//    console.log(nextDirection%360);
    arrow.style.transform = "rotate("+nextDirection+"deg)";
})

//shape selector
//add tweening svg shape for square / circle / triangle / pentagon / start
