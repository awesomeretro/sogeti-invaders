/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
    var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

    // The base Class implementation (does nothing)
    this.Class = function(){};

    // Create a new Class that inherits from this class
    Class.extend = function(prop) {
        var _super = this.prototype;

        // Instantiate a base class (but only create the instance,
        // don't run the init constructor)
        initializing = true;
        var prototype = new this();
        initializing = false;

        // Copy the properties over onto the new prototype
        for (var name in prop) {
            // Check if we're overwriting an existing function
            prototype[name] = typeof prop[name] == "function" &&
            typeof _super[name] == "function" && fnTest.test(prop[name]) ?
                (function(name, fn){
                    return function() {
                        var tmp = this._super;

                        // Add a new ._super() method that is the same method
                        // but on the super-class
                        this._super = _super[name];

                        // The method only need to be bound temporarily, so we
                        // remove it when we're done executing
                        var ret = fn.apply(this, arguments);
                        this._super = tmp;

                        return ret;
                    };
                })(name, prop[name]) :
                prop[name];
        }

        // The dummy class constructor
        function Class() {
            // All construction is actually done in the init method
            if ( !initializing && this.init )
                this.init.apply(this, arguments);
        }

        // Populate our constructed prototype object
        Class.prototype = prototype;

        // Enforce the constructor to be what we expect
        Class.prototype.constructor = Class;

        // And make this class extendable
        Class.extend = arguments.callee;

        return Class;
    };
})();


