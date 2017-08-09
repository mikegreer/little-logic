var ruleEditor = document.querySelector('rule-editor');
var rule = {
    'ruleId': 1,
    'ifColorIndex': 1,
    'points': 6,
    'direction': 90,
    'sample': 8
}
ruleEditor.setAttribute('rule', JSON.stringify(rule));

//window.addEventListener('WebComponentsReady', function() {
    //pass level params (lists of available options)

    //control opening of rule editor based on particular rule and level options
//});
