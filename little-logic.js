var ruleEditor = document.querySelector('rule-editor');

//set default rule
var rule = {
    'ruleId': 0,
    'dropcolor': 0,
    'points': 3,
    'direction': 0,
    'sample': 0
}
ruleEditor.setAttribute('rule', JSON.stringify(rule));

document.querySelector('#rule1').addEventListener('click', function(e) {
    ruleEditor.setAttribute('rule', JSON.stringify(
        {
        'ruleId': 1,
        'dropcolor': 4,
        'points': 3,
        'direction': 180,
        'sample': 8
    }));
});

document.querySelector('#rule2').addEventListener('click', function(e) {
    ruleEditor.setAttribute('rule', JSON.stringify(
        {
        'ruleId': 2,
        'dropcolor': 5,
        'points': 5,
        'direction': 225,
        'sample': 4
    }));
});

ruleEditor.addEventListener('ruleChange', function(e){
    console.log(e.detail.value);
});
