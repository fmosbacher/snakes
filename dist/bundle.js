/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dense-layer.ts":
/*!****************************!*\
  !*** ./src/dense-layer.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
var DenseLayer = /** @class */ (function () {
    function DenseLayer(numInputs, numOutputs) {
        this.numInputs = numInputs;
        this.numOutputs = numOutputs;
        this.weights = this.initWeights();
        this.biases = this.initBiases();
    }
    DenseLayer.prototype.initWeights = function () {
        var weights = [];
        for (var i = 0; i < this.numInputs; i++) {
            weights[i] = [];
            for (var j = 0; j < this.numOutputs; j++) {
                weights[i].push(utils_1.randomGaussian());
            }
        }
        return weights;
    };
    DenseLayer.prototype.initBiases = function () {
        var biases = [];
        for (var i = 0; i < this.numOutputs; i++) {
            biases.push(utils_1.randomGaussian());
        }
        return biases;
    };
    DenseLayer.prototype.activate = function (inputs) {
        var result = [];
        for (var i = 0; i < this.numOutputs; i++) {
            result[i] = 0;
            for (var j = 0; j < inputs.length; j++) {
                result[i] += inputs[j] * this.weights[j][i];
            }
            result[i] += this.biases[i];
        }
        return result;
    };
    return DenseLayer;
}());
exports.default = DenseLayer;


/***/ }),

/***/ "./src/evolution.ts":
/*!**************************!*\
  !*** ./src/evolution.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var snake_1 = __webpack_require__(/*! ./snake */ "./src/snake.ts");
var food_1 = __webpack_require__(/*! ./food */ "./src/food.ts");
var utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
var Evolution = /** @class */ (function () {
    function Evolution(game, mutationRate) {
        if (mutationRate === void 0) { mutationRate = 0.05; }
        this.game = game;
        this.mutationRate = mutationRate;
    }
    Evolution.prototype.updateGeneration = function () {
        var populationSize = this.game.pairs.length;
        this.updateSelectionPool();
        this.game.clearPopulation();
        for (var i = 0; i < populationSize; i++) {
            var parents = this.select();
            var a = parents[0], b = parents[1];
            var offspring = this.crossover(a, b);
            this.mutate(offspring);
            this.game.addPair(offspring, new food_1.default(this.game.getRandomPosition()));
        }
        this.game.isOver = false;
    };
    Evolution.prototype.updateSelectionPool = function () {
        var _this = this;
        var maxScores = this.game.pairs
            .map(function (pair) { return pair.snake.score; })
            .reduce(function (a, b) { return a + b; });
        if (maxScores === 0) {
            this.selectionPool = this.game.pairs
                .map(function (pair) {
                var initialPos = _this.game.getRandomPosition();
                return new snake_1.default(initialPos, pair.snake.maxMoves);
            });
            return;
        }
        this.selectionPool = [];
        var snakes = this.game.pairs.map(function (pair) { return pair.snake; });
        for (var _i = 0, snakes_1 = snakes; _i < snakes_1.length; _i++) {
            var snake = snakes_1[_i];
            var participation = Math.floor(snake.score / maxScores * 1000);
            for (var i = 0; i < participation; i++) {
                var initialPos = this.game.getRandomPosition();
                var snakeReset = new snake_1.default(initialPos, snake.maxMoves);
                snakeReset.brain = snake.brain;
                this.selectionPool.push(snakeReset);
            }
        }
    };
    Evolution.prototype.select = function () {
        var aIndex = Math.floor(Math.random() * this.selectionPool.length);
        var bIndex = Math.floor(Math.random() * this.selectionPool.length);
        return [
            this.selectionPool[aIndex],
            this.selectionPool[bIndex]
        ];
    };
    Evolution.prototype.crossover = function (a, b) {
        var initialPos = this.game.getRandomPosition();
        var offspring = new snake_1.default(initialPos, a.maxMoves);
        for (var i = 0; i < offspring.brain.length; i++) {
            // Weights
            for (var j = 0; j < offspring.brain[i].weights.length; j++) {
                var cutIndex = Math.floor(Math.random() * offspring.brain[i].weights[j].length);
                for (var k = 0; k < offspring.brain[i].weights[j].length; k++) {
                    offspring.brain[i].weights[j][k] = cutIndex < k
                        ? a.brain[i].weights[j][k]
                        : b.brain[i].weights[j][k];
                }
            }
            // Biases
            for (var i_1 = 0; i_1 < offspring.brain.length; i_1++) {
                var cutIndex = Math.floor(Math.random() * offspring.brain[i_1].biases.length);
                for (var j = 0; j < offspring.brain[i_1].biases[j]; j++) {
                    offspring.brain[i_1].biases[j] = cutIndex < j
                        ? a.brain[i_1].biases[j]
                        : b.brain[i_1].biases[j];
                }
            }
        }
        return offspring;
    };
    Evolution.prototype.mutate = function (offspring) {
        for (var _i = 0, _a = offspring.brain; _i < _a.length; _i++) {
            var layer = _a[_i];
            for (var row = 0; row < layer.weights.length; row++) {
                for (var col = 0; col < layer.weights[row].length; col++) {
                    if (Math.random() < this.mutationRate) {
                        layer.weights[row][col] += utils_1.randomGaussian();
                    }
                }
            }
            for (var j = 0; j < layer.biases.length; j++) {
                if (Math.random() < this.mutationRate) {
                    layer.biases[j] += utils_1.randomGaussian();
                }
            }
        }
    };
    return Evolution;
}());
exports.default = Evolution;


/***/ }),

/***/ "./src/food.ts":
/*!*********************!*\
  !*** ./src/food.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Food = /** @class */ (function () {
    function Food(position) {
        this.position = position;
    }
    return Food;
}());
exports.default = Food;


/***/ }),

/***/ "./src/game.ts":
/*!*********************!*\
  !*** ./src/game.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var food_1 = __webpack_require__(/*! ./food */ "./src/food.ts");
