var c = document.getElementById('logic');
var ctx = c.getContext('2d');
var cLeft = c.offsetLeft;
var cTop = c.offsetTop;
var pulseList = [];
var running = true;
var pulseId = 0;

//settings & style
var backgroundColor = '#2c3e50';
var gateReadyColor = '#f1c40f';
var gateActiveColor = '#f39c12';
var emitterColor = '#9b59b6';
var emitterSize = 30;
var pulseSize = 20;
var gridSize = 50;
var canvasWidth = 500;
var canvasHeight = 500;
var boundsCollision = false;

//audio
var audioCtx = new AudioContext();
var gameSounds = [
    {
        'name': 'bass',
        'url': './assets/bass-7.wav'
    },
    {
        'name': 'snare',
        'url': './assets/snare-40.wav'
    },
    {
        'name': 'tom',
        'url': './assets/tom-11.wav'
    },
    {
        'name': 'cymbal',
        'url': './assets/cymbal-4.wav'
    },
    {
        'name': 'hat-c-1',
        'url': './assets/HatClosedAttack1.wav'
    },
    {
        'name': 'hat-c-2',
        'url': './assets/HatClosedAttack2.wav'
    },
    {
        'name': 'hat-c-3',
        'url': './assets/HatClosedAttack3.wav'
    },
    {
        'name': 'hat-c-4',
        'url': './assets/HatClosedAttack4.wav'
    },
    {
        'name': 'hat-c-5',
        'url': './assets/HatClosedAttack5.wav'
    },
    {
        'name': 'hat-c-6',
        'url': './assets/HatClosedAttack6.wav'
    }
];
function soundToBuffer(soundFile, index){
    var request = new XMLHttpRequest();
    request.open('GET', soundFile, true);
    request.responseType = 'arraybuffer';
    //gameSounds[index].buffer = null;
    request.onload = function() {
        audioCtx.decodeAudioData(request.response, function(buffer) {
            gameSounds[index].buffer = buffer;
        }, function(error) {
            console.error(error);
        });
    }
    request.send();
}
for(var i = 0; i < gameSounds.length; i++){
    soundToBuffer(gameSounds[i].url, i);
}
function playSample(sampleName){
    for(var i = 0; i < gameSounds.length; i++){
        if(gameSounds[i].name === sampleName){
            playSound(gameSounds[i].buffer);
        }
    }
}
function playSound(buffer) {
    var source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.connect(audioCtx.destination);
    source.start(0);
}

