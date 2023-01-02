const canvas = document.getElementById("doodleJump")
const ctx = canvas.getContext("2d")



class player {
    constructor(X, Y) {
        this.width = 30
        this.height = 60
        this.x = X
        this.ax = 8
        this.y = Y
        this.ay = 0
        this.jump = -20
        this.leftPressed = false
        this.rightPressed = false
        document.addEventListener("keydown", (event) => {
            switch (event.key) {
                case "ArrowLeft":
                    this.leftPressed = true
                    break;

                case "ArrowRight":
                    this.rightPressed = true
                    break;

                default:
                    break;
            }
        })
        document.addEventListener("keyup", (event) => {
            switch (event.key) {
                case "ArrowLeft":
                    this.leftPressed = false
                    break;

                case "ArrowRight":
                    this.rightPressed = false
                    break;

                default:
                    break;
            }
        })
    }

    move() {
        if (this.leftPressed) {
            this.x -= this.ax
        }
        if (this.rightPressed) {
            this.x += this.ax
        }

        if (this.x + this.width / 2 < 0) {
            this.x = canvas.width - this.width / 2
        }
        if (this.x + this.width / 2 > canvas.width) {
            this.x = - this.width / 2
        }

        if (this.ay <= 20) {
            this.ay++
        }

        for (let i = 0; i < 4; i++) {
            this.y += this.ay / 4
            if (this.ay >= 0) {
                this.checkTile()
            }
        }

        if (gameY > this.y - 100) {
            gameY = this.y - 100
        }
    }

    draw() {
        ctx.fillStyle = "rgb(250, 250, 250)"
        ctx.fillRect(this.x, this.y - gameY, this.width, this.height)
    }

    checkTile() {
        tileArray.forEach(element => {
            if (this.y + this.height >= element.y && this.x + this.width >= element.x && this.x <= element.x + element.width && this.y + this.height <= element.y + element.height) {
                this.ay = this.jump
            }
        });
    }
}

class tile {
    constructor(W, X, Y) {
        this.width = W
        this.height = 10
        this.x = X
        this.y = Y
    }

    draw() {
        ctx.fillStyle = "rgb(250, 250, 250)"
        ctx.fillRect(this.x, this.y - gameY, this.width, this.height)
    }
}

function tic() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    _player.move()
    _player.draw()

    tileArray.forEach(element => {
        element.draw()
    });

    if (_player.y + _player.height >= gameY + canvas.height)
        clearInterval(gameLoop)
}

var _player = new player(canvas.width / 2 - 15, canvas.height - 200)

var tileArray = [new tile(canvas.width, 0, canvas.height - 10)]

var gameY = 0

for (let i = canvas.height; i > -10000; i -= 50) {
    newTile(i)
}

var gameLoop = setInterval(tic, 10)

function newTile(Y) {
    tileArray.push(new tile(60, Math.random() * (canvas.width - 60), Y))
}