var vector2d_1 = __webpack_require__(/*! ./vector2d */ "./src/vector2d.ts");
var Game = /** @class */ (function () {
    function Game(boardSize) {
        this.isOver = false;
        this.pairs = [];
        this.boardSize = boardSize;
    }
    Game.prototype.addPair = function (snake, food) {
        this.pairs.push({
            snake: snake,
            food: food
        });
    };
    Game.prototype.getRandomPosition = function () {
        var x = Math.floor(Math.random() * this.boardSize);
        var y = Math.floor(Math.random() * this.boardSize);
        return new vector2d_1.default(x, y);
    };
    Game.prototype.clearPopulation = function () {
        this.pairs = [];
    };
    Game.prototype.getBestScore = function () {
        return Math.max.apply(Math, this.pairs.map(function (pair) { return pair.snake.score; }));
    };
    Game.prototype.runStep = function () {
        var availablePairs = this.pairs.filter(function (pair) { return pair.snake.isAlive; });
        if (availablePairs.length === 0) {
            this.isOver = true;
            return;
        }
        for (var _i = 0, availablePairs_1 = availablePairs; _i < availablePairs_1.length; _i++) {
            var pair = availablePairs_1[_i];
            var state = this.getObservation(pair);
            var direction = pair.snake.predictMove(state);
            pair.snake.move(direction);
            pair.snake.checkCollisions(this.boardSize);
            this.feedSnake(pair);
        }
    };
    Game.prototype.getObservation = function (pair) {
        var head = pair.snake.body[0];
        var tail = pair.snake.body.slice(1);
        var foodIsUp = head.y > pair.food.position.y;
        var foodIsRight = head.x < pair.food.position.x;
        var foodIsDown = head.y < pair.food.position.y;
        var foodIsLeft = head.x > pair.food.position.x;
        var hasObstacleAbove = false;
        var hasObstacleRight = false;
        var hasObstacleBelow = false;
        var hasObstacleLeft = false;
        // Own tail
        for (var _i = 0, tail_1 = tail; _i < tail_1.length; _i++) {
            var part = tail_1[_i];
            if (head.x === part.x) {
                if (head.y + 1 === part.y) {
                    hasObstacleBelow = true;
                }
                else if (head.y - 1 === part.y) {
                    hasObstacleAbove = true;
                }
            }
            if (head.y === part.y) {
                if (head.x + 1 === part.x) {
                    hasObstacleRight = true;
                }
                else if (head.x - 1 === part.x) {
                    hasObstacleLeft = true;
                }
            }
        }
        // Walls
        if (head.y - 1 === -1) {
            hasObstacleAbove = true;
        }
        else if (head.y + 1 === this.boardSize) {
            hasObstacleBelow = true;
        }
        if (head.x + 1 === this.boardSize) {
            hasObstacleRight = true;
        }
        else if (head.x - 1 === -1) {
            hasObstacleLeft = true;
        }
        return [
            foodIsUp ? 1 : 0,
            foodIsRight ? 1 : 0,
            foodIsDown ? 1 : 0,
            foodIsLeft ? 1 : 0,
            hasObstacleAbove ? 1 : 0,
            hasObstacleRight ? 1 : 0,
            hasObstacleBelow ? 1 : 0,
            hasObstacleLeft ? 1 : 0
        ];
    };
    Game.prototype.getRandomFoodPosition = function (snake) {
        var foodPosition = this.getRandomPosition();
        for (var _i = 0, _a = snake.body; _i < _a.length; _i++) {
            var part = _a[_i];
            if (foodPosition.isEqual(part)) {
                return this.getRandomFoodPosition(snake);
            }
        }
        return foodPosition;
    };
    Game.prototype.feedSnake = function (pair) {
        var head = pair.snake.body[0];
        if (head.isEqual(pair.food.position)) {
            pair.snake.grow();
            pair.snake.score += 1;
            var foodInitialPos = this.getRandomFoodPosition(pair.snake);
            pair.food = new food_1.default(foodInitialPos);
        }
    };
    return Game;
}());
exports.default = Game;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var game_1 = __webpack_require__(/*! ./game */ "./src/game.ts");
var snake_1 = __webpack_require__(/*! ./snake */ "./src/snake.ts");
var food_1 = __webpack_require__(/*! ./food */ "./src/food.ts");
var evolution_1 = __webpack_require__(/*! ./evolution */ "./src/evolution.ts");
var renderer_1 = __webpack_require__(/*! ./renderer */ "./src/renderer.ts");
var getInputValue = function (id) {
    return parseInt(document.querySelector(id).value);
};
var boardSize;
var populationSize;
var maxMoves;
var frameSpeed;
var mutationRate;
var game;
var evolution;
var renderer;
var generation;
document.querySelector('button')
    .addEventListener('click', function () {
    boardSize = getInputValue('#board-size');
    populationSize = getInputValue('#population-size');
    maxMoves = getInputValue('#max-moves');
    mutationRate = getInputValue('#mutation-rate') / 100;
    // TODO
    // frameSpeed = getInputValue('#frame-speed')
    game = new game_1.default(boardSize);
    evolution = new evolution_1.default(game, mutationRate);
    var canvas = document.querySelector('canvas');
    var body = document.querySelector('body');
    canvas.width = canvas.height = body.clientHeight * 0.9;
    renderer = new renderer_1.default(game, canvas);
    for (var i = 0; i < populationSize; i++) {
        var snakeInitialPos = game.getRandomPosition();
        var snake = new snake_1.default(snakeInitialPos, maxMoves);
        var foodInitialPos = game.getRandomFoodPosition(snake);
        var food = new food_1.default(foodInitialPos);
        game.addPair(snake, food);
    }
    generation = 1;
    run();
});
var run = function () {
    renderer.drawGrid();
    renderer.drawSnakes();
    renderer.drawFoods();
    game.runStep();
    if (game.isOver) {
        console.log("Gen " + generation + " best score: " + game.getBestScore());
        evolution.updateGeneration();
        generation += 1;
    }
    requestAnimationFrame(run);
};


/***/ }),

/***/ "./src/renderer.ts":
/*!*************************!*\
  !*** ./src/renderer.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Renderer = /** @class */ (function () {
    function Renderer(game, canvas) {
        this.game = game;
        this.ctx = canvas.getContext('2d');
        this.screen = {
            width: canvas.width,
            height: canvas.height
        };
    }
    Renderer.prototype.drawGrid = function () {
        var numRows = Math.ceil(Math.sqrt(this.game.pairs.length));
        var numCols = numRows;
        var gridSize = this.screen.width / numRows;
        for (var i = 0; i < numRows; i++) {
            for (var j = 0; j < numCols; j++) {
                var color = void 0;
                if ((i + j) % 2) {
                    color = '#fff';
                }
                else {
                    color = '#eee';
                }
                this.drawRect(i * gridSize, j * gridSize, gridSize, color);
            }
        }
    };
    Renderer.prototype.drawSnakes = function () {
        var snakes = this.game.pairs.map(function (pair) { return pair.snake; });
        var numCols = Math.ceil(Math.sqrt(this.game.pairs.length));
        var gridSize = this.screen.width / numCols;
        var stepSize = gridSize / this.game.boardSize;
        for (var i = 0; i < snakes.length; i++) {
            if (snakes[i].isAlive) {
                var xOffset = i % numCols;
                var yOffset = Math.floor(i / numCols);
                var colorStep = 200 / snakes[i].body.length;
                var green = 255;
                for (var _i = 0, _a = snakes[i].body; _i < _a.length; _i++) {
                    var part = _a[_i];
                    this.drawRect(xOffset * gridSize + part.x * stepSize, yOffset * gridSize + part.y * stepSize, stepSize, "rgb(0, " + green + ", 0)");
                    green -= colorStep;
                }
            }
        }
    };
    Renderer.prototype.drawFoods = function () {
        var foods = this.game.pairs.map(function (pair) { return pair.food; });
        var numCols = Math.ceil(Math.sqrt(this.game.pairs.length));
        var gridSize = this.screen.width / numCols;
        var stepSize = gridSize / this.game.boardSize;
        for (var i = 0; i < foods.length; i++) {
            if (this.game.pairs[i].snake.isAlive) {
                var xOffset = i % numCols;
                var yOffset = Math.floor(i / numCols);
                this.drawRect(xOffset * gridSize + foods[i].position.x * stepSize, yOffset * gridSize + foods[i].position.y * stepSize, stepSize, '#f00');
            }
        }
    };
    Renderer.prototype.drawRect = function (x, y, size, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, size, size);
    };
    return Renderer;
}());
exports.default = Renderer;


