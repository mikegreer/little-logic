
window.addEventListener('WebComponentsReady', function() {
    //pass level params (lists of available options)
    //bind elements to rule model
    let drop = document.querySelector('drop-picker');
    // drop.addEventListener('mouseenter', function(e){
    //     showTooltip(e.target);
    // });
    // drop.addEventListener('mouseleave', function(e){
    //     hideTooltip();
    // });
    var rule = {
        'ruleId': 1,
        'ifColor': 'blue',
        'ifShape': 'square',
        'setDirection': 'SW',
        'playSound': 'pulse-2'
    }
});

//tooltip
//make tooltip into its own component
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
