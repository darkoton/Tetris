class Tetris {
  constructor(cup) {
    this.cup = document.querySelector(cup)
    this.figuresData = [
      'I',
      'J',
      'L',
      'O',
      'S',
      'T',
      'Z'
    ]
    this.colors = [
      "#00f0f0",
      "#0000f0",
      "#f0a100",
      "#f0f000",
      "#00f000",
      "#a100f0",
      "#f00000"
    ]

    this.figureFall = null
    this.pauseState = false
    this.next = 0
    this.interval = 400
    this.moveInterval
  }

  generete() {
    const type = this.figuresData[Math.trunc(Math.random() * this.figuresData.length)]
    const color = this.colors[Math.trunc(Math.random() * this.colors.length)]


    this.figureFall = new Figure({ color, type: "I" })
    this.figureFall.cells.forEach(cell => {
      this.cup.appendChild(cell)
    })

    this.fall()
  }
  fall() {
    const some = (el) => {
      let neighbor = document.querySelector(`.cell[data-row='${+el.dataset.row + 1}'][data-col='${el.dataset.col}']`)

      if (el.style.gridRowEnd == 22 || (!this.figureFall.cells.includes(neighbor) && neighbor)) {
        return true
      }
    }

    let row
    this.moveInterval = setInterval(() => {
      let now = (new Date).getTime();
      if (this.next && this.next > now) return;
      this.next = now + this.interval;

      if (Array.from(this.figureFall.cells).some(some)) {
        clearInterval(this.moveInterval)
        this.figureFall.state = 'lies'
        // this.generete()
        return
      }
      this.figureFall.cells.forEach(el => {
        row = el.style.gridRowEnd
        el.dataset.row = +el.dataset.row + 1
        el.style.gridRow = `${row} / ${+row + 1}`
      })
    }, 100)
  }
  move(direction) {
    const checkWallLeft = cell => {
      let neighbor = document.querySelector(`.cell[data-row='${cell.dataset.row}'][data-col='${cell.dataset.col - 1}']`)

      return cell.dataset.col == 1 || (!this.figureFall.cells.includes(neighbor) && neighbor)
    }
    const checkWallRight = cell => {
      let neighbor = document.querySelector(`.cell[data-row='${cell.dataset.row}'][data-col='${+cell.dataset.col + 1}']`)

      return cell.dataset.col == 10 || (!this.figureFall.cells.includes(neighbor) && neighbor)
    }
    let col
    if (direction == 'left') {
      if (!this.figureFall.cells.some(checkWallLeft)) {
        this.figureFall.cells.forEach(el => {
          col = el.style.gridColumnStart
          el.dataset.col = +el.dataset.col - 1
          el.style.gridColumn = `${col - 1} / ${col}`
        })
      }
    }
    if (direction == 'right') {
      if (!this.figureFall.cells.some(checkWallRight)) {
        this.figureFall.cells.forEach(el => {
          col = el.style.gridColumnEnd
          el.dataset.col = +el.dataset.col + 1
          el.style.gridColumn = `${col} / ${+col + 1}`
        })
      }
    }
  }
  moveDown(action) {
    if (action == 'down') {
      this.interval = 0.1
      return
    }
    this.interval = 400
  }

  pause() {
    if (!this.pauseState) {
      clearInterval(this.moveInterval)
    } else {
      this.fall()
    }

    this.pauseState = !this.pauseState
  }
  start() {
    this.generete()
  }
}

