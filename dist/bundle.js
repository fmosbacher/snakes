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
                weights[i].push(Math.random() * 2 - 1);
            }
        }
        return weights;
    };
    DenseLayer.prototype.initBiases = function () {
        var biases = [];
        for (var i = 0; i < this.numOutputs; i++) {
            biases.push(Math.random() * 2 - 1);
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
            var layer = offspring.brain[i];
            for (var row = 0; row < layer.weights.length; row++) {
                for (var col = 0; col < layer.weights[row].length; col++) {
                    var chosenSnake = Math.random() < 0.5 ? a : b;
                    var chosenWeight = chosenSnake.brain[i].weights[row][col];
                    layer.weights[row][col] = chosenWeight;
                }
            }
            for (var j = 0; j < layer.biases.length; j++) {
                var chosenSnake = Math.random() < 0.5 ? a : b;
                var chosenBias = chosenSnake.brain[i].biases[j];
                layer.biases[j] = chosenBias;
            }
        }
        return offspring;
    };
    Evolution.prototype.mutate = function (offspring) {
        var adjust = 0.05;
        for (var _i = 0, _a = offspring.brain; _i < _a.length; _i++) {
            var layer = _a[_i];
            for (var row = 0; row < layer.weights.length; row++) {
                for (var col = 0; col < layer.weights[row].length; col++) {
                    if (Math.random() < this.mutationRate) {
                        layer.weights[row][col] += Math.random() * adjust - adjust / 2;
                    }
                }
            }
            for (var j = 0; j < layer.biases.length; j++) {
                if (Math.random() < this.mutationRate) {
                    layer.biases[j] += Math.random() * adjust - adjust / 2;
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
            // pair.snake.crossWalls(this.boardSize)
            pair.snake.checkCollisions(this.boardSize);
            this.feedSnake(pair);
        }
    };
    Game.prototype.getObservation = function (pair) {
        var head = pair.snake.body[0];
        var tail = pair.snake.body.slice(1);
        var foodIsUp = head.y > pair.food.position.y;
        var foodIsRight = head.x < pair.food.position.x;
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
            hasObstacleAbove ? 1 : 0,
            hasObstacleRight ? 1 : 0,
            hasObstacleBelow ? 1 : 0,
            hasObstacleLeft ? 1 : 0
        ];
    };
    Game.prototype.feedSnake = function (pair) {
        var head = pair.snake.body[0];
        if (head.isEqual(pair.food.position)) {
            pair.snake.grow();
            pair.snake.score += 1;
            pair.food = new food_1.default(this.getRandomPosition());
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
var boardSize = 10;
var populationSize = Math.pow(15, 2);
var maxMoves = 700;
var game = new game_1.default(boardSize);
var evolution = new evolution_1.default(game, 0.05);
var canvas = document.querySelector('canvas');
var renderer = new renderer_1.default(game, canvas);
for (var i = 0; i < populationSize; i++) {
    var snakeInitialPos = game.getRandomPosition();
    var foodInitialPos = game.getRandomPosition();
    game.addPair(new snake_1.default(snakeInitialPos, maxMoves), new food_1.default(foodInitialPos));
}
var generation = 1;
var interval;
var evolve = function () {
    clearInterval(interval);
    console.log("Gen " + generation + " best score: " + game.getBestScore());
    evolution.updateGeneration();
    run();
};
var run = function () {
    interval = setInterval(function () {
        renderer.drawGrid();
        renderer.drawSnakes();
        renderer.drawFoods();
        game.runStep();
        if (game.isOver) {
            evolve();
            generation += 1;
        }
    }, 1);
};
run();


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
                    color = '#fafafa';
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
                for (var _i = 0, _a = snakes[i].body; _i < _a.length; _i++) {
                    var part = _a[_i];
                    this.drawRect(xOffset * gridSize + part.x * stepSize, yOffset * gridSize + part.y * stepSize, stepSize, '#0f0');
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
            new dense_layer_1.default(6, 4),
            new dense_layer_1.default(4, 4)
        ];
        this.maxMoves = maxMoves;
        this.remainingMoves = maxMoves;
        this.possibleDirections = [
            new vector2d_1.default(0, -1),
            new vector2d_1.default(1, 0),
            new vector2d_1.default(0, 1),
            new vector2d_1.default(-1, 0)
        ];
    }
    Snake.prototype.predictMove = function (state) {
        var inputs = state;
        var outputs;
        for (var _i = 0, _a = this.brain; _i < _a.length; _i++) {
            var layer = _a[_i];
            outputs = layer.activate(inputs);
            inputs = outputs;
        }
        var dirIndex = outputs.indexOf(Math.max.apply(Math, outputs));
        return this.possibleDirections[dirIndex];
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
    Snake.prototype.crossWalls = function (boardSize) {
        var head = this.body[0];
        if (head.x == -1) {
            head.x = boardSize - 1;
        }
        else if (head.x === boardSize) {
            head.x = 0;
        }
        if (head.y === -1) {
            head.y = boardSize - 1;
        }
        else if (head.y === boardSize) {
            head.y = 0;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RlbnNlLWxheWVyLnRzIiwid2VicGFjazovLy8uL3NyYy9ldm9sdXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Zvb2QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9yZW5kZXJlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc25ha2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZlY3RvcjJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQTtJQU9JLG9CQUFZLFNBQWlCLEVBQUUsVUFBa0I7UUFDN0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTO1FBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcs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QUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELDBCQUFPLEdBQVAsVUFBUSxLQUFlO1FBQ25CLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLO0lBQ25DLENBQUM7SUFFTCxlQUFDO0FBQUQsQ0FBQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIERlbnNlTGF5ZXIge1xyXG5cclxuICAgIG51bUlucHV0czogbnVtYmVyXHJcbiAgICBudW1PdXRwdXRzOiBudW1iZXJcclxuICAgIHdlaWdodHM6IG51bWJlcltdW11cclxuICAgIGJpYXNlczogbnVtYmVyW11cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihudW1JbnB1dHM6IG51bWJlciwgbnVtT3V0cHV0czogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5udW1JbnB1dHMgPSBudW1JbnB1dHNcclxuICAgICAgICB0aGlzLm51bU91dHB1dHMgPSBudW1PdXRwdXRzXHJcbiAgICAgICAgdGhpcy53ZWlnaHRzID0gdGhpcy5pbml0V2VpZ2h0cygpXHJcbiAgICAgICAgdGhpcy5iaWFzZXMgPSB0aGlzLmluaXRCaWFzZXMoKVxyXG4gICAgfVxyXG5cclxuICAgIGluaXRXZWlnaHRzKCk6IG51bWJlcltdW10ge1xyXG4gICAgICAgIGxldCB3ZWlnaHRzID0gW11cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm51bUlucHV0czsgaSsrKSB7XHJcbiAgICAgICAgICAgIHdlaWdodHNbaV0gPSBbXVxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLm51bU91dHB1dHM7IGorKykge1xyXG4gICAgICAgICAgICAgICAgd2VpZ2h0c1tpXS5wdXNoKE1hdGgucmFuZG9tKCkgKiAyIC0gMSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHdlaWdodHNcclxuICAgIH1cclxuXHJcbiAgICBpbml0Qmlhc2VzKCk6IG51bWJlcltdIHtcclxuICAgICAgICBsZXQgYmlhc2VzID0gW11cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm51bU91dHB1dHM7IGkrKykge1xyXG4gICAgICAgICAgICBiaWFzZXMucHVzaChNYXRoLnJhbmRvbSgpICogMiAtIDEpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYmlhc2VzXHJcbiAgICB9XHJcblxyXG4gICAgYWN0aXZhdGUoaW5wdXRzOiBudW1iZXJbXSk6IG51bWJlcltdIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gW11cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm51bU91dHB1dHM7IGkrKykge1xyXG4gICAgICAgICAgICByZXN1bHRbaV0gPSAwXHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGlucHV0cy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0W2ldICs9IGlucHV0c1tqXSAqIHRoaXMud2VpZ2h0c1tqXVtpXVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXN1bHRbaV0gKz0gdGhpcy5iaWFzZXNbaV1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHRcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgR2FtZSBmcm9tICcuL2dhbWUnXHJcbmltcG9ydCBTbmFrZSBmcm9tICcuL3NuYWtlJ1xyXG5pbXBvcnQgRm9vZCBmcm9tICcuL2Zvb2QnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdm9sdXRpb24ge1xyXG5cclxuICAgIGdhbWU6IEdhbWVcclxuICAgIHNlbGVjdGlvblBvb2w6IFNuYWtlW11cclxuICAgIG11dGF0aW9uUmF0ZTogbnVtYmVyXHJcblxyXG4gICAgY29uc3RydWN0b3IoZ2FtZTogR2FtZSwgbXV0YXRpb25SYXRlOiBudW1iZXIgPSAwLjA1KSB7XHJcbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZVxyXG4gICAgICAgIHRoaXMubXV0YXRpb25SYXRlID0gbXV0YXRpb25SYXRlXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlR2VuZXJhdGlvbigpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBwb3B1bGF0aW9uU2l6ZSA9IHRoaXMuZ2FtZS5wYWlycy5sZW5ndGhcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVTZWxlY3Rpb25Qb29sKClcclxuICAgICAgICB0aGlzLmdhbWUuY2xlYXJQb3B1bGF0aW9uKClcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb3B1bGF0aW9uU2l6ZTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudHMgPSB0aGlzLnNlbGVjdCgpXHJcbiAgICAgICAgICAgIGNvbnN0IFthLCBiXSA9IHBhcmVudHNcclxuICAgICAgICAgICAgY29uc3Qgb2Zmc3ByaW5nID0gdGhpcy5jcm9zc292ZXIoYSwgYilcclxuICAgICAgICAgICAgdGhpcy5tdXRhdGUob2Zmc3ByaW5nKVxyXG4gICAgICAgICAgICB0aGlzLmdhbWUuYWRkUGFpcihcclxuICAgICAgICAgICAgICAgIG9mZnNwcmluZyxcclxuICAgICAgICAgICAgICAgIG5ldyBGb29kKHRoaXMuZ2FtZS5nZXRSYW5kb21Qb3NpdGlvbigpKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmdhbWUuaXNPdmVyID0gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVTZWxlY3Rpb25Qb29sKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG1heFNjb3JlcyA9IHRoaXMuZ2FtZS5wYWlyc1xyXG4gICAgICAgICAgICAubWFwKHBhaXIgPT4gcGFpci5zbmFrZS5zY29yZSlcclxuICAgICAgICAgICAgLnJlZHVjZSgoYSwgYikgPT4gYSArIGIpXHJcblxyXG4gICAgICAgIGlmIChtYXhTY29yZXMgPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Qb29sID0gdGhpcy5nYW1lLnBhaXJzXHJcbiAgICAgICAgICAgICAgICAubWFwKHBhaXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluaXRpYWxQb3MgPSB0aGlzLmdhbWUuZ2V0UmFuZG9tUG9zaXRpb24oKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgU25ha2UoaW5pdGlhbFBvcywgcGFpci5zbmFrZS5tYXhNb3ZlcylcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uUG9vbCA9IFtdXHJcblxyXG4gICAgICAgIGNvbnN0IHNuYWtlcyA9IHRoaXMuZ2FtZS5wYWlycy5tYXAocGFpciA9PiBwYWlyLnNuYWtlKVxyXG5cclxuICAgICAgICBmb3IgKGxldCBzbmFrZSBvZiBzbmFrZXMpIHtcclxuICAgICAgICAgICAgY29uc3QgcGFydGljaXBhdGlvbiA9IE1hdGguZmxvb3Ioc25ha2Uuc2NvcmUgLyBtYXhTY29yZXMgKiAxMDAwKVxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJ0aWNpcGF0aW9uOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGluaXRpYWxQb3MgPSB0aGlzLmdhbWUuZ2V0UmFuZG9tUG9zaXRpb24oKVxyXG4gICAgICAgICAgICAgICAgY29uc3Qgc25ha2VSZXNldCA9IG5ldyBTbmFrZShpbml0aWFsUG9zLCBzbmFrZS5tYXhNb3ZlcylcclxuXHJcbiAgICAgICAgICAgICAgICBzbmFrZVJlc2V0LmJyYWluID0gc25ha2UuYnJhaW5cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvblBvb2wucHVzaChzbmFrZVJlc2V0KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdCgpOiBTbmFrZVtdIHtcclxuICAgICAgICBjb25zdCBhSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLnNlbGVjdGlvblBvb2wubGVuZ3RoKVxyXG4gICAgICAgIGNvbnN0IGJJbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuc2VsZWN0aW9uUG9vbC5sZW5ndGgpXHJcblxyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uUG9vbFthSW5kZXhdLFxyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvblBvb2xbYkluZGV4XVxyXG4gICAgICAgIF1cclxuICAgIH1cclxuXHJcbiAgICBjcm9zc292ZXIoYTogU25ha2UsIGI6IFNuYWtlKTogU25ha2Uge1xyXG4gICAgICAgIGNvbnN0IGluaXRpYWxQb3MgPSB0aGlzLmdhbWUuZ2V0UmFuZG9tUG9zaXRpb24oKVxyXG4gICAgICAgIGNvbnN0IG9mZnNwcmluZyA9IG5ldyBTbmFrZShpbml0aWFsUG9zLCBhLm1heE1vdmVzKVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9mZnNwcmluZy5icmFpbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBsYXllciA9IG9mZnNwcmluZy5icmFpbltpXVxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgbGF5ZXIud2VpZ2h0cy5sZW5ndGg7IHJvdysrKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCBsYXllci53ZWlnaHRzW3Jvd10ubGVuZ3RoOyBjb2wrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNob3NlblNuYWtlID0gTWF0aC5yYW5kb20oKSA8IDAuNSA/IGEgOiBiXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hvc2VuV2VpZ2h0ID0gY2hvc2VuU25ha2UuYnJhaW5baV0ud2VpZ2h0c1tyb3ddW2NvbF1cclxuICAgICAgICAgICAgICAgICAgICBsYXllci53ZWlnaHRzW3Jvd11bY29sXSA9IGNob3NlbldlaWdodFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxheWVyLmJpYXNlcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2hvc2VuU25ha2UgPSBNYXRoLnJhbmRvbSgpIDwgMC41ID8gYSA6IGJcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNob3NlbkJpYXMgPSBjaG9zZW5TbmFrZS5icmFpbltpXS5iaWFzZXNbal1cclxuICAgICAgICAgICAgICAgIGxheWVyLmJpYXNlc1tqXSA9IGNob3NlbkJpYXNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG9mZnNwcmluZ1xyXG4gICAgfVxyXG5cclxuICAgIG11dGF0ZShvZmZzcHJpbmc6IFNuYWtlKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgYWRqdXN0ID0gMC4wNVxyXG5cclxuICAgICAgICBmb3IgKGxldCBsYXllciBvZiBvZmZzcHJpbmcuYnJhaW4pIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgbGF5ZXIud2VpZ2h0cy5sZW5ndGg7IHJvdysrKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCBsYXllci53ZWlnaHRzW3Jvd10ubGVuZ3RoOyBjb2wrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgdGhpcy5tdXRhdGlvblJhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXIud2VpZ2h0c1tyb3ddW2NvbF0gKz0gTWF0aC5yYW5kb20oKSAqIGFkanVzdCAtIGFkanVzdCAvIDJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbGF5ZXIuYmlhc2VzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5yYW5kb20oKSA8IHRoaXMubXV0YXRpb25SYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXIuYmlhc2VzW2pdICs9IE1hdGgucmFuZG9tKCkgKiBhZGp1c3QgLSBhZGp1c3QgLyAyXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiIsImltcG9ydCBWZWN0b3IyZCBmcm9tICcuL3ZlY3RvcjJkJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9vZCB7XHJcblxyXG4gICAgcG9zaXRpb246IFZlY3RvcjJkXHJcblxyXG4gICAgY29uc3RydWN0b3IocG9zaXRpb246IFZlY3RvcjJkKSB7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uXHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IEZvb2QgZnJvbSAnLi9mb29kJ1xyXG5pbXBvcnQgVmVjdG9yMmQgZnJvbSAnLi92ZWN0b3IyZCdcclxuaW1wb3J0IFNuYWtlIGZyb20gJy4vc25ha2UnXHJcblxyXG5pbnRlcmZhY2UgUGFpciB7XHJcbiAgICBzbmFrZTogU25ha2UsXHJcbiAgICBmb29kOiBGb29kXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWUge1xyXG5cclxuICAgIGJvYXJkU2l6ZTogbnVtYmVyXHJcblxyXG4gICAgaXNPdmVyOiBib29sZWFuID0gZmFsc2VcclxuICAgIHBhaXJzOiBQYWlyW10gPSBbXVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGJvYXJkU2l6ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5ib2FyZFNpemUgPSBib2FyZFNpemVcclxuICAgIH1cclxuXHJcbiAgICBhZGRQYWlyKHNuYWtlOiBTbmFrZSwgZm9vZDogRm9vZCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucGFpcnMucHVzaCh7XHJcbiAgICAgICAgICAgIHNuYWtlLFxyXG4gICAgICAgICAgICBmb29kXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBnZXRSYW5kb21Qb3NpdGlvbigpOiBWZWN0b3IyZCB7XHJcbiAgICAgICAgY29uc3QgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuYm9hcmRTaXplKVxyXG4gICAgICAgIGNvbnN0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmJvYXJkU2l6ZSlcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjJkKHgsIHkpXHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXJQb3B1bGF0aW9uKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucGFpcnMgPSBbXVxyXG4gICAgfVxyXG5cclxuICAgIGdldEJlc3RTY29yZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLm1heCguLi50aGlzLnBhaXJzLm1hcChwYWlyID0+IHBhaXIuc25ha2Uuc2NvcmUpKVxyXG4gICAgfVxyXG5cclxuICAgIHJ1blN0ZXAoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgYXZhaWxhYmxlUGFpcnMgPSB0aGlzLnBhaXJzLmZpbHRlcihwYWlyID0+IHBhaXIuc25ha2UuaXNBbGl2ZSlcclxuXHJcbiAgICAgICAgaWYgKGF2YWlsYWJsZVBhaXJzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmlzT3ZlciA9IHRydWVcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBwYWlyIG9mIGF2YWlsYWJsZVBhaXJzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5nZXRPYnNlcnZhdGlvbihwYWlyKVxyXG4gICAgICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBwYWlyLnNuYWtlLnByZWRpY3RNb3ZlKHN0YXRlKVxyXG5cclxuICAgICAgICAgICAgcGFpci5zbmFrZS5tb3ZlKGRpcmVjdGlvbilcclxuXHJcbiAgICAgICAgICAgIC8vIHBhaXIuc25ha2UuY3Jvc3NXYWxscyh0aGlzLmJvYXJkU2l6ZSlcclxuICAgICAgICAgICAgcGFpci5zbmFrZS5jaGVja0NvbGxpc2lvbnModGhpcy5ib2FyZFNpemUpXHJcbiAgICAgICAgICAgIHRoaXMuZmVlZFNuYWtlKHBhaXIpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldE9ic2VydmF0aW9uKHBhaXI6IFBhaXIpOiBudW1iZXJbXSB7XHJcbiAgICAgICAgY29uc3QgaGVhZCA9IHBhaXIuc25ha2UuYm9keVswXVxyXG4gICAgICAgIGNvbnN0IHRhaWwgPSBwYWlyLnNuYWtlLmJvZHkuc2xpY2UoMSlcclxuXHJcbiAgICAgICAgY29uc3QgZm9vZElzVXAgPSBoZWFkLnkgPiBwYWlyLmZvb2QucG9zaXRpb24ueVxyXG4gICAgICAgIGNvbnN0IGZvb2RJc1JpZ2h0ID0gaGVhZC54IDwgcGFpci5mb29kLnBvc2l0aW9uLnhcclxuICAgICAgICBsZXQgaGFzT2JzdGFjbGVBYm92ZSA9IGZhbHNlXHJcbiAgICAgICAgbGV0IGhhc09ic3RhY2xlUmlnaHQgPSBmYWxzZVxyXG4gICAgICAgIGxldCBoYXNPYnN0YWNsZUJlbG93ID0gZmFsc2VcclxuICAgICAgICBsZXQgaGFzT2JzdGFjbGVMZWZ0ID0gZmFsc2VcclxuXHJcbiAgICAgICAgLy8gT3duIHRhaWxcclxuICAgICAgICBmb3IgKGxldCBwYXJ0IG9mIHRhaWwpIHtcclxuICAgICAgICAgICAgaWYgKGhlYWQueCA9PT0gcGFydC54KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaGVhZC55ICsgMSA9PT0gcGFydC55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzT2JzdGFjbGVCZWxvdyA9IHRydWVcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaGVhZC55IC0gMSA9PT0gcGFydC55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzT2JzdGFjbGVBYm92ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGhlYWQueSA9PT0gcGFydC55KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaGVhZC54ICsgMSA9PT0gcGFydC54KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzT2JzdGFjbGVSaWdodCA9IHRydWVcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaGVhZC54IC0gMSA9PT0gcGFydC54KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzT2JzdGFjbGVMZWZ0ID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBXYWxsc1xyXG4gICAgICAgIGlmIChoZWFkLnkgLSAxID09PSAtMSkge1xyXG4gICAgICAgICAgICBoYXNPYnN0YWNsZUFib3ZlID0gdHJ1ZVxyXG4gICAgICAgIH0gZWxzZSBpZiAoaGVhZC55ICsgMSA9PT0gdGhpcy5ib2FyZFNpemUpIHtcclxuICAgICAgICAgICAgaGFzT2JzdGFjbGVCZWxvdyA9IHRydWVcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChoZWFkLnggKyAxID09PSB0aGlzLmJvYXJkU2l6ZSkge1xyXG4gICAgICAgICAgICBoYXNPYnN0YWNsZVJpZ2h0ID0gdHJ1ZVxyXG4gICAgICAgIH0gZWxzZSBpZiAoaGVhZC54IC0gMSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgaGFzT2JzdGFjbGVMZWZ0ID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgZm9vZElzVXAgPyAxIDogMCxcclxuICAgICAgICAgICAgZm9vZElzUmlnaHQgPyAxIDogMCxcclxuICAgICAgICAgICAgaGFzT2JzdGFjbGVBYm92ZSA/IDEgOiAwLFxyXG4gICAgICAgICAgICBoYXNPYnN0YWNsZVJpZ2h0ID8gMSA6IDAsXHJcbiAgICAgICAgICAgIGhhc09ic3RhY2xlQmVsb3cgPyAxIDogMCxcclxuICAgICAgICAgICAgaGFzT2JzdGFjbGVMZWZ0ID8gMSA6IDBcclxuICAgICAgICBdXHJcbiAgICB9XHJcblxyXG4gICAgZmVlZFNuYWtlKHBhaXI6IFBhaXIpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBoZWFkID0gcGFpci5zbmFrZS5ib2R5WzBdXHJcblxyXG4gICAgICAgIGlmIChoZWFkLmlzRXF1YWwocGFpci5mb29kLnBvc2l0aW9uKSkge1xyXG4gICAgICAgICAgICBwYWlyLnNuYWtlLmdyb3coKVxyXG4gICAgICAgICAgICBwYWlyLnNuYWtlLnNjb3JlICs9IDFcclxuICAgICAgICAgICAgcGFpci5mb29kID0gbmV3IEZvb2QodGhpcy5nZXRSYW5kb21Qb3NpdGlvbigpKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgR2FtZSBmcm9tICcuL2dhbWUnXHJcbmltcG9ydCBTbmFrZSBmcm9tICcuL3NuYWtlJ1xyXG5pbXBvcnQgRm9vZCBmcm9tICcuL2Zvb2QnXHJcbmltcG9ydCBFdm9sdXRpb24gZnJvbSAnLi9ldm9sdXRpb24nXHJcbmltcG9ydCBSZW5kZXJlciBmcm9tICcuL3JlbmRlcmVyJ1xyXG5cclxuY29uc3QgYm9hcmRTaXplID0gMTBcclxuY29uc3QgcG9wdWxhdGlvblNpemUgPSBNYXRoLnBvdygxNSwgMilcclxuY29uc3QgbWF4TW92ZXMgPSA3MDBcclxuXHJcbmNvbnN0IGdhbWUgPSBuZXcgR2FtZShib2FyZFNpemUpXHJcbmNvbnN0IGV2b2x1dGlvbiA9IG5ldyBFdm9sdXRpb24oZ2FtZSwgMC4wNSlcclxuXHJcbmNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2NhbnZhcycpXHJcbmNvbnN0IHJlbmRlcmVyID0gbmV3IFJlbmRlcmVyKGdhbWUsIGNhbnZhcylcclxuXHJcbmZvciAobGV0IGkgPSAwOyBpIDwgcG9wdWxhdGlvblNpemU7IGkrKykge1xyXG4gICAgY29uc3Qgc25ha2VJbml0aWFsUG9zID0gZ2FtZS5nZXRSYW5kb21Qb3NpdGlvbigpXHJcbiAgICBjb25zdCBmb29kSW5pdGlhbFBvcyA9IGdhbWUuZ2V0UmFuZG9tUG9zaXRpb24oKVxyXG4gICAgZ2FtZS5hZGRQYWlyKG5ldyBTbmFrZShzbmFrZUluaXRpYWxQb3MsIG1heE1vdmVzKSwgbmV3IEZvb2QoZm9vZEluaXRpYWxQb3MpKVxyXG59XHJcblxyXG5sZXQgZ2VuZXJhdGlvbiA9IDFcclxubGV0IGludGVydmFsOiBudW1iZXJcclxuXHJcbmNvbnN0IGV2b2x2ZSA9ICgpOiB2b2lkID0+IHtcclxuICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpXHJcbiAgICBjb25zb2xlLmxvZyhgR2VuICR7Z2VuZXJhdGlvbn0gYmVzdCBzY29yZTogJHtnYW1lLmdldEJlc3RTY29yZSgpfWApXHJcbiAgICBldm9sdXRpb24udXBkYXRlR2VuZXJhdGlvbigpXHJcbiAgICBydW4oKVxyXG59XHJcblxyXG5jb25zdCBydW4gPSAoKTogdm9pZCA9PiB7XHJcbiAgICBpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICByZW5kZXJlci5kcmF3R3JpZCgpXHJcbiAgICAgICAgcmVuZGVyZXIuZHJhd1NuYWtlcygpXHJcbiAgICAgICAgcmVuZGVyZXIuZHJhd0Zvb2RzKClcclxuXHJcbiAgICAgICAgZ2FtZS5ydW5TdGVwKClcclxuXHJcbiAgICAgICAgaWYgKGdhbWUuaXNPdmVyKSB7XHJcbiAgICAgICAgICAgIGV2b2x2ZSgpXHJcbiAgICAgICAgICAgIGdlbmVyYXRpb24gKz0gMVxyXG4gICAgICAgIH1cclxuICAgIH0sIDEpXHJcbn1cclxuXHJcbnJ1bigpXHJcbiIsImltcG9ydCBHYW1lIGZyb20gJy4vZ2FtZSdcclxuXHJcbnR5cGUgU2NyZWVuID0ge1xyXG4gICAgd2lkdGg6IG51bWJlcixcclxuICAgIGhlaWdodDogbnVtYmVyXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbmRlcmVyIHtcclxuXHJcbiAgICBnYW1lOiBHYW1lXHJcbiAgICBzY3JlZW46IFNjcmVlblxyXG4gICAgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkRcclxuICAgIHN0ZXBTaXplOiBudW1iZXJcclxuICAgIGdyaWRTaXplOiBudW1iZXJcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lOiBHYW1lLCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KSB7XHJcbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZVxyXG4gICAgICAgIHRoaXMuY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJylcclxuICAgICAgICB0aGlzLnNjcmVlbiA9IHtcclxuICAgICAgICAgICAgd2lkdGg6IGNhbnZhcy53aWR0aCxcclxuICAgICAgICAgICAgaGVpZ2h0OiBjYW52YXMuaGVpZ2h0XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRyYXdHcmlkKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG51bVJvd3MgPSBNYXRoLmNlaWwoTWF0aC5zcXJ0KHRoaXMuZ2FtZS5wYWlycy5sZW5ndGgpKVxyXG4gICAgICAgIGNvbnN0IG51bUNvbHMgPSBudW1Sb3dzXHJcbiAgICAgICAgY29uc3QgZ3JpZFNpemUgPSB0aGlzLnNjcmVlbi53aWR0aCAvIG51bVJvd3NcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1Sb3dzOyBpKyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBudW1Db2xzOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBjb2xvclxyXG5cclxuICAgICAgICAgICAgICAgIGlmICgoaSArIGopICUgMikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yID0gJyNmZmYnXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yID0gJyNmYWZhZmEnXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3UmVjdChpICogZ3JpZFNpemUsIGogKiBncmlkU2l6ZSwgZ3JpZFNpemUsIGNvbG9yKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRyYXdTbmFrZXMoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgc25ha2VzID0gdGhpcy5nYW1lLnBhaXJzLm1hcChwYWlyID0+IHBhaXIuc25ha2UpXHJcbiAgICAgICAgY29uc3QgbnVtQ29scyA9IE1hdGguY2VpbChNYXRoLnNxcnQodGhpcy5nYW1lLnBhaXJzLmxlbmd0aCkpXHJcbiAgICAgICAgY29uc3QgZ3JpZFNpemUgPSB0aGlzLnNjcmVlbi53aWR0aCAvIG51bUNvbHNcclxuICAgICAgICBjb25zdCBzdGVwU2l6ZSA9IGdyaWRTaXplIC8gdGhpcy5nYW1lLmJvYXJkU2l6ZVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNuYWtlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoc25ha2VzW2ldLmlzQWxpdmUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHhPZmZzZXQgPSBpICUgbnVtQ29sc1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeU9mZnNldCA9IE1hdGguZmxvb3IoaSAvIG51bUNvbHMpXHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcGFydCBvZiBzbmFrZXNbaV0uYm9keSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1JlY3QoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHhPZmZzZXQgKiBncmlkU2l6ZSArIHBhcnQueCAqIHN0ZXBTaXplLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB5T2Zmc2V0ICogZ3JpZFNpemUgKyBwYXJ0LnkgKiBzdGVwU2l6ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RlcFNpemUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcjMGYwJ1xyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkcmF3Rm9vZHMoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgZm9vZHMgPSB0aGlzLmdhbWUucGFpcnMubWFwKHBhaXIgPT4gcGFpci5mb29kKVxyXG4gICAgICAgIGNvbnN0IG51bUNvbHMgPSBNYXRoLmNlaWwoTWF0aC5zcXJ0KHRoaXMuZ2FtZS5wYWlycy5sZW5ndGgpKVxyXG4gICAgICAgIGNvbnN0IGdyaWRTaXplID0gdGhpcy5zY3JlZW4ud2lkdGggLyBudW1Db2xzXHJcbiAgICAgICAgY29uc3Qgc3RlcFNpemUgPSBncmlkU2l6ZSAvIHRoaXMuZ2FtZS5ib2FyZFNpemVcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmb29kcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lLnBhaXJzW2ldLnNuYWtlLmlzQWxpdmUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHhPZmZzZXQgPSBpICUgbnVtQ29sc1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeU9mZnNldCA9IE1hdGguZmxvb3IoaSAvIG51bUNvbHMpXHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3UmVjdChcclxuICAgICAgICAgICAgICAgICAgICB4T2Zmc2V0ICogZ3JpZFNpemUgKyBmb29kc1tpXS5wb3NpdGlvbi54ICogc3RlcFNpemUsXHJcbiAgICAgICAgICAgICAgICAgICAgeU9mZnNldCAqIGdyaWRTaXplICsgZm9vZHNbaV0ucG9zaXRpb24ueSAqIHN0ZXBTaXplLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0ZXBTaXplLFxyXG4gICAgICAgICAgICAgICAgICAgICcjZjAwJ1xyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRyYXdSZWN0KHg6IG51bWJlciwgeTogbnVtYmVyLCBzaXplOiBudW1iZXIsIGNvbG9yOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBjb2xvclxyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KFxyXG4gICAgICAgICAgICB4LFxyXG4gICAgICAgICAgICB5LFxyXG4gICAgICAgICAgICBzaXplLFxyXG4gICAgICAgICAgICBzaXplXHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCBWZWN0b3IyZCBmcm9tICcuL3ZlY3RvcjJkJ1xyXG5pbXBvcnQgRGVuc2VMYXllciBmcm9tICcuL2RlbnNlLWxheWVyJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU25ha2Uge1xyXG5cclxuICAgIGJvZHk6IFZlY3RvcjJkW11cclxuICAgIGJyYWluOiBEZW5zZUxheWVyW11cclxuICAgIG1heE1vdmVzOiBudW1iZXJcclxuICAgIHJlbWFpbmluZ01vdmVzOiBudW1iZXJcclxuICAgIHBvc3NpYmxlRGlyZWN0aW9uczogVmVjdG9yMmRbXVxyXG5cclxuICAgIHNjb3JlOiBudW1iZXIgPSAwXHJcbiAgICBpc0FsaXZlOiBib29sZWFuID0gdHJ1ZVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGluaXRpYWxQb3M6IFZlY3RvcjJkLCBtYXhNb3ZlczogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5ib2R5ID0gW2luaXRpYWxQb3NdXHJcbiAgICAgICAgdGhpcy5icmFpbiA9IFtcclxuICAgICAgICAgICAgbmV3IERlbnNlTGF5ZXIoNiwgNCksXHJcbiAgICAgICAgICAgIG5ldyBEZW5zZUxheWVyKDQsIDQpXHJcbiAgICAgICAgXVxyXG4gICAgICAgIHRoaXMubWF4TW92ZXMgPSBtYXhNb3Zlc1xyXG4gICAgICAgIHRoaXMucmVtYWluaW5nTW92ZXMgPSBtYXhNb3Zlc1xyXG4gICAgICAgIHRoaXMucG9zc2libGVEaXJlY3Rpb25zID0gW1xyXG4gICAgICAgICAgICBuZXcgVmVjdG9yMmQoMCwgLTEpLFxyXG4gICAgICAgICAgICBuZXcgVmVjdG9yMmQoMSwgMCksXHJcbiAgICAgICAgICAgIG5ldyBWZWN0b3IyZCgwLCAxKSxcclxuICAgICAgICAgICAgbmV3IFZlY3RvcjJkKC0xLCAwKVxyXG4gICAgICAgIF1cclxuICAgIH1cclxuXHJcbiAgICBwcmVkaWN0TW92ZShzdGF0ZTogbnVtYmVyW10pOiBWZWN0b3IyZCB7XHJcbiAgICAgICAgbGV0IGlucHV0cyA9IHN0YXRlXHJcbiAgICAgICAgbGV0IG91dHB1dHNcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBsYXllciBvZiB0aGlzLmJyYWluKSB7XHJcbiAgICAgICAgICAgIG91dHB1dHMgPSBsYXllci5hY3RpdmF0ZShpbnB1dHMpXHJcbiAgICAgICAgICAgIGlucHV0cyA9IG91dHB1dHNcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGRpckluZGV4ID0gb3V0cHV0cy5pbmRleE9mKE1hdGgubWF4KC4uLm91dHB1dHMpKVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5wb3NzaWJsZURpcmVjdGlvbnNbZGlySW5kZXhdXHJcbiAgICB9XHJcblxyXG4gICAgbW92ZShkaXJlY3Rpb246IFZlY3RvcjJkKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgaGVhZCA9IHRoaXMuYm9keVswXVxyXG4gICAgICAgIGNvbnN0IG5leHRIZWFkID0gbmV3IFZlY3RvcjJkKGhlYWQueCwgaGVhZC55KVxyXG4gICAgICAgIG5leHRIZWFkLmFkZChkaXJlY3Rpb24pXHJcbiAgICAgICAgY29uc3QgdGFpbFdpdGhvdXRMYXN0ID0gdGhpcy5ib2R5LnNsaWNlKDAsIC0xKVxyXG5cclxuICAgICAgICB0aGlzLmJvZHkgPSBbbmV4dEhlYWRdLmNvbmNhdCh0YWlsV2l0aG91dExhc3QpXHJcbiAgICAgICAgdGhpcy5yZW1haW5pbmdNb3ZlcyAtPSAxXHJcblxyXG4gICAgICAgIGlmICh0aGlzLnJlbWFpbmluZ01vdmVzIDwgMCkge1xyXG4gICAgICAgICAgICB0aGlzLmlzQWxpdmUgPSBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjcm9zc1dhbGxzKGJvYXJkU2l6ZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGhlYWQgPSB0aGlzLmJvZHlbMF1cclxuXHJcbiAgICAgICAgaWYgKGhlYWQueCA9PSAtMSkge1xyXG4gICAgICAgICAgICBoZWFkLnggPSBib2FyZFNpemUgLSAxXHJcbiAgICAgICAgfSBlbHNlIGlmIChoZWFkLnggPT09IGJvYXJkU2l6ZSkge1xyXG4gICAgICAgICAgICBoZWFkLnggPSAwXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaGVhZC55ID09PSAtMSkge1xyXG4gICAgICAgICAgICBoZWFkLnkgPSBib2FyZFNpemUgLSAxXHJcbiAgICAgICAgfSBlbHNlIGlmIChoZWFkLnkgPT09IGJvYXJkU2l6ZSkge1xyXG4gICAgICAgICAgICBoZWFkLnkgPSAwXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrQ29sbGlzaW9ucyhib2FyZFNpemU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGhlYWQgPSB0aGlzLmJvZHlbMF1cclxuICAgICAgICBjb25zdCB0YWlsID0gdGhpcy5ib2R5LnNsaWNlKDEpXHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgcGFydCBvZiB0YWlsKSB7XHJcbiAgICAgICAgICAgIGlmIChoZWFkLmlzRXF1YWwocGFydCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNBbGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChoZWFkLnggPj0gYm9hcmRTaXplIHx8IGhlYWQueCA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy5pc0FsaXZlID0gZmFsc2VcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChoZWFkLnkgPj0gYm9hcmRTaXplIHx8IGhlYWQueSA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy5pc0FsaXZlID0gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ3JvdygpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBsYXN0UGFydCA9IHRoaXMuYm9keVt0aGlzLmJvZHkubGVuZ3RoIC0gMV1cclxuICAgICAgICBjb25zdCBuZXdCb2R5UGFydCA9IG5ldyBWZWN0b3IyZChcclxuICAgICAgICAgICAgbGFzdFBhcnQueCxcclxuICAgICAgICAgICAgbGFzdFBhcnQueVxyXG4gICAgICAgIClcclxuICAgICAgICB0aGlzLmJvZHkucHVzaChuZXdCb2R5UGFydClcclxuICAgIH1cclxuXHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBWZWN0b3IyZCB7XHJcblxyXG4gICAgeDogbnVtYmVyXHJcbiAgICB5OiBudW1iZXJcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIgPSAwLCB5OiBudW1iZXIgPSAwKSB7XHJcbiAgICAgICAgdGhpcy54ID0geFxyXG4gICAgICAgIHRoaXMueSA9IHlcclxuICAgIH1cclxuXHJcbiAgICBhZGQob3RoZXI6IFZlY3RvcjJkKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy54ICs9IG90aGVyLnhcclxuICAgICAgICB0aGlzLnkgKz0gb3RoZXIueVxyXG4gICAgfVxyXG5cclxuICAgIGRpc3Qob3RoZXI6IFZlY3RvcjJkKTogbnVtYmVyIHtcclxuICAgICAgICBjb25zdCB4RGVsdGEgPSB0aGlzLnggLSBvdGhlci54XHJcbiAgICAgICAgY29uc3QgeURlbHRhID0gdGhpcy55IC0gb3RoZXIueVxyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoTWF0aC5wb3coeERlbHRhLCAyKSArIE1hdGgucG93KHlEZWx0YSwgMikpXHJcbiAgICB9XHJcblxyXG4gICAgaXNFcXVhbChvdGhlcjogVmVjdG9yMmQpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kaXN0KG90aGVyKSA8IDFlLTA2XHJcbiAgICB9XHJcblxyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==