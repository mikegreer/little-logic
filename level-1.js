//TODO: separate emitter logic from functionality - emit logic in object, emit command in script js
var ruleColors = ['red', 'blue'];
var ruleShapes = ['circle','square'];
var ruleDirections = ['N','NE','E','SE', 'S', 'SW', 'W', 'NW'];
//var ruleSounds = ['bass', 'snare', 'tom', 'cymbal', 'hat-c-1'];
var ruleSounds = ['hat-c-1', 'hat-c-2', 'hat-c-3', 'hat-c-4', 'hat-c-5', 'hat-c-6', 'cymbal']
var newRules = false;

var emitterList = [{
    'id': 0,
    'x': 75,
    'y': 225,
    'emissionCount': 0,
    'emissionsPerSecond': 1,
    'lastEmission': 0,
    'emitPulse': {
        'shape': 'square',
        'color': 'red'
    },
    'emitDirection':{
        'dx': 2,
        'dy': 0
    },
    'emit': function(){
        var shouldEmit = true;
        if(this.hasOwnProperty("emissionLimit")){
            if(this.emissionCount >= this.emissionLimit){
                shouldEmit = false;
            }
        }
        if(shouldEmit){
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

var gateList = [
    {
        'id': 0,
        'x': 325,
        'y': 225,
        'width': 15,
        'height': 15,
        'rules': [
            {
                'ruleId': 0,
                'ifColor': 'red',
                'ifShape': 'circle',
                'setDirection': 'SE',
                'playSound': 'hat-c-1'
            },
            {
                'ruleId': 1,
                'ifColor': 'blue',
                'ifShape': 'square',
                'setDirection': 'SW',
                'playSound': 'hat-c-1'
            }
        ],
        'currentCollisions': [],
        'isEditing': false
    },
    {
        'id': 0,
        'x': 125,
        'y': 425,
        'width': 15,
        'height': 15,
        'rules': [
            {
                'ruleId': 0,
                'ifColor': 'blue',
                'ifShape': 'square',
                'setDirection': 'N',
                'turnBy': 45,
                'playSound': 'hat-c-1'
            }
        ],
        'currentCollisions': [],
        'isEditing': false
    },
    {
        'id': 0,
        'x': 125,
        'y': 25,
        'width': 15,
        'height': 15,
        'rules': [
            {
                'ruleId': 0,
                'ifColor': 'blue',
                'ifShape': 'square',
                'setDirection': 'SE',
                'turnBy': 45,
                'playSound': 'hat-c-1'
            }
        ],
        'currentCollisions': [],
        'isEditing': false
    }
];

var goalList = [
    {
        'id': 0,
        'x': 425,
        'y': 225,
        'acceptanceCriteria': [
            {
                'ifColor': 'blue',
                'ifShape': 'square',
                'playSound': 'cymbal'
            }
        ]
    }
];