// ###################################################################
// shims
//
// ###################################################################
(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

(function() {
    if (!window.performance.now) {
        window.performance.now = (!Date.now) ? function() { return new Date().getTime(); } :
            function() { return Date.now(); }
    }
})();

// ###################################################################
// Constants
//
// ###################################################################
var IS_CHROME = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
var CANVAS_WIDTH = 800;
var CANVAS_HEIGHT = 600;
//var SPRITE_SHEET_SRC = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAEACAYAAAADRnAGAAACGUlEQVR42u3aSQ7CMBAEQIsn8P+/hiviAAK8zFIt5QbELiTHmfEYE3L9mZE9AAAAqAVwBQ8AAAD6THY5CgAAAKbfbPX3AQAAYBEEAADAuZrC6UUyfMEEAIBiAN8OePXnAQAAsLcmmKFPAQAAgHMbm+gbr3Sdo/LtcAAAANR6GywPAgBAM4D2JXAAABoBzBjA7AmlOx8AAEAzAOcDAADovTc4vQim6wUCABAYQG8QAADd4dPd2fRVYQAAANQG0B4HAABAawDnAwAA6AXgfAAAALpA2uMAAABwPgAAgPoAM9Ci/R4AAAD2dmqcEQIAIC/AiQGuAAYAAECcRS/a/cJXkUf2AAAAoBaA3iAAALrD+gIAAADY9baX/nwAAADNADwFAADo9YK0e5FMX/UFACA5QPSNEAAAAHKtCekmDAAAAADvBljtfgAAAGgMMGOrunvCy2uCAAAACFU6BwAAwF6AGQPa/XsAAADYB+B8AAAAtU+ItD4OAwAAAFVhAACaA0T7B44/BQAAANALwGMQAAAAADYO8If2+P31AgAAQN0SWbhFDwCAZlXgaO1xAAAA1FngnA8AACAeQPSNEAAAAM4CnC64AAAA4GzN4N9NSfgKEAAAAACszO26X8/X6BYAAAD0Anid8KcLAAAAAAAAAJBnwNEvAAAA9Jns1ygAAAAAAAAAAAAAAAAAAABAQ4COCENERERERERERBrnAa1sJuUVr3rsAAAAAElFTkSuQmCC';
//var SPRITE_SHEET_SRC = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAEACAYAAAADRnAGAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AQNFxQo3wgFZQAAAtdJREFUeNrt3VtSwzAQRFGJygqy/zVmCYhvkhSO9RgJ6/Qv2Di33O2ZsYhy6qBSUmk5PueU0yR9pc0FAACbK48IteEX3TE0WQCA3TNgdb+PzgUWAGBz3Ub47ShXWo93BwAAgDpAHcACAIybBxxp9HM+ckjKAgDIgP6eH/377gAAAIjtBWa+vPx0PqAXYAEA6gDM9vfMWUB9M5TK0CFKTlkzBAAAACzUDQ4OvZmhyAIAyID1PB+ZCSwAwO4ZUOP3Zw+2ZkaP89XmAgsAIAPKNVaIyAAWACCsF5hdB+gFWACA2Dog8kVFTSapA1gAgL51QGtd0Nvj3guwAAAATA3BmsKkZ3PkDgAAAACWrgTHX6RKkAUAiMwAK0RYAIB9MsAKERYAQAZco6CRASwAwKh5wFGv0PvNkKEoCwCw9jzAKjEWAGCvXqC3R0dkjF6ABQCoAzB7FejMWUB1M/QSanaZkQEAAHCpbtAuMywAwD7doG+XZwEAdpZdZlgAAHWAOoAFADAPSD2fy72f83aYYAEAYjNg9k5SkbvOsAAAMqC9Dmj1pJ2mWAAAAJYOwVSelqnlwctqAv8eCwAAwO4hWN6swz0Knd4hdfZ8NdfsDgAAgHe6VXn07M8VQiwAwP+qAw6PevJkawb0OJ86gAUAiMuAJT+JDGABAKoyIKK2X8Tv7gAAAPgwAyb25+YBLADAgnVAnvwdAwOvhwUAAEAIKoRYAAAAhODUkDp5vlLK/eWD5PxwBwAAQFAhFH6VCiEWACA0A448P3uFiIkQCwDQLwOsEGEBAHbWLeQ539vfHa+HBQCQAWv159GZwwIAmAcM8GjNf35GZow7AAAAAGgKwVbq5f4rBL/zwy4zAAAAwHVD8Dn0jhQZiiwAAAAAAACAOqDtub26/qorWACA3TPgan4/mwssAAAAAAAAAAAAAAAAAAAAAMCO84CUrjcD/HQWQEREREREREREO+oHqKIhzFD4x3oAAAAASUVORK5CYII='; // unbranded
//var PLAYER_COLOUR = "green";
//var SPRITE_SHEET_SRC = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAEACAYAAAADRnAGAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AQPBB4dxz38bgAAAyVJREFUeNrt3UF61DAQhFELhgtw/zNygfAhNrDAk8RjuVsS1uttMo7zu6rcLStx2QKq1q1e+XwpW9kG1Zdt8QIAgMWrZIRa+kkHhiYLALB6Bszu9+xcYAEAFq9Hht+OcuXq5ykAAAD0AfoAFgAgbz3gqLLv8z0XSVkAABkQ7/ns76cAAADoOwuMfHj56vqAWYAFAGgDMNrfI9cC2oehraYuopStGIYAAACAiabB5NAbGYosAIAMmM/zPTOBBQBYPQNa/L734NXMiDheay6wAAAyoN5jh4gMYAEAus0Co/sAswALANC3D+j5oKIlk/QBLABAbB9wtS+I9rjnAiwAAABDQ7ClMYkcjigAAAAAmLoTzD9JnSALANAzA+wQYQEA1skAO0RYAAAZcI+GRgawAABZ6wFHs0L0kyGLoiwAwNzrAXaJsQAAa80C0R7NyBizAAsA0AZg9C7QkWsBzcPQU6h5y4wMAACAW02D3jLDAgCsMw367/IsAMDK5S0zLACAPkAfwAIAWA/YIu/L0fd5b5hgAQD6ZsDoN0n1fOsMCwAgA673AVc96U1TLAAAAFOH4FZ329RK8raajj+PBQAAYPUQrO/swz0KneiQOnu8lnOmAAAAeK8eTR49+3WNEAsA8H/1AYef2nnyagZEHE8fwAIA9MuAKX8TGcACADRlQI/efhK/UwAAALyYAQPnc+sBLADAhH1AGfw/BhLPhwUAAEAIaoRYAAAAhODQkDp5vFrr96dfpJQfFAAAAJ0aoe5nqRFiAQC6ZsCR50fvELEixAIAxGWAHSIsAMDK9ehyn4/2d+D5sAAAMmCu+bx35rAAANYDEjza8pefPTOGAgAAAIC/cfOrvo35wY9v/wRh/flWKGAFBeyv/NMdsrMSKCBTAUdX+6WeK1kRFNCigIgrmzJFN6iFAj5SwKxXOVoZFLBXwJ2u/CtKMAyxwB8L3Fn6n9mBAurXrcoAAAAAAAAAANAJ6gSNw8ZhCohQwp50y7EijvHZlacAAA4scMYWH0ks+8nQ2fOhgKsKuKqULCXIgNEKGNU8RahieQUopZRSSimllFJqvfoNTPt6YBMPEqYAAAAASUVORK5CYII='; // branded
//var PLAYER_COLOUR = "red";
var SPRITE_SHEET_SRC = 'sprites.png';
var SPRITE_SCALE = 2; // scaling factor (sprites get magnified this many times)

var PLAYER_COLOUR = "green"; // for the player explosion
var SOGETI_LOGO = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAACEAQMAAAB2y8fiAAAABlBMVEX/AwD+//sAEuDvAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AQNFzoiNNrlVwAAAQhJREFUaN7t2W0KgzAMBuCCB8iRcvUeqQcIONtoja64TSY18ubHWMt4KixNPwwB8YgYxnYILFiwulqBYD3AiiEwLO+WtJqwfFmbLrIW/+DC6mrJQSflYUSHTJUuJSBpIYjro8DqajX+XdpYU0zQMBXx3GTRZuLcpJj7YfW3YmuacrU0FaR81x+rVUeCdQsrteutrdE7q6QIw3Jlab1+s7QiwPJj5bRIxiqz/WROwOplUdSZbHKCz9ZoWFdan9badZO03zPBupV1uPed11p7hlmukNJ81Pn6DAPrWkuWU0r9HE7fDcHqZ41l0sqaIjzCcmmZaz76x70vrF6W2TnBcmzhvbtzC/GIeAFQw5FhLhmErgAAAABJRU5ErkJggg==";
var LEFT_KEY = 37;
var RIGHT_KEY = 39;
var SHOOT_KEY = 88;


var ACTORS = {
    "ALIEN_SMALL": {
        "SCORE_VALUE": 30,
        "COLOUR": "magenta",
        "CLIPRECTS": [{x:0, y:32, w:8, h:8}, {x:8, y:32, w:8, h:8}]
    },
    "ALIEN_MEDIUM": {
        "SCORE_VALUE": 20,
        "COLOUR": "cyan",
        "CLIPRECTS": [{x:0, y:0, w:11, h:8}, {x:0, y:8, w:11, h:8}]
    },
    "ALIEN_LARGE": {
        "SCORE_VALUE": 10,
        "COLOUR": "yellow",
        "CLIPRECTS": [{x:0, y:16, w:12, h:8}, {x:0, y:24, w:12, h:8}]
    },
    "ALIEN_UFO": {
        "SCORE_VALUE": function() {
            return getRandomInt(1,3) * 50; // either 50, 100, or 150 points
        }, // function
        "COLOUR": "red",
        "CLIPRECTS": [{x:0, y:56, w:16, h:7}, {x:0, y:63, w:16, h:7}, {x:0, y:70, w:16, h:7}]
    },
    "PLAYER": {
        "COLOUR": "green",
        "CLIPRECTS": [{x:0, y:40, w:13, h:8}, {x:0, y:48, w:13, h:8}]
    }
} // var


var TEXT_BLINK_FREQ = 500;
var ALIEN_X_MARGIN = 40;
var ALIEN_Y_TOP = 42;
var ALIEN_SQUAD_WIDTH = 12 * ALIEN_X_MARGIN;
var TIME_TO_WAIT_FOR_SCANNER_TO_FINISH = 5000;

// difficulty settings:
var INIT_PLAYER_LIVES = 3;
var INVADERS_TRIGGERHAPPY = 5; // higher is more bombs
var INVADERS_SPEEDUP_FACTOR = 1.5;


// MACHINE STATES:
var STATE_INIT = 0;
var STATE_ATTRACT = 11;
var STATE_SCANNING = 12;
var STATE_GET_READY = 21;
var STATE_GET_READY_WAVE = 22;
var STATE_PLAYER_FATALLY_HIT = 31;
var STATE_RIGHT_AFTER_DEATH = 32;
var STATE_AFTER_DEATH = 33;
var STATE_GET_PLAYING = 41;
var STATE_PLAYING = 42;

var g_nCurrentState = STATE_INIT;


// ###################################################################
// Utility functions & classes
//
// ###################################################################
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}