/***/ }),

/***/ "./src/snake.ts":
/*!**********************!*\
  !*** ./src/snake.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var vector2d_1 = __webpack_require__(/*! ./vector2d */ "./src/vector2d.ts");
var dense_layer_1 = __webpack_require__(/*! ./dense-layer */ "./src/dense-layer.ts");
var Snake = /** @class */ (function () {
    function Snake(initialPos, maxMoves) {
        this.score = 0;
        this.isAlive = true;
        this.body = [initialPos];
        this.brain = [
            new dense_layer_1.default(8, 8),
            new dense_layer_1.default(8, 4)
        ];
        this.maxMoves = maxMoves;
        this.remainingMoves = maxMoves;
    }
    Snake.prototype.predictMove = function (state) {
        var inputs = state;
        var outputs;
        var possibleDirections = [
            new vector2d_1.default(0, -1),
            new vector2d_1.default(1, 0),
            new vector2d_1.default(0, 1),
            new vector2d_1.default(-1, 0)
        ];
        for (var _i = 0, _a = this.brain; _i < _a.length; _i++) {
            var layer = _a[_i];
            outputs = layer.activate(inputs);
            inputs = outputs;
        }
        var dirIndex = outputs.indexOf(Math.max.apply(Math, outputs));
        return possibleDirections[dirIndex];
    };
    Snake.prototype.move = function (direction) {
        var head = this.body[0];
        var nextHead = new vector2d_1.default(head.x, head.y);
        nextHead.add(direction);
        var tailWithoutLast = this.body.slice(0, -1);
        this.body = [nextHead].concat(tailWithoutLast);
        this.remainingMoves -= 1;
        if (this.remainingMoves < 0) {
            this.isAlive = false;
        }
    };
    Snake.prototype.checkCollisions = function (boardSize) {
        var head = this.body[0];
        var tail = this.body.slice(1);
        for (var _i = 0, tail_1 = tail; _i < tail_1.length; _i++) {
            var part = tail_1[_i];
            if (head.isEqual(part)) {
                this.isAlive = false;
            }
        }
        if (head.x >= boardSize || head.x < 0) {
            this.isAlive = false;
        }
        if (head.y >= boardSize || head.y < 0) {
            this.isAlive = false;
        }
    };
    Snake.prototype.grow = function () {
        var lastPart = this.body[this.body.length - 1];
        var newBodyPart = new vector2d_1.default(lastPart.x, lastPart.y);
        this.body.push(newBodyPart);
    };
    return Snake;
}());
exports.default = Snake;


/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.randomGaussian = void 0;
exports.randomGaussian = function () {
    var sum = 0;
    for (var i = 0; i < 20; i++) {
        sum += Math.random() * 6 - 3;
    }
    return sum / 20;
};


/***/ }),