function drawShape(shapeString, x, y, w, h, color){
    ctx.beginPath();
    ctx.fillStyle = color;
    if(color === 'red'){
        ctx.fillStyle = '#c0392b';
    }
    if(color === 'blue'){
        ctx.fillStyle = '#2980b9';
    }
    if(shapeString === 'square'){
        ctx.rect(x - w/2, y - h/2, w, h);
    }
    if(shapeString === 'circle'){
        r = w/2;
        ctx.ellipse(x, y, r, r, 45 * Math.PI/180, 0, 2 * Math.PI);
    }
    ctx.fill();
}
function drawGate(gate){
    ctx.beginPath();
    if(gate.color){
        ctx.fillStyle = gate.color;
    }else{
        ctx.fillStyle = gateReadyColor;
    }
    ctx.rect(gate.x - gate.width / 2, gate.y - gate.height / 2, gate.width, gate.height);
    ctx.fill();
    if(gate.isEditing){
        ctx.strokeStyle = "#ff0000";
        ctx.stroke();
    }
}
function drawGrid(){
    ctx.strokeStyle = "#1abc9c";
    ctx.beginPath();
    for (var x = 0; x < canvasWidth; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasWidth);
    }
    for (var y = 0; y < canvasHeight; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvasWidth, y);
    }
    ctx.moveTo(canvasWidth, 0);
    ctx.lineTo(canvasWidth, canvasHeight);
    ctx.moveTo(0, canvasHeight);
    ctx.lineTo(canvasWidth, canvasHeight);
    ctx.stroke();
}
function applyRules(pulse, rules){
    for(var i = 0; i < rules.length; i++){
        rule = rules[i];
        var match = true;
        //determine whether gate is a match
        if(rule.hasOwnProperty("ifColor")){
            if(pulse.color != rule.ifColor){
                match = false;
            }
        }
        if(rule.hasOwnProperty("ifShape")){
            if(pulse.shape != rule.ifShape){
                match = false;
            }
        }
        //if match, apply rules
        if(match){
            var speed = 2;
            if(rule.hasOwnProperty("playSound")){
                playSample(rule.playSound);
            }
            if(rule.hasOwnProperty("setDirection")){
                if(rule.setDirection === 'N'){
                    pulse.dx = 0;
                    pulse.dy = -speed;
                }else if(rule.setDirection === 'NE'){
                    pulse.dx = speed;
                    pulse.dy = -speed;
                }else if(rule.setDirection === 'E'){
                    pulse.dx = speed;
                    pulse.dy = 0;
                }else if(rule.setDirection === 'SE'){
                    pulse.dx = speed;
                    pulse.dy = speed;
                }else if(rule.setDirection === 'S'){
                    pulse.dx = 0;
                    pulse.dy = speed;
                }else if(rule.setDirection === 'SW'){
                    pulse.dx = -speed;
                    pulse.dy = speed;
                }else if(rule.setDirection === 'W'){
                    pulse.dx = -speed;
                    pulse.dy = 0;
                }else if(rule.setDirection === 'NW'){
                    pulse.dx = -speed;
                    pulse.dy = -speed;
                }
            }
            if(rule.hasOwnProperty("turnBy")){
                //eg 45 degrees =
                //TODO
            }
        }
    }
}
function setGateActive(gate){
    gate.color = gateActiveColor;
    gate.width = 25;
    gate.height = 25;
}
function setGateReady(gate){
    gate.color = gateReadyColor;
    gate.width = 15;
    gate.height = 15;
}
function checkCollision(collider, pulse){
    var alreadyInArray = false;
    var tolerance = 10;
    var hitX = collider.x - (tolerance / 2);
    var hitY = collider.y - (tolerance / 2);
    var hitW = tolerance;
    var hitH = tolerance;
    //draw hit box
    // ctx.beginPath();
    // ctx.fillStyle = '#ff00ff';
    // ctx.rect(hitX, hitY, hitW, hitH);
    // ctx.fill();
    if(pulse.x > hitX
    && pulse.x < hitX + hitW
    && pulse.y > hitY
    && pulse.y < hitY + hitH){
        //colliding, check to see if already in collision array
        for(var j = 0; j < collider.currentCollisions.length; j++){
            if(collider.currentCollisions[j] === pulse.id){
                alreadyInArray = true;
            }
        }
        if(!alreadyInArray){
            collider.currentCollisions.push(pulse.id);
            setGateActive(collider);
            return true;
        }
    }else{
        //not colliding: check to see if still in collision array
        for(var j = 0; j < collider.currentCollisions.length; j++){
            var collisionPulse = collider.currentCollisions[j];
            if(collisionPulse === pulse.id){
                collider.currentCollisions.splice(j, 1);
                if(collider.currentCollisions.length == 0){
                    setGateReady(collider);
                }
            }
        }
    }
}
// function checkLevelStatus(){
//
// }
function updatePulse(pulse){
    //check for collision with bounds
    if(boundsCollision){
        if(pulse.x > c.width || pulse.x < 0){
            pulse.dx *= -1;
        }
        if(pulse.y > c.height || pulse.y < 0){
            pulse.dy *= -1;
        }
    }else{
        if(pulse.x + pulseSize > c.width || pulse.x - pulseSize < 0
        || pulse.y + pulseSize > c.height || pulse.y - pulseSize < 0){
            for(var i = 0; i < pulseList.length; i++){
                if(pulseList[i].id === [pulse.id]){
                    pulseList.splice(i, 1);
                }
            }
        }
    }
    //check for collision with gate
    for(var i = 0; i < gateList.length; i++){
        var gate = gateList[i];
        if(checkCollision(gate, pulse)){
            pulse.x = gate.x;
            pulse.y = gate.y;
            applyRules(pulse, gate.rules);
        }
    }
    //check for collision with goal
    for(var j = 0; j < goalList.length; j++){
        var goal = goalList[j];
        if(checkCollision(goal, pulse)){
            //check goal conditions met
            for(var k = 0; k < goal.acceptanceCriteria.length; k++){
                var acceptance = goal.acceptanceCriteria[k];
                if(
                    pulse.shape === acceptance.ifShape
                    && pulse.color === acceptance.ifColor
                ){
                    //TODO: goal animation
                    pulse.dx = 0;
                    pulse.dy = 0;
                    pulse.x = goal.x;
                    pulse.y = goal.y;
                    if(acceptance.hasOwnProperty('playSound')){
                        console.log('play');
                        playSample(acceptance.playSound);
                    }
                    //TODO: check to see if all pulses have been released from emitters, and are in goals:
                    //checkLevelStatus();
                }
            }
        }
    }
    pulse.x += pulse.dx;
    pulse.y += pulse.dy;
}
function toggleEmitterState(emitter){
    emitter.play = !emitter.play
    if(emitter.emissionCount >= emitter.emissionLimit){
        emitter.emissionCount = 0;
        emitter.play = true;
    }
}

