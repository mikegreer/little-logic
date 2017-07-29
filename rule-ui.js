var rulesWindow = document.getElementById('rules');
var gateRulesWindow = document.getElementById('gate-rules');
var newRuleButton;
var currentGate;
var rulesOpen = false;
var pauseStart;
var pauseOffset = 0;

(function setupRuleUI(){
    gateRulesWindow.style.display = 'none';
    closeRulesBtn = document.querySelector('.close-btn');
    closeRulesBtn.addEventListener("click", function(event){
        closeRules();
    })
    newRuleButton = document.querySelector('.newrule');
    if(newRules){
        newRuleButton.addEventListener("click", function(event){
            console.log(currentgate.rules);
            currentGate.rules.push({});
            console.log(currentGate.rules);
        });
    }else{
        newRuleButton.style.display = "none";
    }
})();

function calculateRuleIndex(ruleList, textContent){
    var index = 0;
    for(var i = 0; i < ruleList.length; i++){
        if(textContent === ruleList[i]){
            index = i;
        }
    }
    var newIndex = 0;
    if(index < ruleList.length - 1){
        newIndex = index + 1;
    }
    return newIndex;
}
function editRule(ruleType, rule, target){
    if(ruleType === "color"){
        var newIndex = calculateRuleIndex(ruleColors, target.textContent);
        rule.ifColor = ruleColors[newIndex];
        target.textContent = ruleColors[newIndex];
    }
    if(ruleType === "shape"){
        var newIndex = calculateRuleIndex(ruleShapes, target.textContent);
        rule.ifShape = ruleShapes[newIndex];
        target.textContent = ruleShapes[newIndex];
    }
    if(ruleType === "direction"){
        var newIndex = calculateRuleIndex(ruleDirections, target.textContent);
        rule.setDirection = ruleDirections[newIndex];
        target.textContent = ruleDirections[newIndex];
    }
    if(ruleType === "sound"){
        var newIndex = calculateRuleIndex(ruleSounds, target.textContent);
        rule.playSound = ruleSounds[newIndex];
        target.textContent = ruleSounds[newIndex];
    }
}

function openRules(gate){
    running = false;
    pauseStart = window.performance.now();
    currentGate = gate;
    var container = document.querySelector("#rule-container");
    container.innerHTML = "";
    gate.rules.forEach(function(rule, i){
        var ruleContainer = document.createElement('div');
        ruleContainer.className = "ruleContainer";
        //conditions
        var textIf = document.createElement('span');
        textIf.textContent = "if ";
        ruleContainer.appendChild(textIf);
        if(rule.hasOwnProperty("ifColor")){
            var color = document.createElement('span');
            color.textContent = rule.ifColor;
            color.className = "color";
            color.addEventListener('click', function(event){
                editRule("color", rule, event.target);
            });
            ruleContainer.appendChild(color);
        }
        if(rule.hasOwnProperty("ifShape")){
            if(rule.hasOwnProperty("ifColor")){
                var andText = document.createElement('span');
                andText.textContent = " and ";
                ruleContainer.appendChild(andText);
            }
            var shape = document.createElement('span');
            shape.textContent = rule.ifShape;
            shape.className = "shape";
            shape.addEventListener('click', function(event){
                editRule("shape", rule, event.target);
            });
            ruleContainer.appendChild(shape);
        }
        var bracketsOpen = document.createElement('span');
        bracketsOpen.textContent = " {";
        ruleContainer.appendChild(bracketsOpen);
        ruleContainer.appendChild(document.createElement('br'));
        //rules to apply
        if(rule.hasOwnProperty("setDirection")){
            var directionContainer = document.createElement('span');
            directionContainer.className = "directionContainer";
            directionContainer.textContent = "set direction to ";
            var direction = document.createElement('span');
            direction.textContent = rule.setDirection;
            direction.className = "direction";
            direction.addEventListener('click', function(event){
                editRule("direction", rule, event.target);
            });
            directionContainer.appendChild(direction);
            ruleContainer.appendChild(directionContainer);
        }
        ruleContainer.appendChild(document.createElement('br'));
        if(rule.hasOwnProperty("playSound")){
            var soundContainer = document.createElement('span');
            soundContainer.className = "soundContainer";
            soundContainer.textContent = "play sound ";
            var sound = document.createElement('span');
            sound.textContent = rule.playSound;
            sound.className = "sound";
            sound.addEventListener('click', function(event){
                editRule("sound", rule, event.target);
            });
            soundContainer.appendChild(sound);
            ruleContainer.appendChild(soundContainer);
        }
        var bracketsClose = document.createElement('span');
        ruleContainer.appendChild(document.createElement('br'));
        bracketsClose.textContent += "}";
        ruleContainer.appendChild(bracketsClose);

        container.appendChild(ruleContainer);
    });
    gate.isEditing = true;
    gateRulesWindow.style.display = 'block';
    rulesOpen = true;
}
function closeRules(){
    pauseOffset = window.performance.now() - pauseStart;
    running = true;
    requestAnimationFrame(tick);
    currentGate = null;
    gateRulesWindow.style.display = 'none';
    rulesOpen = false;
    for(var i = 0; i < gateList.length; i++){
        gateList[i].isEditing = false;
    }
}