/***/ "./src/vector2d.ts":
/*!*************************!*\
  !*** ./src/vector2d.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Vector2d = /** @class */ (function () {
    function Vector2d(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Vector2d.prototype.add = function (other) {
        this.x += other.x;
        this.y += other.y;
    };
    Vector2d.prototype.dist = function (other) {
        var xDelta = this.x - other.x;
        var yDelta = this.y - other.y;
        return Math.sqrt(Math.pow(xDelta, 2) + Math.pow(yDelta, 2));
    };
    Vector2d.prototype.isEqual = function (other) {
        return this.dist(other) < 1e-06;
    };
    return Vector2d;
}());
exports.default = Vector2d;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RlbnNlLWxheWVyLnRzIiwid2VicGFjazovLy8uL3NyYy9ldm9sdXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Zvb2QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9yZW5kZXJlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc25ha2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy92ZWN0b3IyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNsRkEsbUVBQXdDO0FBRXhDO0lBT0ksb0JBQVksU0FBaUIsRUFBRSxVQUFrQjtRQUM3QyxJQUFJLENBQUMs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UUFDcEMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ1YsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQ2QsQ0FBQztJQUVELHNCQUFHLEdBQUgsVUFBSSxLQUFlO1FBQ2YsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFFRCx1QkFBSSxHQUFKLFVBQUssS0FBZTtRQUNoQixJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQy9CLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDL0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRCwwQkFBTyxHQUFQLFVBQVEsS0FBZTtRQUNuQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSztJQUNuQyxDQUFDO0lBRUwsZUFBQztBQUFELENBQUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgeyByYW5kb21HYXVzc2lhbiB9IGZyb20gJy4vdXRpbHMnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZW5zZUxheWVyIHtcclxuXHJcbiAgICBudW1JbnB1dHM6IG51bWJlclxyXG4gICAgbnVtT3V0cHV0czogbnVtYmVyXHJcbiAgICB3ZWlnaHRzOiBudW1iZXJbXVtdXHJcbiAgICBiaWFzZXM6IG51bWJlcltdXHJcblxyXG4gICAgY29uc3RydWN0b3IobnVtSW5wdXRzOiBudW1iZXIsIG51bU91dHB1dHM6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMubnVtSW5wdXRzID0gbnVtSW5wdXRzXHJcbiAgICAgICAgdGhpcy5udW1PdXRwdXRzID0gbnVtT3V0cHV0c1xyXG4gICAgICAgIHRoaXMud2VpZ2h0cyA9IHRoaXMuaW5pdFdlaWdodHMoKVxyXG4gICAgICAgIHRoaXMuYmlhc2VzID0gdGhpcy5pbml0Qmlhc2VzKClcclxuICAgIH1cclxuXHJcbiAgICBpbml0V2VpZ2h0cygpOiBudW1iZXJbXVtdIHtcclxuICAgICAgICBsZXQgd2VpZ2h0cyA9IFtdXHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5udW1JbnB1dHM7IGkrKykge1xyXG4gICAgICAgICAgICB3ZWlnaHRzW2ldID0gW11cclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5udW1PdXRwdXRzOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIHdlaWdodHNbaV0ucHVzaChyYW5kb21HYXVzc2lhbigpKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gd2VpZ2h0c1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRCaWFzZXMoKTogbnVtYmVyW10ge1xyXG4gICAgICAgIGxldCBiaWFzZXMgPSBbXVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubnVtT3V0cHV0czsgaSsrKSB7XHJcbiAgICAgICAgICAgIGJpYXNlcy5wdXNoKHJhbmRvbUdhdXNzaWFuKCkpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYmlhc2VzXHJcbiAgICB9XHJcblxyXG4gICAgYWN0aXZhdGUoaW5wdXRzOiBudW1iZXJbXSk6IG51bWJlcltdIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gW11cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm51bU91dHB1dHM7IGkrKykge1xyXG4gICAgICAgICAgICByZXN1bHRbaV0gPSAwXHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGlucHV0cy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0W2ldICs9IGlucHV0c1tqXSAqIHRoaXMud2VpZ2h0c1tqXVtpXVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXN1bHRbaV0gKz0gdGhpcy5iaWFzZXNbaV1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHRcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgR2FtZSBmcm9tICcuL2dhbWUnXHJcbmltcG9ydCBTbmFrZSBmcm9tICcuL3NuYWtlJ1xyXG5pbXBvcnQgRm9vZCBmcm9tICcuL2Zvb2QnXHJcbmltcG9ydCB7IHJhbmRvbUdhdXNzaWFuIH0gZnJvbSAnLi91dGlscydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2b2x1dGlvbiB7XHJcblxyXG4gICAgZ2FtZTogR2FtZVxyXG4gICAgc2VsZWN0aW9uUG9vbDogU25ha2VbXVxyXG4gICAgbXV0YXRpb25SYXRlOiBudW1iZXJcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lOiBHYW1lLCBtdXRhdGlvblJhdGU6IG51bWJlciA9IDAuMDUpIHtcclxuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lXHJcbiAgICAgICAgdGhpcy5tdXRhdGlvblJhdGUgPSBtdXRhdGlvblJhdGVcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVHZW5lcmF0aW9uKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHBvcHVsYXRpb25TaXplID0gdGhpcy5nYW1lLnBhaXJzLmxlbmd0aFxyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdGlvblBvb2woKVxyXG4gICAgICAgIHRoaXMuZ2FtZS5jbGVhclBvcHVsYXRpb24oKVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBvcHVsYXRpb25TaXplOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgcGFyZW50cyA9IHRoaXMuc2VsZWN0KClcclxuICAgICAgICAgICAgY29uc3QgW2EsIGJdID0gcGFyZW50c1xyXG4gICAgICAgICAgICBjb25zdCBvZmZzcHJpbmcgPSB0aGlzLmNyb3Nzb3ZlcihhLCBiKVxyXG4gICAgICAgICAgICB0aGlzLm11dGF0ZShvZmZzcHJpbmcpXHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRQYWlyKFxyXG4gICAgICAgICAgICAgICAgb2Zmc3ByaW5nLFxyXG4gICAgICAgICAgICAgICAgbmV3IEZvb2QodGhpcy5nYW1lLmdldFJhbmRvbVBvc2l0aW9uKCkpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZ2FtZS5pc092ZXIgPSBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVNlbGVjdGlvblBvb2woKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgbWF4U2NvcmVzID0gdGhpcy5nYW1lLnBhaXJzXHJcbiAgICAgICAgICAgIC5tYXAocGFpciA9PiBwYWlyLnNuYWtlLnNjb3JlKVxyXG4gICAgICAgICAgICAucmVkdWNlKChhLCBiKSA9PiBhICsgYilcclxuXHJcbiAgICAgICAgaWYgKG1heFNjb3JlcyA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvblBvb2wgPSB0aGlzLmdhbWUucGFpcnNcclxuICAgICAgICAgICAgICAgIC5tYXAocGFpciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5pdGlhbFBvcyA9IHRoaXMuZ2FtZS5nZXRSYW5kb21Qb3NpdGlvbigpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBTbmFrZShpbml0aWFsUG9zLCBwYWlyLnNuYWtlLm1heE1vdmVzKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25Qb29sID0gW11cclxuXHJcbiAgICAgICAgY29uc3Qgc25ha2VzID0gdGhpcy5nYW1lLnBhaXJzLm1hcChwYWlyID0+IHBhaXIuc25ha2UpXHJcblxyXG4gICAgICAgIGZvciAobGV0IHNuYWtlIG9mIHNuYWtlcykge1xyXG4gICAgICAgICAgICBjb25zdCBwYXJ0aWNpcGF0aW9uID0gTWF0aC5mbG9vcihzbmFrZS5zY29yZSAvIG1heFNjb3JlcyAqIDEwMDApXHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhcnRpY2lwYXRpb247IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5pdGlhbFBvcyA9IHRoaXMuZ2FtZS5nZXRSYW5kb21Qb3NpdGlvbigpXHJcbiAgICAgICAgICAgICAgICBjb25zdCBzbmFrZVJlc2V0ID0gbmV3IFNuYWtlKGluaXRpYWxQb3MsIHNuYWtlLm1heE1vdmVzKVxyXG5cclxuICAgICAgICAgICAgICAgIHNuYWtlUmVzZXQuYnJhaW4gPSBzbmFrZS5icmFpblxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uUG9vbC5wdXNoKHNuYWtlUmVzZXQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0KCk6IFNuYWtlW10ge1xyXG4gICAgICAgIGNvbnN0IGFJbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuc2VsZWN0aW9uUG9vbC5sZW5ndGgpXHJcbiAgICAgICAgY29uc3QgYkluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5zZWxlY3Rpb25Qb29sLmxlbmd0aClcclxuXHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Qb29sW2FJbmRleF0sXHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uUG9vbFtiSW5kZXhdXHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG5cclxuICAgIGNyb3Nzb3ZlcihhOiBTbmFrZSwgYjogU25ha2UpOiBTbmFrZSB7XHJcbiAgICAgICAgY29uc3QgaW5pdGlhbFBvcyA9IHRoaXMuZ2FtZS5nZXRSYW5kb21Qb3NpdGlvbigpXHJcbiAgICAgICAgY29uc3Qgb2Zmc3ByaW5nID0gbmV3IFNuYWtlKGluaXRpYWxQb3MsIGEubWF4TW92ZXMpXHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2Zmc3ByaW5nLmJyYWluLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vIFdlaWdodHNcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBvZmZzcHJpbmcuYnJhaW5baV0ud2VpZ2h0cy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY3V0SW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBvZmZzcHJpbmcuYnJhaW5baV0ud2VpZ2h0c1tqXS5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IG9mZnNwcmluZy5icmFpbltpXS53ZWlnaHRzW2pdLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2Zmc3ByaW5nLmJyYWluW2ldLndlaWdodHNbal1ba10gPSBjdXRJbmRleCA8IGtcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyBhLmJyYWluW2ldLndlaWdodHNbal1ba11cclxuICAgICAgICAgICAgICAgICAgICAgICAgOiBiLmJyYWluW2ldLndlaWdodHNbal1ba11cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQmlhc2VzXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2Zmc3ByaW5nLmJyYWluLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjdXRJbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG9mZnNwcmluZy5icmFpbltpXS5iaWFzZXMubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBvZmZzcHJpbmcuYnJhaW5baV0uYmlhc2VzW2pdOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBvZmZzcHJpbmcuYnJhaW5baV0uYmlhc2VzW2pdID0gY3V0SW5kZXggPCBqXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gYS5icmFpbltpXS5iaWFzZXNbal1cclxuICAgICAgICAgICAgICAgICAgICAgICAgOiBiLmJyYWluW2ldLmJpYXNlc1tqXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gb2Zmc3ByaW5nXHJcbiAgICB9XHJcblxyXG4gICAgbXV0YXRlKG9mZnNwcmluZzogU25ha2UpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGxldCBsYXllciBvZiBvZmZzcHJpbmcuYnJhaW4pIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgbGF5ZXIud2VpZ2h0cy5sZW5ndGg7IHJvdysrKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCBsYXllci53ZWlnaHRzW3Jvd10ubGVuZ3RoOyBjb2wrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgdGhpcy5tdXRhdGlvblJhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXIud2VpZ2h0c1tyb3ddW2NvbF0gKz0gcmFuZG9tR2F1c3NpYW4oKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBsYXllci5iaWFzZXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgdGhpcy5tdXRhdGlvblJhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBsYXllci5iaWFzZXNbal0gKz0gcmFuZG9tR2F1c3NpYW4oKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgVmVjdG9yMmQgZnJvbSAnLi92ZWN0b3IyZCdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvb2Qge1xyXG5cclxuICAgIHBvc2l0aW9uOiBWZWN0b3IyZFxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBvc2l0aW9uOiBWZWN0b3IyZCkge1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvblxyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCBGb29kIGZyb20gJy4vZm9vZCdcclxuaW1wb3J0IFZlY3RvcjJkIGZyb20gJy4vdmVjdG9yMmQnXHJcbmltcG9ydCBTbmFrZSBmcm9tICcuL3NuYWtlJ1xyXG5cclxudHlwZSBQYWlyID0ge1xyXG4gICAgc25ha2U6IFNuYWtlLFxyXG4gICAgZm9vZDogRm9vZFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIHtcclxuXHJcbiAgICBib2FyZFNpemU6IG51bWJlclxyXG5cclxuICAgIGlzT3ZlcjogYm9vbGVhbiA9IGZhbHNlXHJcbiAgICBwYWlyczogUGFpcltdID0gW11cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihib2FyZFNpemU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuYm9hcmRTaXplID0gYm9hcmRTaXplXHJcbiAgICB9XHJcblxyXG4gICAgYWRkUGFpcihzbmFrZTogU25ha2UsIGZvb2Q6IEZvb2QpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnBhaXJzLnB1c2goe1xyXG4gICAgICAgICAgICBzbmFrZSxcclxuICAgICAgICAgICAgZm9vZFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UmFuZG9tUG9zaXRpb24oKTogVmVjdG9yMmQge1xyXG4gICAgICAgIGNvbnN0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmJvYXJkU2l6ZSlcclxuICAgICAgICBjb25zdCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5ib2FyZFNpemUpXHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyZCh4LCB5KVxyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyUG9wdWxhdGlvbigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnBhaXJzID0gW11cclxuICAgIH1cclxuXHJcbiAgICBnZXRCZXN0U2NvcmUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5tYXgoLi4udGhpcy5wYWlycy5tYXAocGFpciA9PiBwYWlyLnNuYWtlLnNjb3JlKSlcclxuICAgIH1cclxuXHJcbiAgICBydW5TdGVwKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGF2YWlsYWJsZVBhaXJzID0gdGhpcy5wYWlycy5maWx0ZXIocGFpciA9PiBwYWlyLnNuYWtlLmlzQWxpdmUpXHJcblxyXG4gICAgICAgIGlmIChhdmFpbGFibGVQYWlycy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5pc092ZXIgPSB0cnVlXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgcGFpciBvZiBhdmFpbGFibGVQYWlycykge1xyXG4gICAgICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuZ2V0T2JzZXJ2YXRpb24ocGFpcilcclxuICAgICAgICAgICAgY29uc3QgZGlyZWN0aW9uID0gcGFpci5zbmFrZS5wcmVkaWN0TW92ZShzdGF0ZSlcclxuXHJcbiAgICAgICAgICAgIHBhaXIuc25ha2UubW92ZShkaXJlY3Rpb24pXHJcblxyXG4gICAgICAgICAgICBwYWlyLnNuYWtlLmNoZWNrQ29sbGlzaW9ucyh0aGlzLmJvYXJkU2l6ZSlcclxuICAgICAgICAgICAgdGhpcy5mZWVkU25ha2UocGFpcilcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0T2JzZXJ2YXRpb24ocGFpcjogUGFpcik6IG51bWJlcltdIHtcclxuICAgICAgICBjb25zdCBoZWFkID0gcGFpci5zbmFrZS5ib2R5WzBdXHJcbiAgICAgICAgY29uc3QgdGFpbCA9IHBhaXIuc25ha2UuYm9keS5zbGljZSgxKVxyXG5cclxuICAgICAgICBjb25zdCBmb29kSXNVcCA9IGhlYWQueSA+IHBhaXIuZm9vZC5wb3NpdGlvbi55XHJcbiAgICAgICAgY29uc3QgZm9vZElzUmlnaHQgPSBoZWFkLnggPCBwYWlyLmZvb2QucG9zaXRpb24ueFxyXG4gICAgICAgIGNvbnN0IGZvb2RJc0Rvd24gPSBoZWFkLnkgPCBwYWlyLmZvb2QucG9zaXRpb24ueVxyXG4gICAgICAgIGNvbnN0IGZvb2RJc0xlZnQgPSBoZWFkLnggPiBwYWlyLmZvb2QucG9zaXRpb24ueFxyXG5cclxuICAgICAgICBsZXQgaGFzT2JzdGFjbGVBYm92ZSA9IGZhbHNlXHJcbiAgICAgICAgbGV0IGhhc09ic3RhY2xlUmlnaHQgPSBmYWxzZVxyXG4gICAgICAgIGxldCBoYXNPYnN0YWNsZUJlbG93ID0gZmFsc2VcclxuICAgICAgICBsZXQgaGFzT2JzdGFjbGVMZWZ0ID0gZmFsc2VcclxuXHJcbiAgICAgICAgLy8gT3duIHRhaWxcclxuICAgICAgICBmb3IgKGxldCBwYXJ0IG9mIHRhaWwpIHtcclxuICAgICAgICAgICAgaWYgKGhlYWQueCA9PT0gcGFydC54KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaGVhZC55ICsgMSA9PT0gcGFydC55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzT2JzdGFjbGVCZWxvdyA9IHRydWVcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaGVhZC55IC0gMSA9PT0gcGFydC55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzT2JzdGFjbGVBYm92ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGhlYWQueSA9PT0gcGFydC55KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaGVhZC54ICsgMSA9PT0gcGFydC54KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzT2JzdGFjbGVSaWdodCA9IHRydWVcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaGVhZC54IC0gMSA9PT0gcGFydC54KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzT2JzdGFjbGVMZWZ0ID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBXYWxsc1xyXG4gICAgICAgIGlmIChoZWFkLnkgLSAxID09PSAtMSkge1xyXG4gICAgICAgICAgICBoYXNPYnN0YWNsZUFib3ZlID0gdHJ1ZVxyXG4gICAgICAgIH0gZWxzZSBpZiAoaGVhZC55ICsgMSA9PT0gdGhpcy5ib2FyZFNpemUpIHtcclxuICAgICAgICAgICAgaGFzT2JzdGFjbGVCZWxvdyA9IHRydWVcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChoZWFkLnggKyAxID09PSB0aGlzLmJvYXJkU2l6ZSkge1xyXG4gICAgICAgICAgICBoYXNPYnN0YWNsZVJpZ2h0ID0gdHJ1ZVxyXG4gICAgICAgIH0gZWxzZSBpZiAoaGVhZC54IC0gMSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgaGFzT2JzdGFjbGVMZWZ0ID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgZm9vZElzVXAgPyAxIDogMCxcclxuICAgICAgICAgICAgZm9vZElzUmlnaHQgPyAxIDogMCxcclxuICAgICAgICAgICAgZm9vZElzRG93biA/IDEgOiAwLFxyXG4gICAgICAgICAgICBmb29kSXNMZWZ0ID8gMSA6IDAsXHJcbiAgICAgICAgICAgIGhhc09ic3RhY2xlQWJvdmUgPyAxIDogMCxcclxuICAgICAgICAgICAgaGFzT2JzdGFjbGVSaWdodCA/IDEgOiAwLFxyXG4gICAgICAgICAgICBoYXNPYnN0YWNsZUJlbG93ID8gMSA6IDAsXHJcbiAgICAgICAgICAgIGhhc09ic3RhY2xlTGVmdCA/IDEgOiAwXHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG5cclxuICAgIGdldFJhbmRvbUZvb2RQb3NpdGlvbihzbmFrZTogU25ha2UpOiBWZWN0b3IyZCB7XHJcbiAgICAgICAgY29uc3QgZm9vZFBvc2l0aW9uID0gdGhpcy5nZXRSYW5kb21Qb3NpdGlvbigpXHJcblxyXG4gICAgICAgIGZvciAobGV0IHBhcnQgb2Ygc25ha2UuYm9keSkge1xyXG4gICAgICAgICAgICBpZiAoZm9vZFBvc2l0aW9uLmlzRXF1YWwocGFydCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFJhbmRvbUZvb2RQb3NpdGlvbihzbmFrZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZvb2RQb3NpdGlvblxyXG4gICAgfVxyXG5cclxuICAgIGZlZWRTbmFrZShwYWlyOiBQYWlyKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgaGVhZCA9IHBhaXIuc25ha2UuYm9keVswXVxyXG5cclxuICAgICAgICBpZiAoaGVhZC5pc0VxdWFsKHBhaXIuZm9vZC5wb3NpdGlvbikpIHtcclxuICAgICAgICAgICAgcGFpci5zbmFrZS5ncm93KClcclxuICAgICAgICAgICAgcGFpci5zbmFrZS5zY29yZSArPSAxXHJcbiAgICAgICAgICAgIGNvbnN0IGZvb2RJbml0aWFsUG9zID0gdGhpcy5nZXRSYW5kb21Gb29kUG9zaXRpb24ocGFpci5zbmFrZSlcclxuICAgICAgICAgICAgcGFpci5mb29kID0gbmV3IEZvb2QoZm9vZEluaXRpYWxQb3MpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCBHYW1lIGZyb20gJy4vZ2FtZSdcclxuaW1wb3J0IFNuYWtlIGZyb20gJy4vc25ha2UnXHJcbmltcG9ydCBGb29kIGZyb20gJy4vZm9vZCdcclxuaW1wb3J0IEV2b2x1dGlvbiBmcm9tICcuL2V2b2x1dGlvbidcclxuaW1wb3J0IFJlbmRlcmVyIGZyb20gJy4vcmVuZGVyZXInXHJcblxyXG5jb25zdCBnZXRJbnB1dFZhbHVlID0gKGlkOiBzdHJpbmcpOiBudW1iZXIgPT4ge1xyXG4gICAgcmV0dXJuIHBhcnNlSW50KChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGlkKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSlcclxufVxyXG5cclxubGV0IGJvYXJkU2l6ZTogbnVtYmVyXHJcbmxldCBwb3B1bGF0aW9uU2l6ZTogbnVtYmVyXHJcbmxldCBtYXhNb3ZlczogbnVtYmVyXHJcbmxldCBmcmFtZVNwZWVkOiBudW1iZXJcclxubGV0IG11dGF0aW9uUmF0ZTogbnVtYmVyXHJcbmxldCBnYW1lOiBHYW1lXHJcbmxldCBldm9sdXRpb246IEV2b2x1dGlvblxyXG5sZXQgcmVuZGVyZXI6IFJlbmRlcmVyXHJcbmxldCBnZW5lcmF0aW9uOiBudW1iZXJcclxuXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbicpXHJcbiAgICAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgYm9hcmRTaXplID0gZ2V0SW5wdXRWYWx1ZSgnI2JvYXJkLXNpemUnKVxyXG4gICAgICAgIHBvcHVsYXRpb25TaXplID0gZ2V0SW5wdXRWYWx1ZSgnI3BvcHVsYXRpb24tc2l6ZScpXHJcbiAgICAgICAgbWF4TW92ZXMgPSBnZXRJbnB1dFZhbHVlKCcjbWF4LW1vdmVzJylcclxuICAgICAgICBtdXRhdGlvblJhdGUgPSBnZXRJbnB1dFZhbHVlKCcjbXV0YXRpb24tcmF0ZScpIC8gMTAwXHJcbiAgICAgICAgLy8gVE9ET1xyXG4gICAgICAgIC8vIGZyYW1lU3BlZWQgPSBnZXRJbnB1dFZhbHVlKCcjZnJhbWUtc3BlZWQnKVxyXG5cclxuICAgICAgICBnYW1lID0gbmV3IEdhbWUoYm9hcmRTaXplKVxyXG4gICAgICAgIGV2b2x1dGlvbiA9IG5ldyBFdm9sdXRpb24oZ2FtZSwgbXV0YXRpb25SYXRlKVxyXG5cclxuICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdjYW52YXMnKVxyXG4gICAgICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JylcclxuICAgICAgICBjYW52YXMud2lkdGggPSBjYW52YXMuaGVpZ2h0ID0gYm9keS5jbGllbnRIZWlnaHQgKiAwLjk7XHJcblxyXG4gICAgICAgIHJlbmRlcmVyID0gbmV3IFJlbmRlcmVyKGdhbWUsIGNhbnZhcylcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb3B1bGF0aW9uU2l6ZTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNuYWtlSW5pdGlhbFBvcyA9IGdhbWUuZ2V0UmFuZG9tUG9zaXRpb24oKVxyXG4gICAgICAgICAgICBjb25zdCBzbmFrZSA9IG5ldyBTbmFrZShzbmFrZUluaXRpYWxQb3MsIG1heE1vdmVzKVxyXG4gICAgICAgICAgICBjb25zdCBmb29kSW5pdGlhbFBvcyA9IGdhbWUuZ2V0UmFuZG9tRm9vZFBvc2l0aW9uKHNuYWtlKVxyXG4gICAgICAgICAgICBjb25zdCBmb29kID0gbmV3IEZvb2QoZm9vZEluaXRpYWxQb3MpXHJcbiAgICAgICAgICAgIGdhbWUuYWRkUGFpcihzbmFrZSwgZm9vZClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdlbmVyYXRpb24gPSAxXHJcblxyXG4gICAgICAgIHJ1bigpXHJcbiAgICB9KVxyXG5cclxuY29uc3QgcnVuID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgcmVuZGVyZXIuZHJhd0dyaWQoKVxyXG4gICAgcmVuZGVyZXIuZHJhd1NuYWtlcygpXHJcbiAgICByZW5kZXJlci5kcmF3Rm9vZHMoKVxyXG5cclxuICAgIGdhbWUucnVuU3RlcCgpXHJcblxyXG4gICAgaWYgKGdhbWUuaXNPdmVyKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYEdlbiAke2dlbmVyYXRpb259IGJlc3Qgc2NvcmU6ICR7Z2FtZS5nZXRCZXN0U2NvcmUoKX1gKVxyXG4gICAgICAgIGV2b2x1dGlvbi51cGRhdGVHZW5lcmF0aW9uKClcclxuICAgICAgICBnZW5lcmF0aW9uICs9IDFcclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocnVuKVxyXG59IiwiaW1wb3J0IEdhbWUgZnJvbSAnLi9nYW1lJ1xyXG5cclxudHlwZSBTY3JlZW4gPSB7XHJcbiAgICB3aWR0aDogbnVtYmVyLFxyXG4gICAgaGVpZ2h0OiBudW1iZXJcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVuZGVyZXIge1xyXG5cclxuICAgIGdhbWU6IEdhbWVcclxuICAgIHNjcmVlbjogU2NyZWVuXHJcbiAgICBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRFxyXG4gICAgc3RlcFNpemU6IG51bWJlclxyXG4gICAgZ3JpZFNpemU6IG51bWJlclxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGdhbWU6IEdhbWUsIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpIHtcclxuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lXHJcbiAgICAgICAgdGhpcy5jdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxyXG4gICAgICAgIHRoaXMuc2NyZWVuID0ge1xyXG4gICAgICAgICAgICB3aWR0aDogY2FudmFzLndpZHRoLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IGNhbnZhcy5oZWlnaHRcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZHJhd0dyaWQoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgbnVtUm93cyA9IE1hdGguY2VpbChNYXRoLnNxcnQodGhpcy5nYW1lLnBhaXJzLmxlbmd0aCkpXHJcbiAgICAgICAgY29uc3QgbnVtQ29scyA9IG51bVJvd3NcclxuICAgICAgICBjb25zdCBncmlkU2l6ZSA9IHRoaXMuc2NyZWVuLndpZHRoIC8gbnVtUm93c1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVJvd3M7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG51bUNvbHM7IGorKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbG9yXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKChpICsgaikgJSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3IgPSAnI2ZmZidcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3IgPSAnI2VlZSdcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdSZWN0KGkgKiBncmlkU2l6ZSwgaiAqIGdyaWRTaXplLCBncmlkU2l6ZSwgY29sb3IpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZHJhd1NuYWtlcygpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBzbmFrZXMgPSB0aGlzLmdhbWUucGFpcnMubWFwKHBhaXIgPT4gcGFpci5zbmFrZSlcclxuICAgICAgICBjb25zdCBudW1Db2xzID0gTWF0aC5jZWlsKE1hdGguc3FydCh0aGlzLmdhbWUucGFpcnMubGVuZ3RoKSlcclxuICAgICAgICBjb25zdCBncmlkU2l6ZSA9IHRoaXMuc2NyZWVuLndpZHRoIC8gbnVtQ29sc1xyXG4gICAgICAgIGNvbnN0IHN0ZXBTaXplID0gZ3JpZFNpemUgLyB0aGlzLmdhbWUuYm9hcmRTaXplXHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc25ha2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChzbmFrZXNbaV0uaXNBbGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeE9mZnNldCA9IGkgJSBudW1Db2xzXHJcbiAgICAgICAgICAgICAgICBjb25zdCB5T2Zmc2V0ID0gTWF0aC5mbG9vcihpIC8gbnVtQ29scylcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb2xvclN0ZXAgPSAyMDAgLyBzbmFrZXNbaV0uYm9keS5sZW5ndGhcclxuICAgICAgICAgICAgICAgIGxldCBncmVlbiA9IDI1NVxyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHBhcnQgb2Ygc25ha2VzW2ldLmJvZHkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdSZWN0KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB4T2Zmc2V0ICogZ3JpZFNpemUgKyBwYXJ0LnggKiBzdGVwU2l6ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeU9mZnNldCAqIGdyaWRTaXplICsgcGFydC55ICogc3RlcFNpemUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXBTaXplLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBgcmdiKDAsICR7Z3JlZW59LCAwKWBcclxuICAgICAgICAgICAgICAgICAgICApXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGdyZWVuIC09IGNvbG9yU3RlcFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRyYXdGb29kcygpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBmb29kcyA9IHRoaXMuZ2FtZS5wYWlycy5tYXAocGFpciA9PiBwYWlyLmZvb2QpXHJcbiAgICAgICAgY29uc3QgbnVtQ29scyA9IE1hdGguY2VpbChNYXRoLnNxcnQodGhpcy5nYW1lLnBhaXJzLmxlbmd0aCkpXHJcbiAgICAgICAgY29uc3QgZ3JpZFNpemUgPSB0aGlzLnNjcmVlbi53aWR0aCAvIG51bUNvbHNcclxuICAgICAgICBjb25zdCBzdGVwU2l6ZSA9IGdyaWRTaXplIC8gdGhpcy5nYW1lLmJvYXJkU2l6ZVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZvb2RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWUucGFpcnNbaV0uc25ha2UuaXNBbGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeE9mZnNldCA9IGkgJSBudW1Db2xzXHJcbiAgICAgICAgICAgICAgICBjb25zdCB5T2Zmc2V0ID0gTWF0aC5mbG9vcihpIC8gbnVtQ29scylcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdSZWN0KFxyXG4gICAgICAgICAgICAgICAgICAgIHhPZmZzZXQgKiBncmlkU2l6ZSArIGZvb2RzW2ldLnBvc2l0aW9uLnggKiBzdGVwU2l6ZSxcclxuICAgICAgICAgICAgICAgICAgICB5T2Zmc2V0ICogZ3JpZFNpemUgKyBmb29kc1tpXS5wb3NpdGlvbi55ICogc3RlcFNpemUsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RlcFNpemUsXHJcbiAgICAgICAgICAgICAgICAgICAgJyNmMDAnXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZHJhd1JlY3QoeDogbnVtYmVyLCB5OiBudW1iZXIsIHNpemU6IG51bWJlciwgY29sb3I6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IGNvbG9yXHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoXHJcbiAgICAgICAgICAgIHgsXHJcbiAgICAgICAgICAgIHksXHJcbiAgICAgICAgICAgIHNpemUsXHJcbiAgICAgICAgICAgIHNpemVcclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IFZlY3RvcjJkIGZyb20gJy4vdmVjdG9yMmQnXHJcbmltcG9ydCBEZW5zZUxheWVyIGZyb20gJy4vZGVuc2UtbGF5ZXInXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbmFrZSB7XHJcblxyXG4gICAgYm9keTogVmVjdG9yMmRbXVxyXG4gICAgYnJhaW46IERlbnNlTGF5ZXJbXVxyXG4gICAgbWF4TW92ZXM6IG51bWJlclxyXG4gICAgcmVtYWluaW5nTW92ZXM6IG51bWJlclxyXG5cclxuICAgIHNjb3JlOiBudW1iZXIgPSAwXHJcbiAgICBpc0FsaXZlOiBib29sZWFuID0gdHJ1ZVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGluaXRpYWxQb3M6IFZlY3RvcjJkLCBtYXhNb3ZlczogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5ib2R5ID0gW2luaXRpYWxQb3NdXHJcbiAgICAgICAgdGhpcy5icmFpbiA9IFtcclxuICAgICAgICAgICAgbmV3IERlbnNlTGF5ZXIoOCwgOCksXHJcbiAgICAgICAgICAgIG5ldyBEZW5zZUxheWVyKDgsIDQpXHJcbiAgICAgICAgXVxyXG4gICAgICAgIHRoaXMubWF4TW92ZXMgPSBtYXhNb3Zlc1xyXG4gICAgICAgIHRoaXMucmVtYWluaW5nTW92ZXMgPSBtYXhNb3Zlc1xyXG4gICAgfVxyXG5cclxuICAgIHByZWRpY3RNb3ZlKHN0YXRlOiBudW1iZXJbXSk6IFZlY3RvcjJkIHtcclxuICAgICAgICBsZXQgaW5wdXRzID0gc3RhdGVcclxuICAgICAgICBsZXQgb3V0cHV0czogbnVtYmVyW11cclxuICAgICAgICBjb25zdCBwb3NzaWJsZURpcmVjdGlvbnMgPSBbXHJcbiAgICAgICAgICAgIG5ldyBWZWN0b3IyZCgwLCAtMSksXHJcbiAgICAgICAgICAgIG5ldyBWZWN0b3IyZCgxLCAwKSxcclxuICAgICAgICAgICAgbmV3IFZlY3RvcjJkKDAsIDEpLFxyXG4gICAgICAgICAgICBuZXcgVmVjdG9yMmQoLTEsIDApXHJcbiAgICAgICAgXVxyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IGxheWVyIG9mIHRoaXMuYnJhaW4pIHtcclxuICAgICAgICAgICAgb3V0cHV0cyA9IGxheWVyLmFjdGl2YXRlKGlucHV0cylcclxuICAgICAgICAgICAgaW5wdXRzID0gb3V0cHV0c1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZGlySW5kZXggPSBvdXRwdXRzLmluZGV4T2YoTWF0aC5tYXgoLi4ub3V0cHV0cykpXHJcblxyXG4gICAgICAgIHJldHVybiBwb3NzaWJsZURpcmVjdGlvbnNbZGlySW5kZXhdXHJcbiAgICB9XHJcblxyXG4gICAgbW92ZShkaXJlY3Rpb246IFZlY3RvcjJkKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgaGVhZCA9IHRoaXMuYm9keVswXVxyXG4gICAgICAgIGNvbnN0IG5leHRIZWFkID0gbmV3IFZlY3RvcjJkKGhlYWQueCwgaGVhZC55KVxyXG4gICAgICAgIG5leHRIZWFkLmFkZChkaXJlY3Rpb24pXHJcbiAgICAgICAgY29uc3QgdGFpbFdpdGhvdXRMYXN0ID0gdGhpcy5ib2R5LnNsaWNlKDAsIC0xKVxyXG5cclxuICAgICAgICB0aGlzLmJvZHkgPSBbbmV4dEhlYWRdLmNvbmNhdCh0YWlsV2l0aG91dExhc3QpXHJcbiAgICAgICAgdGhpcy5yZW1haW5pbmdNb3ZlcyAtPSAxXHJcblxyXG4gICAgICAgIGlmICh0aGlzLnJlbWFpbmluZ01vdmVzIDwgMCkge1xyXG4gICAgICAgICAgICB0aGlzLmlzQWxpdmUgPSBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGVja0NvbGxpc2lvbnMoYm9hcmRTaXplOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBoZWFkID0gdGhpcy5ib2R5WzBdXHJcbiAgICAgICAgY29uc3QgdGFpbCA9IHRoaXMuYm9keS5zbGljZSgxKVxyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IHBhcnQgb2YgdGFpbCkge1xyXG4gICAgICAgICAgICBpZiAoaGVhZC5pc0VxdWFsKHBhcnQpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzQWxpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaGVhZC54ID49IGJvYXJkU2l6ZSB8fCBoZWFkLnggPCAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNBbGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaGVhZC55ID49IGJvYXJkU2l6ZSB8fCBoZWFkLnkgPCAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNBbGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdyb3coKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgbGFzdFBhcnQgPSB0aGlzLmJvZHlbdGhpcy5ib2R5Lmxlbmd0aCAtIDFdXHJcbiAgICAgICAgY29uc3QgbmV3Qm9keVBhcnQgPSBuZXcgVmVjdG9yMmQoXHJcbiAgICAgICAgICAgIGxhc3RQYXJ0LngsXHJcbiAgICAgICAgICAgIGxhc3RQYXJ0LnlcclxuICAgICAgICApXHJcbiAgICAgICAgdGhpcy5ib2R5LnB1c2gobmV3Qm9keVBhcnQpXHJcbiAgICB9XHJcblxyXG59IiwiZXhwb3J0IGNvbnN0IHJhbmRvbUdhdXNzaWFuID0gKCk6IG51bWJlciA9PiB7XHJcbiAgICBsZXQgc3VtID0gMFxyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjA7IGkrKykge1xyXG4gICAgICAgIHN1bSArPSBNYXRoLnJhbmRvbSgpICogNiAtIDNcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc3VtIC8gMjBcclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlY3RvcjJkIHtcclxuXHJcbiAgICB4OiBudW1iZXJcclxuICAgIHk6IG51bWJlclxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciA9IDAsIHk6IG51bWJlciA9IDApIHtcclxuICAgICAgICB0aGlzLnggPSB4XHJcbiAgICAgICAgdGhpcy55ID0geVxyXG4gICAgfVxyXG5cclxuICAgIGFkZChvdGhlcjogVmVjdG9yMmQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnggKz0gb3RoZXIueFxyXG4gICAgICAgIHRoaXMueSArPSBvdGhlci55XHJcbiAgICB9XHJcblxyXG4gICAgZGlzdChvdGhlcjogVmVjdG9yMmQpOiBudW1iZXIge1xyXG4gICAgICAgIGNvbnN0IHhEZWx0YSA9IHRoaXMueCAtIG90aGVyLnhcclxuICAgICAgICBjb25zdCB5RGVsdGEgPSB0aGlzLnkgLSBvdGhlci55XHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyh4RGVsdGEsIDIpICsgTWF0aC5wb3coeURlbHRhLCAyKSlcclxuICAgIH1cclxuXHJcbiAgICBpc0VxdWFsKG90aGVyOiBWZWN0b3IyZCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRpc3Qob3RoZXIpIDwgMWUtMDZcclxuICAgIH1cclxuXHJcbn0iXSwic291cmNlUm9vdCI6IiJ9