console.log('level1');
var nodeReadyColor = '#ffff00';
var ruleColors = ['red', 'blue'];
var ruleShapes = ['circle','square'];
var ruleDirections = ['N','NE','E','SE', 'S', 'SW', 'W', 'NW'];
var levelSounds = ['pulse-1', 'pulse-2', 'pulse-3', 'pulse-4', 'pulse-5', 'pulse-6', 'pulse-7', 'pulse-8', 'pulse-9', 'pulse-10']

var emitterList = [
    {
        'id': 0,
        'x': 75,
        'y': 75,
        'emissionCount': 0,
        'emissionLimit': 10,
        'emissionsPerSecond': .5,
        'lastEmission': 0,
        'emitDirection':{
            'dx': 2,
            'dy': 0
        },
        'emit': function(){
            pulseList.push({
                'shape': 'square',
                'color': 'blue',
                'x': this.x,
                'y': this.y,
                'dx': 0,
                'dy': 2,
                'id': pulseList.length
            });

            console.log(pulseList);
            this.emissionCount ++;
        }
    },
    {
        'id': 0,
        'x': 75,
        'y': 75,
        'emissionCount': 0,
        'emissionLimit': 10,
        'emissionsPerSecond': .5,
        'lastEmission': 0,
        'emitDirection':{
            'dx': 2,
            'dy': 0
        },
        'emit': function(){
            pulseList.push({
                'shape': 'circle',
                'color': 'red',
                'x': this.x,
                'y': this.y,
                'dx': 2,
                'dy': 2,
                'id': pulseList.length
            });
            this.emissionCount ++;
    }
}];

var gateList = [
    {
        'id': 0,
        'x': 225,
        'y': 75,
        'width': 10,
        'height': 10,
        'color': nodeReadyColor,
        'rules': [
            {
                'ruleId': 1,
                'ifColor': 'blue',
                'ifShape': 'square',
                'setDirection': 'S',
                'playSound': 'pulse-2'
            }
        ],
        'currentCollisions': [],
        'isEditing': false
    },
    {
        'id': 0,
        'x': 225,
        'y': 225,
        'width': 10,
        'height': 10,
        'color': nodeReadyColor,
        'rules': [
            {
                'ruleId': 1,
                'ifColor': 'blue',
                'ifShape': 'square',
                'setDirection': 'S',
                'playSound': 'pulse-2'
            }
        ],
        'currentCollisions': [],
        'isEditing': false
    },
    {
        'id': 0,
        'x': 275,
        'y': 75,
        'width': 10,
        'height': 10,
        'color': nodeReadyColor,
        'rules': [
            {
                'ruleId': 1,
                'ifColor': 'blue',
                'ifShape': 'square',
                'setDirection': 'W',
                'playSound': 'pulse-2'
            }
        ],
        'currentCollisions': [],
        'isEditing': false
    },
    {
        'id': 0,
        'x': 75,
        'y': 275,
        'width': 10,
        'height': 10,
        'color': nodeReadyColor,
        'rules': [
            {
                'ruleId': 1,
                'ifColor': 'blue',
                'ifShape': 'square',
                'setDirection': 'NE',
                'playSound': 'pulse-5'
            }
        ],
        'currentCollisions': [],
        'isEditing': false
    },
    {
        'id': 0,
        'x': 225,
        'y': 325,
        'width': 10,
        'height': 10,
        'color': nodeReadyColor,
        'rules': [
            {
                'ruleId': 1,
                'ifColor': 'blue',
                'ifShape': 'square',
                'setDirection': 'NE',
                'playSound': 'pulse-8'
            }
        ],
        'currentCollisions': [],
        'isEditing': false
    },
    {
        'id': 0,
        'x': 425,
        'y': 125,
        'width': 10,
        'height': 10,
        'color': nodeReadyColor,
        'rules': [
            {
                'ruleId': 1,
                'ifColor': 'blue',
                'ifShape': 'square',
                'setDirection': 'S',
                'playSound': 'pulse-7'
            },
            {
                'ruleId': 1,
                'ifColor': 'red',
                'ifShape': 'circle',
                'setDirection': 'SW',
                'playSound': 'pulse-8'
            }
        ],
        'currentCollisions': [],
        'isEditing': false
    },
    {
        'id': 0,
        'x': 425,
        'y': 325,
        'width': 10,
        'height': 10,
        'color': nodeReadyColor,
        'rules': [
            {
                'ruleId': 1,
                'ifColor': 'blue',
                'ifShape': 'square',
                'setDirection': 'SW',
                'playSound': 'pulse-2'
            },
            {
                'ruleId': 1,
                'ifColor': 'red',
                'ifShape': 'circle',
                'setDirection': 'SW',
                'playSound': 'pulse-3'
            }
        ],
        'currentCollisions': [],
        'isEditing': false
    },
    {
        'id': 0,
        'x': 325,
        'y': 425,
        'width': 10,
        'height': 10,
        'color': nodeReadyColor,
        'rules': [
            {
                'ruleId': 1,
                'ifColor': 'blue',
                'ifShape': 'square',
                'setDirection': 'W',
                'playSound': 'pulse-10'
            },
            {
                'ruleId': 1,
                'ifColor': 'red',
                'ifShape': 'circle',
                'setDirection': 'W',
                'playSound': 'pulse-3'
            }
        ],
        'currentCollisions': [],
        'isEditing': false
    }
];
