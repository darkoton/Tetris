class Tetris {
    constructor() {
        this.interval = 400
        this.body = document.querySelector('.game')
        this.next = 0
        this.pauseState = false
        this.moveInterval
        this.falls = null
    }
    generate() {
        const figures = [
            {
                name: "I",
                top: -90,
                left: 90
            },
            {
                name: "J",
                top: -60,
                left: 120,
            },
            {
                name: "L",
                top: -60,
                left: 90
            },
            {
                name: "O",
                top: -30,
                left: 120
            },
            {
                name: "S",
                top: -60,
                left: 120
            },
            {
                name: "T",
                top: -60,
                left: 120
            },
            {
                name: "Z",
                top: -90,
                left: 120
            }]
        const colors = ["#00f0f0", "#0000f0", "#f0a100", "#f0f000", "#00f000", "#a100f0", "#f00000"]

        if (!this.falls) {
            let randomFigureIndex = Math.trunc(Math.random() * figures.length)
            let randomColorIndex = Math.trunc(Math.random() * colors.length)


            this.body.innerHTML += `
          <div class="${figures[randomFigureIndex].name} figure" data-color="${colors[randomColorIndex]}" data-state="falls" data-top="${figures[randomFigureIndex].top}" data-left="${figures[randomFigureIndex].left}" data-turn="1">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        `}

        this.falls = document.querySelector('[data-state="falls"]')

        this.moveBlock()
    }
    rotate() {
        if (this.falls.dataset.turn == 4) {
            this.falls.dataset.turn = 1
        }

        this.falls.dataset.turn = +this.falls.dataset.turn + 1
    }
    start() {
        this.generate()
    }
    moveBlock() {
        let top = +this.falls.dataset.top;
        this.moveInterval = setInterval(() => {

            var now = (new Date).getTime();
            if (this.next && this.next > now) return;
            this.next = now + this.interval;

            top = +this.falls.dataset.top;
            this.falls.dataset.top = top + 30
            this.falls.style.top = top + 30 + 'px'

            if ((this.falls.offsetTop + this.falls.offsetHeight) == 600) {
                clearInterval(this.moveInterval)
                this.falls.dataset.state = 'stand'
                this.falls = null
                this.generate()
            }

        }, 100)
    }
    pause() {
        if (!this.pauseState) {
            this.pauseState = true
            clearInterval(this.moveInterval)
        } else {
            this.pauseState = false
            this.start()
        }
    }
    moveLeft() {
        if ((this.falls.classList.contains('I') || this.falls.classList.contains('L')) && (this.falls.offsetLeft - 30) < -30) return
        if (!(this.falls.classList.contains('I') || this.falls.classList.contains('L')) && (this.falls.offsetLeft - 30) < 0) return

        let left = +this.falls.dataset.left;
        this.falls.dataset.left = left - 30
        this.falls.style.left = left - 30 + 'px'
    }
    moveRight() {
        console.log(this.falls.offsetLeft);
        if ((this.falls.classList.contains('O') || this.falls.classList.contains('I') || this.falls.classList.contains('J')) && (this.falls.offsetLeft + 30) > 240) return
        if (!(this.falls.classList.contains('O') || this.falls.classList.contains('I') || this.falls.classList.contains('J')) && (this.falls.offsetLeft + 30) > 210) return

        let left = +this.falls.dataset.left;
        this.falls.dataset.left = left + 30
        this.falls.style.left = left + 30 + 'px'
    }
    moveDown(action) {
        if (action == 'down') {
            this.interval = 0.1
            return
        }

        this.interval = 500
    }
}

const tetris = new Tetris()
tetris.start()

window.addEventListener("keydown", event => {
    if (event.code == 'ArrowUp' || event.code == 'KeyW') {
        tetris.rotate()
    }

    if (event.code == 'ArrowLeft' || event.code == 'KeyA') {
        tetris.moveLeft()
    }
    if (event.code == 'ArrowRight' || event.code == 'KeyD') {
        tetris.moveRight()
    }
    if (event.code == 'ArrowDown' || event.code == 'KeyS') {
        tetris.moveDown()
    }
    if (event.code == 'ArrowDown' || event.code == 'KeyS') {
        tetris.moveDown('down')
    }
})

window.addEventListener("keyup", event => {
    if (event.code == 'ArrowDown' || event.code == 'KeyS') {
        tetris.moveDown('up')
    }
    if (event.code == 'Space') {
        tetris.pause()
    }
})