function valueInRange(value, min, max) {
    return (value <= max) && (value >= min);
}

function checkRectCollision(A, B) {
    var xOverlap = valueInRange(A.x, B.x, B.x + B.w) ||
        valueInRange(B.x, A.x, A.x + A.w);

    var yOverlap = valueInRange(A.y, B.y, B.y + B.h) ||
        valueInRange(B.y, A.y, A.y + A.h);
    return xOverlap && yOverlap;
}

var Point2D = Class.extend({
    init: function(x, y) {
        this.x = (typeof x === 'undefined') ? 0 : x;
        this.y = (typeof y === 'undefined') ? 0 : y;
    },

    set: function(x, y) {
        this.x = x;
        this.y = y;
    }
});

var Rect = Class.extend({
    init: function(x, y, w, h) {
        this.x = (typeof x === 'undefined') ? 0 : x;
        this.y = (typeof y === 'undefined') ? 0 : y;
        this.w = (typeof w === 'undefined') ? 0 : w;
        this.h = (typeof h === 'undefined') ? 0 : h;
    },

    set: function(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
});

function getClipRects(p_actorType)
{
    return ACTORS[p_actorType].CLIPRECTS;
} // function


// ###################################################################
// Globals
//
// ###################################################################
var canvas = null;
var ctx = null;
var spriteSheetImg = null;
var bulletImg = null;
var keyStates = null;
var prevKeyStates = null;
var lastTime = 0;
var player = null;
var aliens = [];
var particleManager = null;
var updateAlienLogic = false;
var alienDirection = -1;
var alienYDown = 0;
var alienCount = 0;
var wave = 1;
var nPlayerDiedTime = 0;
var g_nPauseGameUntilTime = 0;

var nHighScore = localStorage.getItem("highscore") * 1;
var nOldHighScore = nHighScore;

var sndInvaderStep1 = new Audio("sounds/invader-step1.wav");
var sndInvaderStep2 = new Audio("sounds/invader-step2.wav");
var sndInvaderStep3 = new Audio("sounds/invader-step3.wav");
var sndInvaderStep4 = new Audio("sounds/invader-step4.wav");

var sndInvaderKilled = new Audio("sounds/invader-killed.wav");
var sndPlayerHit = new Audio("sounds/player-explosion.wav");
var sndShoot = new Audio("sounds/shoot.wav");

var sndAttract = new Audio("sounds/attract.mpeg");


// ###################################################################
// Entities
//
// ###################################################################
var BaseSprite = Class.extend({
    init: function(img, x, y) {
        this.img = img;
        this.position = new Point2D(x, y);
        this.scale = new Point2D(1, 1);
        this.bounds = new Rect(x, y, this.img.width, this.img.height);
        this.doLogic = true;
    },

    update: function(dt) { },

    _updateBounds: function() {
        this.bounds.set(this.position.x, this.position.y, ~~(0.5 + this.img.width * this.scale.x), ~~(0.5 + this.img.height * this.scale.y));
    },

    _drawImage: function() {
        ctx.drawImage(this.img, this.position.x, this.position.y);
    },

    draw: function(resized) {
        this._updateBounds();

        this._drawImage();
    }
});

var SheetSprite = BaseSprite.extend({
    init: function(sheetImg, clipRect, x, y) {
        this._super(sheetImg, x, y);
        this.clipRect = clipRect;
        this.bounds.set(x, y, this.clipRect.w, this.clipRect.h);
    },

    getExplosionColour: function() {
        return ACTORS[this.type].COLOUR;
    },

    update: function(dt) {},

    _updateBounds: function() {
        var w = ~~(0.5 + this.clipRect.w * this.scale.x);
        var h = ~~(0.5 + this.clipRect.h * this.scale.y);
        this.bounds.set(this.position.x - w/2, this.position.y - h/2, w, h);
    },

    _drawImage: function() {
        ctx.save();
        ctx.transform(this.scale.x, 0, 0, this.scale.y, this.position.x, this.position.y);
        ctx.drawImage(this.img, this.clipRect.x, this.clipRect.y, this.clipRect.w, this.clipRect.h, ~~(0.5 + -this.clipRect.w*0.5), ~~(0.5 + -this.clipRect.h*0.5), this.clipRect.w, this.clipRect.h);
        ctx.restore();

    },

    draw: function(resized) {
        this._super(resized);
    }
});

var Player = SheetSprite.extend({
    init: function() {
        this._super(spriteSheetImg, getClipRects("PLAYER")[0], CANVAS_WIDTH/2, CANVAS_HEIGHT - 70);
        this.scale.set(SPRITE_SCALE, SPRITE_SCALE);
        this.lives = INIT_PLAYER_LIVES;
        this.xVel = 0;
        this.bullets = [];
        this.bulletDelayAccumulator = 0;
        this.score = 0;
        this.type = "PLAYER";
    },

    reset: function() {
        this.lives = INIT_PLAYER_LIVES;
        this.score = 0;
        this.position.set(CANVAS_WIDTH/2, CANVAS_HEIGHT - 70);
    },

    shoot: function() {
        var bullet = new Bullet(this.position.x, this.position.y - this.bounds.h / 2, 1, 1000);
        this.bullets.push(bullet);
        sndShoot.play();
    },

    handleInput: function() {
        if (getState() != STATE_PLAYER_FATALLY_HIT) {
            if (isKeyDown(LEFT_KEY)) {
                this.xVel = -175;
            } else if (isKeyDown(RIGHT_KEY)) {
                this.xVel = 175;
            } else {
                this.xVel = 0;
            }

            if (wasKeyPressed(SHOOT_KEY)) {
                if (this.bulletDelayAccumulator > 0.5) {
                    this.shoot();
                    this.bulletDelayAccumulator = 0;
                }
            }
        } // if
    },

    updateBullets: function(dt) {
        for (var i = this.bullets.length - 1; i >= 0; i--) {
            var bullet = this.bullets[i];
            if (bullet.alive) {
                bullet.update(dt);
            } else {
                this.bullets.splice(i, 1);
                bullet = null;
            }
        }
    },

    update: function(dt) {
        // update time passed between shots
        this.bulletDelayAccumulator += dt;

        // apply x vel
        this.position.x += this.xVel * dt;

        // cap player position in screen bounds
        this.position.x = clamp(this.position.x, this.bounds.w/2, CANVAS_WIDTH - this.bounds.w/2);
        this.updateBullets(dt);
    },

    draw: function(resized) {
        if (getState() != STATE_PLAYER_FATALLY_HIT) this._super(resized);

        // draw bullets
        for (var i = 0, len = this.bullets.length; i < len; i++) {
            var bullet = this.bullets[i];
            if (bullet.alive) {
                bullet.draw(resized);
            }
        }
    }
});

var Bullet = BaseSprite.extend({
    init: function(x, y, direction, speed) {
        this._super(bulletImg, x, y);
        this.direction = direction;
        this.speed = speed;
        this.alive = true;
    },

    update: function(dt) {
        this.position.y -= (this.speed * this.direction) * dt;

        if (this.position.y < 0) {
            this.alive = false;
        }
    },

    draw: function(resized) {
        this._super(resized);
    }
});

var Enemy = SheetSprite.extend({
    init: function(alienType, x, y) {
        var clipRects = getClipRects(alienType);
        this._super(spriteSheetImg, clipRects[0], x, y);
        this.clipRects = clipRects;
        this.scale.set(SPRITE_SCALE, SPRITE_SCALE);
        this.alive = true;
        this.onFirstState = true;
        this.stepDelay = 1; // try 2 secs to start with...
        this.stepAccumulator = 0;
        this.doShoot = false;
        this.bullet = null;
        this.type = alienType;
    },

    getScoreValue: function() {
        var nScoreValue = ACTORS[this.type].SCORE_VALUE;
        if (typeof nScoreValue == "function") {
            nScoreValue = nScoreValue();
        } // if
        return nScoreValue;
    },

    toggleFrame: function() {
        this.onFirstState = !this.onFirstState;
        this.clipRect = (this.onFirstState) ? this.clipRects[0] : this.clipRects[1];
    },

    shoot: function() {
        this.bullet = new Bullet(this.position.x, this.position.y + this.bounds.w/2, -1, 500);
    },

    update: function(dt) {
        this.stepAccumulator += dt;

        if (this.stepAccumulator >= this.stepDelay) {
            if (!bStepSoundPlayed) {
                bStepSoundPlayed = true;
                switch (nStepSoundIteration) {
                    case 1:
                        sndInvaderStep1.play();
                        break;
                    case 2:
                        sndInvaderStep2.play();
                        break;
                    case 3:
                        sndInvaderStep3.play();
                        break;
                    case 4:
                        sndInvaderStep4.play();
                        nStepSoundIteration = 0;
                        break;
                } // switch
                nStepSoundIteration++;
            } // if

            if (this.position.x < this.bounds.w/2 + 20 && alienDirection < 0) {
                updateAlienLogic = true;
            } if (alienDirection === 1 && this.position.x > CANVAS_WIDTH - this.bounds.w/2 - 20) {
                updateAlienLogic = true;
            }
            if (this.position.y > CANVAS_HEIGHT - 80) {
                playerIsHit();
                theyInvaded();
            }

            var fireTest = Math.floor(Math.random() * (this.stepDelay + 1));
            if (getRandomArbitrary(0, 1000) <= (INVADERS_TRIGGERHAPPY + wave) * (this.stepDelay + 1)) {
                this.doShoot = true;
            }
            this.position.x += 10 * alienDirection;
            this.toggleFrame();
            this.stepAccumulator = 0;
        }
        this.position.y += alienYDown;

        if (this.bullet !== null && this.bullet.alive) {
            this.bullet.update(dt);
        } else {
            this.bullet = null;
        }
    },

    draw: function(resized) {
        this._super(resized);
        if (this.bullet !== null && this.bullet.alive) {
            this.bullet.draw(resized);
        }
    }
});

var ParticleExplosion = Class.extend({
    init: function() {
        this.particlePool = [];
        this.particles = [];
    },

    draw: function() {
        for (var i = this.particles.length - 1; i >= 0; i--) {
            var particle = this.particles[i];
            particle.moves++;
            particle.x += particle.xunits;
            particle.y += particle.yunits + (particle.gravity * particle.moves);
            particle.life--;

            if (particle.life <= 0 ) {
                if (this.particlePool.length < 100) {
                    this.particlePool.push(this.particles.splice(i,1));
                } else {
                    this.particles.splice(i,1);
                }
            } else {
                ctx.globalAlpha = (particle.life)/(particle.maxLife);
                ctx.fillStyle = particle.color;
                ctx.fillRect(particle.x, particle.y, particle.width, particle.height);
                ctx.globalAlpha = 1;
            }
        }
    },

    createExplosion: function(x, y, color, number, width, height, spd, grav, lif) {
        for (var i =0;i < number;i++) {
            var angle = Math.floor(Math.random()*360);
            var speed = Math.floor(Math.random()*spd/2) + spd;
            var life = Math.floor(Math.random()*lif)+lif/2;
            var radians = angle * Math.PI/ 180;
            var xunits = Math.cos(radians) * speed;
            var yunits = Math.sin(radians) * speed;

            if (this.particlePool.length > 0) {
                var tempParticle = this.particlePool.pop();
                tempParticle.x = x;
                tempParticle.y = y;
                tempParticle.xunits = xunits;
                tempParticle.yunits = yunits;
                tempParticle.life = life;
                tempParticle.color = color;
                tempParticle.width = width;
                tempParticle.height = height;
                tempParticle.gravity = grav;
                tempParticle.moves = 0;
                tempParticle.alpha = 1;
                tempParticle.maxLife = life;
                this.particles.push(tempParticle);
            } else {
                this.particles.push({x:x,y:y,xunits:xunits,yunits:yunits,life:life,color:color,width:width,height:height,gravity:grav,moves:0,alpha:1, maxLife:life});
            }

        }
    }
});



// ###################################################################
// Initialization functions
//
// ###################################################################
function initCanvas() {
    // create our canvas and context
    canvas = document.getElementById('game-canvas');
    ctx = canvas.getContext('2d');

    // turn off image smoothing
    setImageSmoothing(false);

    // create our main sprite sheet img
    spriteSheetImg = new Image();
    spriteSheetImg.src = SPRITE_SHEET_SRC;
    preDrawImages();

    imgSogetiLogo = new Image();
    imgSogetiLogo.src = SOGETI_LOGO;

    // add event listeners and initially resize
    window.addEventListener('resize', resize);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
}

function preDrawImages() {
    var canvas = drawIntoCanvas(2, 8, function(ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    });
    bulletImg = new Image();
    bulletImg.src = canvas.toDataURL();
}

function setImageSmoothing(value) {
    this.ctx['imageSmoothingEnabled'] = value;
    this.ctx['mozImageSmoothingEnabled'] = value;
    this.ctx['oImageSmoothingEnabled'] = value;
    this.ctx['webkitImageSmoothingEnabled'] = value;
    this.ctx['msImageSmoothingEnabled'] = value;
}

function initGame() {
    dirtyRects = [];
    aliens = [];
    player = new Player();
    particleManager = new ParticleExplosion();
    setupAlienFormation();
    drawBottomHud();
}

function setupAlienFormation() {
    alienCount = 0;
    for (var i = 0, len = 5 * 12; i < len; i++) {
        var gridX = (i % 12);
        var gridY = Math.floor(i / 12);
        var alienType;
        switch (gridY) {
            case 0:
            case 1: alienType = "ALIEN_LARGE"; break;
            case 2:
            case 3: alienType = "ALIEN_MEDIUM"; break;
            case 4: alienType = "ALIEN_SMALL"; break;
        }
        aliens.push(new Enemy(alienType, (CANVAS_WIDTH/2 - ALIEN_SQUAD_WIDTH/2) + ALIEN_X_MARGIN/2 + gridX * ALIEN_X_MARGIN, CANVAS_HEIGHT/3.25 - gridY * 40 + ALIEN_Y_TOP));
        alienCount++;
    }
}

// ###################################################################
// Event Listener functions
//
// ###################################################################
function resize() {
    var w = window.innerWidth;
    var h = window.innerHeight;

    // calculate the scale factor to keep a correct aspect ratio
    var scaleFactor = Math.min(w / CANVAS_WIDTH, h / CANVAS_HEIGHT);

    if (IS_CHROME) {
        canvas.width = CANVAS_WIDTH * scaleFactor;
        canvas.height = CANVAS_HEIGHT * scaleFactor;
        setImageSmoothing(false);
        ctx.transform(scaleFactor, 0, 0, scaleFactor, 0, 0);
    } else {
        // resize the canvas css properties
        canvas.style.width = CANVAS_WIDTH * scaleFactor + 'px';
        canvas.style.height = CANVAS_HEIGHT * scaleFactor + 'px';
    }
}

function onKeyDown(e) {
    if (!fullKeyboardEnabled()) e.preventDefault();
    keyStates[e.keyCode] = true;
}

function onKeyUp(e) {
    if (!fullKeyboardEnabled()) e.preventDefault();
    keyStates[e.keyCode] = false;
}


function fullKeyboardEnabled()
{
    state = getState();
    switch(state) {
        case STATE_ATTRACT:
        case STATE_SCANNING:
            return true;
        default:
            return false;
    } // switch
} // function

// ###################################################################
// Helpful input functions
//
// ###################################################################
function isKeyDown(key) {
    return keyStates[key];
}

function wasKeyPressed(key) {
    return !prevKeyStates[key] && keyStates[key];
}


// ###################################################################
// Drawing & Update functions
//
// ###################################################################

var nStepSoundIteration = 1;

function updateAliens(dt) {
    if (updateAlienLogic) {
        updateAlienLogic = false;
        alienDirection = -alienDirection;
        alienYDown = 42;
    }

    for (var i = aliens.length - 1; i >= 0; i--) {
        var alien = aliens[i];
        if (!alien.alive) {
            aliens.splice(i, 1);
            alien = null;
            alienCount--;
            if (alienCount < 1) {
                wave++;
                g_nPauseGameUntilTime = getNow() + 2000;
                setState(STATE_GET_READY_WAVE);
                setupAlienFormation();
            }
            return;
        }

        alien.stepDelay = (((alienCount * 20) - (wave * 10)) / 1000) / INVADERS_SPEEDUP_FACTOR;
        if (alien.stepDelay <= 0.05) {
            alien.stepDelay = 0.05;
        }
        alien.update(dt);

        if (alien.doShoot) {
            alien.doShoot = false;
            alien.shoot();
        }

        if (i == 0) {
            bStepSoundPlayed = false;
        }
    }
    alienYDown = 0;
}


function removeAllPlayerBullets() {
    var bullets = player.bullets;
    for (var i= 0,len=bullets.length;i<len;i++) {
        var bullet = bullets[i];
        bullet.alive = false;
    } // for
} // function


function getAlienKilledPoints()
{


} // function


function resolveBulletEnemyCollisions() {
    var bullets = player.bullets;

    for (var i = 0, len = bullets.length; i < len; i++) {
        var bullet = bullets[i];
        for (var j = 0, alen = aliens.length; j < alen; j++) {
            var alien = aliens[j];
            if (checkRectCollision(bullet.bounds, alien.bounds)) {
                alien.alive = bullet.alive = false;
                sndInvaderKilled.play();
                particleManager.createExplosion(alien.position.x, alien.position.y, alien.getExplosionColour(), 70, 5,5,3,.15,50);
                player.score += alien.getScoreValue();
            } // if
        } // for
    } // for
} // function


function removeAllInvaderBullets() {
    for (var i= 0, len = aliens.length; i < len; i++) {
        var alien = aliens[i];
        if (alien.bullet !== null) alien.bullet.alive = false;
    } // for
} // function

function resolveBulletPlayerCollisions() {
    for (var i = 0, len = aliens.length; i < len; i++) {
        var alien = aliens[i];
        if (alien.bullet !== null && checkRectCollision(alien.bullet.bounds, player.bounds)) {
            playerIsHit();
            alien.bullet.alive = false;
            break;
        }
    }
}

function playerIsHit() {
    if (!(getState() == STATE_PLAYER_FATALLY_HIT)) {
        sndPlayerHit.play();
        particleManager.createExplosion(player.position.x, player.position.y, player.getExplosionColour(), 100, 8, 8, 6, 0.001, 40);
        player.lives--;

        removeAllInvaderBullets();
        removeAllPlayerBullets();
        if (player.lives > 0) {
            player.position.set(CANVAS_WIDTH / 2, CANVAS_HEIGHT - 70); // init the player's position
            g_nPauseGameUntilTime = getNow() + 2000;
            setState(STATE_GET_READY);
        } else {
            // trigger died-screen:
            nPlayerDiedTime = getNow();
            setState(STATE_PLAYER_FATALLY_HIT);

            // check for highscore and store in database
            if (player.score >= nHighScore) {
                nOldHighScore = nHighScore;
                nHighScore = player.score;
                localStorage.setItem("highscore", nHighScore);
                localStorage.setItem("highscore-by", g_aCurrentPerson);
                g_aCurrentPerson.push("Highscore breaker! ("+ nHighScore +")");
                localStorage.setItem("person-"+ g_aCurrentPerson[PERSON_ID], g_aCurrentPerson);
            } // if
        } // if
    } // if
} // function


function updateGame(dt) {
    if (getState() == STATE_PLAYING) {
        player.handleInput();
        prevKeyStates = keyStates.slice();
        player.update(dt);
        updateAliens(dt);
        resolveBulletEnemyCollisions();
        resolveBulletPlayerCollisions();
    } // if
}

function drawIntoCanvas(width, height, drawFunc) {
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext('2d');
    drawFunc(ctx);
    return canvas;
}


function rainbow(p_fSaturation = 0.9, p_fLightness = 0.6, p_fAlpha = 1) {
    // 30 random hues with step of 12 degrees
    var hue = Math.floor(Math.random() * 30) * 12;

    return $.Color({
        hue: hue,
        saturation: p_fSaturation,
        lightness: p_fLightness,
        alpha: p_fAlpha
    }).toHexString();
};

function printText(p_sText, p_nX, p_nY, p_sAlign = "center", p_nBlinkFreq = 0, p_sColor = "white", p_nFontSize = 14, p_bFillText = true)
{
    var x, y;
    ctx.fillStyle = p_sColor;
    ctx.font = p_nFontSize +"px Play";
    switch (p_sAlign) {
        case "left": x = p_nX; break;
        case "center": x = p_nX - ctx.measureText(p_sText).width / 2; break;
        case "right": x = p_nX - ctx.measureText(p_sText).width; break;
    } // switch

    if (p_nBlinkFreq > 0 && ~~(0.5 + Date.now() / p_nBlinkFreq) % 2) return;

    if (p_bFillText) {
        ctx.fillText(p_sText, x, p_nY);
    } else {
        ctx.strokeText(p_sText, x, p_nY);
    } // if
} // function


function drawBottomHud() {
    ctx.fillStyle = '#02ff12';
    ctx.fillRect(0, CANVAS_HEIGHT - 30, CANVAS_WIDTH, 2);
    printText("LIVES"+ (player.lives > 1 ? ":" : ""), 10, CANVAS_HEIGHT - 7.5, "left", 0, (player.lives > 1 ? 'white' : 'red'), 20);
    for (n = 0; n < player.lives; n++) {
        ctx.drawImage(spriteSheetImg, player.clipRect.x, player.clipRect.y, player.clipRect.w,
            player.clipRect.h, 75 + (20 * n * SPRITE_SCALE), CANVAS_HEIGHT - 23, player.clipRect.w * SPRITE_SCALE,
            player.clipRect.h * SPRITE_SCALE);
    } // for
    printText('PLAYER: '+ g_aCurrentPerson[PERSON_FIRSTNAME], CANVAS_WIDTH - 20, CANVAS_HEIGHT - 7.5, "right", 0, "white", 20);
    printText('HIGHSCORE: '+ Math.max(nHighScore, player.score), CANVAS_WIDTH - 20, 20, "right", (player.score > nHighScore ? 200 : 0), "white", 20); // will start blinking faster & faster
    printText('SCORE: ' + player.score, 20, 20, "left", 0, "white", 20);
    printText('WAVE: '+ wave, CANVAS_WIDTH/2, 15, "left", 0, "white", 17);
}

function drawAliens(resized) {
    for (var i = 0; i < aliens.length; i++) {
        var alien = aliens[i];
        alien.draw(resized);
    }
}

function drawGame(resized) {
    player.draw(resized);
    drawAliens(resized);
    particleManager.draw();
    drawBottomHud();
} // function

function drawAttractScreen() {
    ctx.drawImage(imgSogetiLogo, CANVAS_WIDTH / 2 - (imgSogetiLogo.width / 4), 220, imgSogetiLogo.width / 2, imgSogetiLogo.height / 2);

    printText("Space Invaders", CANVAS_WIDTH/2, CANVAS_HEIGHT/2 + 42, "center", 0, "white", 36);
    printText('Current highscore: '+ nHighScore, CANVAS_WIDTH/2, 42, "center", 0, "grey", 18);

    if (getState() == STATE_SCANNING) {
        if ((getNow() - g_nStartedScanningBarcodeTime) < (TIME_TO_WAIT_FOR_SCANNER_TO_FINISH * 0.75)) {
            printText("SCANNING, PLEASE WAIT...", CANVAS_WIDTH / 2, CANVAS_HEIGHT - 42, "center", 100, "cyan", 36);
        } else {
            printText("ERROR, PLEASE TRY AGAIN!", CANVAS_WIDTH / 2, CANVAS_HEIGHT - 42, "center", 0, "red", 36);
        } // if
    } else {
        printText("<-- SCAN YOUR BADGE TO START", CANVAS_WIDTH / 2, CANVAS_HEIGHT - 42, "center", 500, '#FFFFFF', 36);
    } // if
}

function drawDeadScreen() {
    if (player.score > nOldHighScore) {
        printText("CONGRATULATIONS!", CANVAS_WIDTH/2, CANVAS_HEIGHT/2 - 100, "center", 100, rainbow(), 42);
        printText("YOU HAVE BEATEN THE LAST HIGHSCORE!", CANVAS_WIDTH/2, CANVAS_HEIGHT/2 - 32, "center", 0, "white", 21);
        printText("Old highscore: "+ nOldHighScore, CANVAS_WIDTH/2, CANVAS_HEIGHT/2 + 160, "center", 0, "silver", 24);
    } else {
        showGameOverMessage(getState());
//        printText("GAME OVER", CANVAS_WIDTH/2, CANVAS_HEIGHT/2 + 42, "center", 0, "white", 42);
        printText("Current highscore: "+ nHighScore, CANVAS_WIDTH/2, CANVAS_HEIGHT/2 + 160, "center", 0, "silver", 24);
    } // if
    printText("Your score: "+ player.score, CANVAS_WIDTH/2, CANVAS_HEIGHT/2 + 120, "center", 0, "white", 24);

    if (getState() == STATE_AFTER_DEATH) {
        printText("Hit FIRE to continue...", CANVAS_WIDTH/2, CANVAS_HEIGHT - 42, "center", 500, "red", 18);
    } // if
} // function

function hasValidBarcode()
{
    return (checkBarCode(document.getElementById("barinput").value));
} // function

var g_nStartedScanningBarcodeTime = 0;

function isScanningBarcode()
{
    sInput = document.getElementById("barinput").value;
    document.getElementById("debug").innerHTML += "<br>sInput.length = "+ sInput.length;
    if ((sInput.length > 0) && !isBarcodeComplete(sInput)) {
        if (g_nStartedScanningBarcodeTime == 0) {
            g_nStartedScanningBarcodeTime = getNow();
        } // if
        return true;
    } // if
    return false;
} // function


function getNow()
{
    return parseInt(window.performance.now());
} // function


function showGameOverMessage(state)
{
    if (state == STATE_PLAYER_FATALLY_HIT || state == STATE_RIGHT_AFTER_DEATH || state == STATE_AFTER_DEATH) {
        printText("GAME OVER", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 42, "center", 0, "white", 42);
    } // if
} // function

function showGetReadyMessage(state)
{
    if (state == STATE_GET_READY || state == STATE_GET_READY_WAVE) {
        var sWaveText = (state == STATE_GET_READY_WAVE ? " FOR WAVE "+ wave : "");
        printText("GET READY"+ sWaveText +"!", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 142, "center", 100, "white", 42);
    } // if
} // function


function getState()
{
    return g_nCurrentState;
} // function

function setState(p_nNewState)
{
    g_nCurrentState = p_nNewState;
} // function

function getStateName(p_nState)
{
    switch (p_nState) {
        case STATE_RIGHT_AFTER_DEATH: return "After death summary (early)...";
        case STATE_AFTER_DEATH: return "After death summary...";
        case STATE_ATTRACT: return "Attract mode (ready for scanner)";
        case STATE_SCANNING: return "Receiving barcode...";
        case STATE_PLAYER_FATALLY_HIT: return "Player died...";
        case STATE_GET_READY: return "Get Ready...";
        case STATE_GET_READY_WAVE: return "Get Ready for wave...";
        case STATE_INIT: return "Initialising";
        case STATE_PLAYING: return "Playing :)";
        default: return "Unkown state "+ p_nState;
    } // switch
} // function


function actUponCurrentState(dt)
{
    var state = getState();

    switch (state) {
        case STATE_GET_READY:
        case STATE_GET_READY_WAVE:
            // Check the time; Do we need to stop pausing?
            if (getNow() > g_nPauseGameUntilTime) {
                setState(STATE_PLAYING);
            } // if
            break;

        case STATE_PLAYING:
            updateGame(dt / 1000); // normal operation
            break;

        case STATE_ATTRACT:
            // be ready for barcode
            if (isScanningBarcode()) setState(STATE_SCANNING);
            if (hasValidBarcode()) {
                document.getElementById("barinput").value = ""; // drop this input (it's safely stored in the database)
                setState(STATE_GET_PLAYING);
            } // if
            break;

        case STATE_SCANNING:
            // receiving something, probably a barcode

            // timed out?
            if (getNow() - g_nStartedScanningBarcodeTime > TIME_TO_WAIT_FOR_SCANNER_TO_FINISH) {
                document.getElementById("barinput").value = ""; // ja, doeiiii!
                document.getElementById("barinput").focus(); // voor de zekerheid
                g_nStartedScanningBarcodeTime = 0;
                setState(STATE_ATTRACT);
            } else {
                // check if a valid barcode has been entered, so we can start to play!!! \o/
                if (hasValidBarcode()) {
                    setState(STATE_GET_PLAYING);
                } // if
            } // if
            break;

        case STATE_GET_PLAYING:
            g_nPauseGameUntilTime = getNow() + 2000; // "get ready!"

            // stop attract sound:
            sndAttract.pause();
            sndAttract.currentTime = 0; // be kind, rewind!

            setState(STATE_GET_READY_WAVE);
            initGame();
            break;

        case STATE_PLAYER_FATALLY_HIT:
            // the player has just died
            updateAliens(dt / 1000); // only update the aliens

            // check if the timeout has expired
            if (getNow() - nPlayerDiedTime > 2000) {
                setState(STATE_RIGHT_AFTER_DEATH);
            } // if

            // Note: the GAME OVER message will be shown via showStateMessages
            break;

        case STATE_RIGHT_AFTER_DEATH:
            if (getNow() - nPlayerDiedTime > 5000) {
                setState(STATE_AFTER_DEATH);
            } // if
            break;

        case STATE_AFTER_DEATH:
            // after death summary
            if (wasKeyPressed(SHOOT_KEY) || (getNow() - nPlayerDiedTime > 10000)) {
                //setState(STATE_INIT);
                resetGame();
            } // if
            break;
    } // switch
} // function


function showStateMessages(dt)
{
    // Clear screen:
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    var state = getState();
    switch (state) {
        case STATE_ATTRACT:
        case STATE_SCANNING:
            drawAttractScreen();
            break;

        case STATE_GET_READY:
        case STATE_GET_READY_WAVE:
        case STATE_PLAYING:
        case STATE_PLAYER_FATALLY_HIT:
            showGameOverMessage(state);
            drawGame(false);
            showGetReadyMessage(state);
            break;

        case STATE_RIGHT_AFTER_DEATH:
        case STATE_AFTER_DEATH:
            // after death summary
            // either CONGRATULATIONS or plain scoreboard
            // return to STATE_ATTRACT after x seconds
            drawDeadScreen();
            break;
    } // switch
} // function



function main_loop() {
    var now = getNow();
    var dt = parseInt(now - lastTime);
    if (dt > 100) dt = 100;

    // DEBUG INFO:
    document.getElementById("debug").innerHTML = "now = "+ now +"<br>dt = "+ dt +"<br>nPlayerDiedTime = "+ nPlayerDiedTime
        +"<br>valid barcode? = "+ (hasValidBarcode() ? "yes":"no")
        +"<br>is scanning barcode? = "+ (isScanningBarcode() ? "yes":"no")
        +"<br>STATE = "+ (getState()) +" ("+ getStateName(getState()) +")"
        +"<br>LIVES = "+ (player ? player.lives : "N/A") +"<br>Score = "+ (player ? player.score : "N/A") +"<br>Highscore = "+ nHighScore

    actUponCurrentState(dt);
    showStateMessages(dt);

    lastTime = now;
    requestAnimationFrame(main_loop);
}


function theyInvaded() {
    aliens = [];
    setupAlienFormation();
}

function init() {
    initCanvas();
    initGame();
    keyStates = [];
    prevKeyStates = [];
    resize();
}



function resetGame()
{
    sndAttract.play();
    init();
    player.reset();
    setState(STATE_ATTRACT);
}


// ###################################################################
// Start game!
//
// ###################################################################
window.onload = function() {
    resetGame();
    main_loop();
};