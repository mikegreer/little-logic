var ruleEditor = document.querySelector('rule-editor');

//set default rule
var rules = [
    {
        'ruleId': 0,
        'dropcolor': 0,
        'points': 3,
        'direction': 0,
        'sample': 0
    },
    {
        'ruleId': 1,
        'dropcolor': 4,
        'points': 3,
        'direction': 180,
        'sample': 8
    },
    {
        'ruleId': 2,
        'dropcolor': 5,
        'points': 5,
        'direction': 225,
        'sample': 4
    }
];

currentRule = 0;
function setRule(ruleID){
    currentRule = ruleID;
    ruleEditor.setAttribute('rule', JSON.stringify(rules[ruleID]));
}
setRule(0);

document.querySelector('#rule1').addEventListener('click', function(e) {
    setRule(1);
});

document.querySelector('#rule2').addEventListener('click', function(e) {
    setRule(2);
});

ruleEditor.addEventListener('ruleChange', function(e){
    console.log(currentRule, e.detail.ruleId);
    if(e.detail.ruleId === currentRule){
        console.log('replace');
        rules[currentRule] = e.detail;
    }
});