c.addEventListener('click', function(event) {
    var rect = c.getBoundingClientRect();
    var x = event.clientX - rect.left,
        y = event.clientY - rect.top
    if(rulesOpen){
        closeRules();
    }
    for(var i = 0; i < gateList.length; i++){
        var gate = gateList[i];
        if(x > gate.x - (gate.width / 2)
        && x < gate.x + (gate.width / 2)
        && y > gate.y - (gate.height / 2)
        && y < gate.y + (gate.height / 2)){
            openRules(gate);
        }
    }
    for(var j = 0; j < emitterList.length; j++){
        var emitter = emitterList[j];
        if(x > emitter.x - (emitterSize / 2)
        && x < emitter.x + (emitterSize / 2)
        && y > emitter.y - (emitterSize / 2)
        && y < emitter.y + (emitterSize / 2)){
            toggleEmitterState(emitter);
        }
    }
}, false);
function tick(timeStamp){
    //emitters emit
    for(var i = 0; i < emitterList.length; i++){
        var emitter = emitterList[i];
        if(emitter.play){
            if (timeStamp >= emitter.lastEmission + (1000 / emitter.emissionsPerSecond) + pauseOffset)  {
                pauseOffset = 0;
                emitter.emit();
                emitter.lastEmission = timeStamp;
            }
        }
    }
    //draw
    ctx.beginPath();
    ctx.fillStyle = backgroundColor;
    ctx.rect(0, 0, 500, 500);
    ctx.fill();
    drawGrid();
    //draw emitters
    for(var i = 0; i < emitterList.length; i++){
        var emitter = emitterList[i];
        drawShape('circle', emitter.x, emitter.y, emitterSize, emitterSize, emitterColor);
    }
    //draw pulses
    for(var i = 0; i < pulseList.length; i++){
        var pulse = pulseList[i];
        drawShape(pulse.shape, pulse.x, pulse.y, pulseSize, pulseSize, pulse.color);
    }
    //draw gates
    for(var i = 0; i < gateList.length; i++){
        var gate = gateList[i];
        drawGate(gate);
    }
    //draw goals
    for(var i = 0; i < goalList.length; i++){
        var goal = goalList[i];
        drawShape('circle', goal.x, goal.y, 20, 20, '#ecf0f1');
    }
    //move pulses (after draw to allow collision debugging to show)
    for(var i = 0; i < pulseList.length; i++){
        var pulse = pulseList[i];
        updatePulse(pulse);
    }
    if(running){
        requestAnimationFrame(tick);
    }
};
(function setup(){
    c.width = canvasWidth;
    c.height = canvasHeight;
    ctx.beginPath();
    ctx.fillStyle = backgroundColor;
    ctx.rect(0, 0, 500, 500);
    ctx.fill();
    //set goal defaults
    for(var i = 0; i < goalList.length; i++){
        var goal = goalList[i];
        goal.currentCollisions = [];
        goal.width = 20;
        goal.height = 20;
    }
    for(var i = 0; i < emitterList.length; i++){
        var emitter = emitterList[i];
        emitter.play = true;
    }
    requestAnimationFrame(tick);
})();
