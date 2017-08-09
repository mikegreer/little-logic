console.log('level1');
var nodeReadyColor = '#ffff00';
var ruleColors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
var ruleShapes = ['circle','square','triangle','pentagon'];
var ruleDirections = ['N','NE','E','SE', 'S', 'SW', 'W', 'NW'];

var emitterList = [{
    'id': 0,
    'x': 100,
    'y': 100,
    'emissionCount': 0,
    'emissionLimit': 10,
    'emissionsPerSecond': 1,
    'lastEmission': 0,
    'emitPulse': {
        'shape': 'square',
        'color': 'red'
    },
    'emitDirection':{
        'dx': 2,
        'dy': -0.4
    },
    'emit': function(){
        if(this.emissionCount < this.emissionLimit){
            if(this.emissionCount % 2 === 0){
                pulseList.push({
                    'shape': 'square',
                    'color': 'blue',
                    'x': this.x,
                    'y': this.y,
                    'dx': this.emitDirection.dx,
                    'dy': this.emitDirection.dy,
                    'id': pulseList.length
                });
            }else{
                pulseList.push({
                    'shape': 'circle',
                    'color': 'red',
                    'x': this.x,
                    'y': this.y,
                    'dx': this.emitDirection.dx,
                    'dy': this.emitDirection.dy,
                    'id': pulseList.length
                });
            }
            this.emissionCount ++;
        }
    }
}];

var nodeList = [
    {
        'id': 0,
        'x': 200,
        'y': 50,
        'width': 50,
        'height': 50,
        'color': nodeReadyColor,
        'rules': [
            {
                'ruleId': 0,
                'ifColor': 'red',
                'ifShape': 'circle',
                'setDirection': 'SE'
            },
            {
                'ruleId': 1,
                'ifColor': 'blue',
                'ifShape': 'square',
                'setDirection': 'SW'
            }
        ],
        'currentCollisions': [],
        'isEditing': false
    }
];
