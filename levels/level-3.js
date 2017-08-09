//TODO: separate emitter logic from functionality - emit logic in object, emit command in script js
var ruleColors = ['red', 'blue'];
var ruleShapes = ['circle','square'];
var ruleDirections = ['N','NE','E','SE', 'S', 'SW', 'W', 'NW'];
var newRules = false;

var emitterList = [{
    'id': 0,
    'x': 225,
    'y': 225,
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
        'dy': 1
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
                    'id': pulseId
                });
            }else{
                pulseList.push({
                    'shape': 'circle',
                    'color': 'red',
                    'x': this.x,
                    'y': this.y,
                    'dx': this.emitDirection.dx,
                    'dy': this.emitDirection.dy,
                    'id': pulseId
                });
            }
            pulseId ++;
            this.emissionCount ++;
        }
    }
}];

var nodeList = [
    {
        'id': 0,
        'x': 375,
        'y': 75,
        'width': 15,
        'height': 15,
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
    },
    {
        'id': 0,
        'x': 175,
        'y': 475,
        'width': 15,
        'height': 15,
        'rules': [
            {
                'ruleId': 0,
                'ifColor': 'red',
                'ifShape': 'circle',
                'setDirection': 'W'
            }
        ],
        'currentCollisions': [],
        'isEditing': false
    }
];

var goalList = [
    {
        'id': 0,
        'x': 375,
        'y': 275,
        'acceptanceCriteria': [
            {
                'ifColor': 'red',
                'ifShape': 'circle'
            }
        ]
    },
    {
        'id': 0,
        'x': 75,
        'y': 75,
        'acceptanceCriteria': [
            {
                'ifColor': 'blue',
                'ifShape': 'square'
            }
        ]
    }
];