class Figure {
  constructor({ color, type }) {
    this.color = color
    this.type = type
    // this.rotate = [1, 2, 3, 4][Math.trunc(Math.random() * 4)]
    this.rotate = 1
    this.state = "fall"
    this.cells = []

    for (let i = 0; i < 4; i++) {
      const cell = document.createElement('span')

      cell.classList.add('cell')
      cell.style.background = this.color
      cell.style.boxShadow = "inset 3px 3px rgba(255, 255, 255, 0.5), inset -3px -3px rgba(0, 0, 0, 0.5)"
      this.cells[i] = cell
    }

    this.setPosition()
  }
  setPosition() {
    if (this.type == 'I') {
      //COL
      this.cells[0].style.gridColumn = "4 / 5"
      this.cells[1].style.gridColumn = "5 / 6"
      this.cells[2].style.gridColumn = "6 / 7"
      this.cells[3].style.gridColumn = "7 / 8"

      //ROW
      this.cells[0].style.gridRow = "2 / 3"
      this.cells[1].style.gridRow = "2 / 3"
      this.cells[2].style.gridRow = "2 / 3"
      this.cells[3].style.gridRow = "2 / 3"

      //POSITION
      this.cells[0].dataset.row = "1"
      this.cells[1].dataset.row = "1"
      this.cells[2].dataset.row = "1"
      this.cells[3].dataset.row = "1"

      this.cells[0].dataset.col = "4"
      this.cells[1].dataset.col = "5"
      this.cells[2].dataset.col = "6"
      this.cells[3].dataset.col = "7"
      return
    }
    if (this.type == 'J') {

      //COL
      this.cells[0].style.gridColumn = "5 / 6"
      this.cells[1].style.gridColumn = "5 / 6"
      this.cells[2].style.gridColumn = "6 / 7"
      this.cells[3].style.gridColumn = "7 / 8"

      //ROW
      this.cells[0].style.gridRow = "1 / 2"
      this.cells[1].style.gridRow = "2 / 3"
      this.cells[2].style.gridRow = "2 / 3"
      this.cells[3].style.gridRow = "2 / 3"

      //POSITION
      this.cells[0].dataset.row = "0"
      this.cells[1].dataset.row = "1"
      this.cells[2].dataset.row = "1"
      this.cells[3].dataset.row = "1"

      this.cells[0].dataset.col = "5"
      this.cells[1].dataset.col = "5"
      this.cells[2].dataset.col = "6"
      this.cells[3].dataset.col = "7"
      return
    }
    if (this.type == 'L') {
      //COL
      this.cells[0].style.gridColumn = "7 / 8"
      this.cells[1].style.gridColumn = "5 / 6"
      this.cells[2].style.gridColumn = "6 / 7"
      this.cells[3].style.gridColumn = "7 / 8"

      //ROW
      this.cells[0].style.gridRow = "1 / 2"
      this.cells[1].style.gridRow = "2 / 3"
      this.cells[2].style.gridRow = "2 / 3"
      this.cells[3].style.gridRow = "2 / 3"

      //POSITION
      this.cells[0].dataset.row = "0"
      this.cells[1].dataset.row = "1"
      this.cells[2].dataset.row = "1"
      this.cells[3].dataset.row = "1"

      this.cells[0].dataset.col = "7"
      this.cells[1].dataset.col = "5"
      this.cells[2].dataset.col = "6"
      this.cells[3].dataset.col = "7"
      return
    }
    if (this.type == 'O') {

      //COL
      this.cells[0].style.gridColumn = "5 / 6"
      this.cells[1].style.gridColumn = "6 / 7"
      this.cells[2].style.gridColumn = "5 / 6"
      this.cells[3].style.gridColumn = "6 / 7"

      //ROW
      this.cells[0].style.gridRow = "1 / 2"
      this.cells[1].style.gridRow = "1 / 2"
      this.cells[2].style.gridRow = "2 / 3"
      this.cells[3].style.gridRow = "2 / 3"

      //POSITION
      this.cells[0].dataset.row = "0"
      this.cells[1].dataset.row = "0"
      this.cells[2].dataset.row = "1"
      this.cells[3].dataset.row = "1"

      this.cells[0].dataset.col = "5"
      this.cells[1].dataset.col = "6"
      this.cells[2].dataset.col = "5"
      this.cells[3].dataset.col = "6"
      return
    }
    if (this.type == 'S') {
      //COL
      this.cells[0].style.gridColumn = "6 / 7"
      this.cells[1].style.gridColumn = "7 / 8"
      this.cells[2].style.gridColumn = "5 / 6"
      this.cells[3].style.gridColumn = "6 / 7"

      //ROW
      this.cells[0].style.gridRow = "1 / 2"
      this.cells[1].style.gridRow = "1 / 2"
      this.cells[2].style.gridRow = "2 / 3"
      this.cells[3].style.gridRow = "2 / 3"

      this.cells[0].dataset.row = "0"
      this.cells[1].dataset.row = "0"
      this.cells[2].dataset.row = "1"
      this.cells[3].dataset.row = "1"

      this.cells[0].dataset.col = "6"
      this.cells[1].dataset.col = "7"
      this.cells[2].dataset.col = "5"
      this.cells[3].dataset.col = "6"
      return
    }
    if (this.type == 'T') {
      //COL
      this.cells[0].style.gridColumn = "6 / 7"
      this.cells[1].style.gridColumn = "5 / 6"
      this.cells[2].style.gridColumn = "6 / 7"
      this.cells[3].style.gridColumn = "7 / 8"

      //ROW
      this.cells[0].style.gridRow = "1 / 2"
      this.cells[1].style.gridRow = "2 / 3"
      this.cells[2].style.gridRow = "2 / 3"
      this.cells[3].style.gridRow = "2 / 3"

      this.cells[0].dataset.row = "0"
      this.cells[1].dataset.row = "1"
      this.cells[2].dataset.row = "1"
      this.cells[3].dataset.row = "1"

      this.cells[0].dataset.col = "6"
      this.cells[1].dataset.col = "5"
      this.cells[2].dataset.col = "6"
      this.cells[3].dataset.col = "7"
      return
    }
    if (this.type == 'Z') {
      //COL
      this.cells[0].style.gridColumn = "5 / 6"
      this.cells[1].style.gridColumn = "6 / 7"
      this.cells[2].style.gridColumn = "6 / 7"
      this.cells[3].style.gridColumn = "7 / 8"

      //ROW
      this.cells[0].style.gridRow = "1 / 2"
      this.cells[1].style.gridRow = "1 / 2"
      this.cells[2].style.gridRow = "2 / 3"
      this.cells[3].style.gridRow = "2 / 3"

      this.cells[0].dataset.row = "0"
      this.cells[1].dataset.row = "0"
      this.cells[2].dataset.row = "1"
      this.cells[3].dataset.row = "1"

      this.cells[0].dataset.col = "5"
      this.cells[1].dataset.col = "6"
      this.cells[2].dataset.col = "6"
      this.cells[3].dataset.col = "7"
      return
    }
  }
}

const tetris = new Tetris('.game')

tetris.start()

window.addEventListener('keydown', event => {
  if (event.code == 'ArrowUp' || event.code == 'KeyW') {
    tetris.rotate()
  }

  if (event.code == 'ArrowLeft' || event.code == 'KeyA') {
    tetris.move('left')
  }
  if (event.code == 'ArrowRight' || event.code == 'KeyD') {
    tetris.move('right')
  }

  if (event.code == 'ArrowDown' || event.code == 'KeyS') {
    tetris.moveDown('down')
  }
})

window.addEventListener("keyup", event => {
  if (event.code == 'ArrowDown' || event.code == 'KeyS') {
    tetris.moveDown('up')
    console.log('up');
  }
  if (event.code == 'Space') {
    tetris.pause()
  }
})