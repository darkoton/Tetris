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
    this.interval = 1000
    this.moveInterval
  }

  generete() {
    const type = this.figuresData[Math.trunc(Math.random() * this.figuresData.length)]
    const color = this.colors[Math.trunc(Math.random() * this.colors.length)]


    this.figureFall = new Figure({ color, type: "J" })
    this.figureFall.cells.forEach(cell => {
      this.cup.appendChild(cell)
    })

    this.fall()
  }
  fall() {
    const some = (el) => {
      let neighbor = document.querySelector(`.cell[data-row='${+el.dataset.row + 1}'][data-col='${el.dataset.col}']`)

      if (+el.dataset.row == 21 || (!this.figureFall.cells.includes(neighbor) && neighbor)) {
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
        row = +el.dataset.row
        el.dataset.row = row + 1
        el.style.gridRow = `${+el.dataset.row} / ${+el.dataset.row + 1}`
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
          col = el.dataset.col - 1
          el.dataset.col = col
          el.style.gridColumn = `${col} / ${col + 1}`
        })
      }
    }
    if (direction == 'right') {
      if (!this.figureFall.cells.some(checkWallRight)) {
        this.figureFall.cells.forEach(el => {
          col = +el.dataset.col + 1
          el.dataset.col = col
          el.style.gridColumn = `${col} / ${col + 1}`
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

    this.checkWallLeft = cell => {
      let neighbor = document.querySelector(`.cell[data-row='${cell.dataset.row}'][data-col='${cell.dataset.col - 1}']`)

      return cell.dataset.col == 1 || (!this.cells.includes(neighbor) && neighbor)
    }
    this.checkWallRight = cell => {
      let neighbor = document.querySelector(`.cell[data-row='${cell.dataset.row}'][data-col='${+cell.dataset.col + 1}']`)

      return cell.dataset.col == 10 || (!this.cells.includes(neighbor) && neighbor)
    }

    this.setPosition()
  }
  rotateFigure() {
    const newRotate = (this.rotate % 4) + 1;
    const originalCols = this.cells.map(cell => +cell.dataset.col);
    const originalRows = this.cells.map(cell => +cell.dataset.row);
    const functions = {
      rotateI: this.rotateI,
      rotateJ: this.rotateJ,
      // rotateI: this.rotateI,
      // rotateI: this.rotateI,
      // rotateI: this.rotateI,

    }
    this.rotate = newRotate;
    functions[`rotate${this.type}`].call(this, originalCols, originalRows);


  }
  rotateI(styleCols, styleRows) {
    if (this.rotate == 1 || this.rotate == 3) {
      if (this.cells.some(this.checkWallRight)) {
        styleCols = styleCols.map(el => el - 2)
      }
      //COL
      this.cells[0].style.gridColumn = `${styleCols[0] - 1} / ${styleCols[0]}`
      this.cells[1].style.gridColumn = `${styleCols[1]} / ${styleCols[1] + 1}`
      this.cells[2].style.gridColumn = `${styleCols[2] + 1} / ${styleCols[2] + 2}`
      this.cells[3].style.gridColumn = `${styleCols[3] + 2} / ${styleCols[3] + 3}`

      // //ROW
      this.cells[0].style.gridRow = `${styleRows[0] + 1} / ${styleRows[0] + 2}`
      this.cells[1].style.gridRow = `${styleRows[1]} / ${styleRows[1] + 1}`
      this.cells[2].style.gridRow = `${styleRows[2] - 1} / ${styleRows[2]}`
      this.cells[3].style.gridRow = `${styleRows[3] - 2} / ${styleRows[3] - 1}`

      // //POSITION  
      this.cells[0].dataset.col = styleCols[0] - 1
      this.cells[1].dataset.col = styleCols[1]
      this.cells[2].dataset.col = styleCols[2] + 1
      this.cells[3].dataset.col = styleCols[3] + 2

      this.cells[0].dataset.row = styleRows[0] + 1
      this.cells[1].dataset.row = styleRows[1]
      this.cells[2].dataset.row = styleRows[2] - 1
      this.cells[3].dataset.row = styleRows[3] - 2

      return
    }

    if (this.rotate == 2 || this.rotate == 4) {
      //COL
      this.cells[0].style.gridColumn = `${styleCols[0] + 1} / ${styleCols[0] + 2}`
      this.cells[1].style.gridColumn = `${styleCols[1]} / ${styleCols[1] + 1}`
      this.cells[2].style.gridColumn = `${styleCols[2] - 1} / ${styleCols[2]}`
      this.cells[3].style.gridColumn = `${styleCols[3] - 2} / ${styleCols[3] - 1}`

      //ROW
      this.cells[0].style.gridRow = `${styleRows[0] - 1} / ${styleRows[0]}`
      this.cells[1].style.gridRow = `${styleRows[1]} / ${styleRows[1] + 1}`
      this.cells[2].style.gridRow = `${styleRows[2] + 1} / ${styleRows[2] + 2}`
      this.cells[3].style.gridRow = `${styleRows[3] + 2} / ${styleRows[3] + 3}`

      //POSITION  
      this.cells[0].dataset.col = styleCols[0] + 1
      this.cells[1].dataset.col = styleCols[1]
      this.cells[2].dataset.col = styleCols[2] - 1
      this.cells[3].dataset.col = styleCols[3] - 2

      this.cells[0].dataset.row = styleRows[0] - 1
      this.cells[1].dataset.row = styleRows[1]
      this.cells[2].dataset.row = styleRows[2] + 1
      this.cells[3].dataset.row = styleRows[3] + 2

      return
    }
  }

  rotateJ(styleCols, styleRows) {
    if (this.rotate == 1) {
      if (this.cells.some(this.checkWallRight)) {
        console.log("right");
        styleCols = styleCols.map(el => el - 1)
      }
      //COL
      this.cells[0].style.gridColumn = `${styleCols[0]} / ${styleCols[0] + 1}`
      this.cells[1].style.gridColumn = `${styleCols[1] - 1} / ${styleCols[1]}`
      this.cells[2].style.gridColumn = `${styleCols[2]} / ${styleCols[2] + 1}`
      this.cells[3].style.gridColumn = `${styleCols[3] + 1} / ${styleCols[3] + 2}`

      // //ROW
      this.cells[0].style.gridRow = `${styleRows[0] - 2} / ${styleRows[0] - 1}`
      this.cells[1].style.gridRow = `${styleRows[1] - 1} / ${styleRows[1]}`
      this.cells[2].style.gridRow = `${styleRows[2]} / ${styleRows[2] + 1}`
      this.cells[3].style.gridRow = `${styleRows[3] + 1} / ${styleRows[3] + 2}`

      //POSITION  
      this.cells[0].dataset.col = styleCols[0]
      this.cells[1].dataset.col = styleCols[1] - 1
      this.cells[2].dataset.col = styleCols[2]
      this.cells[3].dataset.col = styleCols[3] + 1

      this.cells[0].dataset.row = styleRows[0] - 2
      this.cells[1].dataset.row = styleRows[1] - 1
      this.cells[2].dataset.row = styleRows[2]
      this.cells[3].dataset.row = styleRows[3] + 1

      return
    }

    if (this.rotate == 2) {
      //COL
      this.cells[0].style.gridColumn = `${styleCols[0] + 2} / ${styleCols[0] + 3}`
      this.cells[1].style.gridColumn = `${styleCols[1] + 1} / ${styleCols[1] + 2}`
      this.cells[2].style.gridColumn = `${styleCols[2]} / ${styleCols[2] + 1}`
      this.cells[3].style.gridColumn = `${styleCols[3] - 1} / ${styleCols[3]}`

      // //ROW
      this.cells[0].style.gridRow = `${styleRows[0]} / ${styleRows[0] + 1}`
      this.cells[1].style.gridRow = `${styleRows[1] - 1} / ${styleRows[1]}`
      this.cells[2].style.gridRow = `${styleRows[2]} / ${styleRows[2] + 1}`
      this.cells[3].style.gridRow = `${styleRows[3] + 1} / ${styleRows[3] + 2}`

      //POSITION  
      this.cells[0].dataset.row = styleRows[0]
      this.cells[1].dataset.row = styleRows[1] - 1
      this.cells[2].dataset.row = styleRows[2]
      this.cells[3].dataset.row = styleRows[3] + 1

      this.cells[0].dataset.col = styleCols[0] + 2
      this.cells[1].dataset.col = styleCols[1] + 1
      this.cells[2].dataset.col = styleCols[2]
      this.cells[3].dataset.col = styleCols[3] - 1

      return
    }
    if (this.rotate == 3) {
      //COL
      this.cells[0].style.gridColumn = `${styleCols[0]} / ${styleCols[0] + 1}`
      this.cells[1].style.gridColumn = `${styleCols[1] + 1} / ${styleCols[1] + 2}`
      this.cells[2].style.gridColumn = `${styleCols[2]} / ${styleCols[2] + 1}`
      this.cells[3].style.gridColumn = `${styleCols[3] - 1} / ${styleCols[3]}`

      // //ROW
      this.cells[0].style.gridRow = `${styleRows[0] + 2} / ${styleRows[0] + 3}`
      this.cells[1].style.gridRow = `${styleRows[1] + 1} / ${styleRows[1] + 2}`
      this.cells[2].style.gridRow = `${styleRows[2]} / ${styleRows[2] + 1}`
      this.cells[3].style.gridRow = `${styleRows[3] - 1} / ${styleRows[3]}`

      //POSITION  
      this.cells[0].dataset.col = styleCols[0]
      this.cells[1].dataset.col = styleCols[1] + 1
      this.cells[2].dataset.col = styleCols[2]
      this.cells[3].dataset.col = styleCols[3] - 1

      this.cells[0].dataset.row = styleRows[0] + 2
      this.cells[1].dataset.row = styleRows[1] + 1
      this.cells[2].dataset.row = styleRows[2]
      this.cells[3].dataset.row = styleRows[3] - 1

      return
    }
    if (this.rotate == 4) {
      //COL
      this.cells[0].style.gridColumn = `${styleCols[0] - 2} / ${styleCols[0] - 1}`
      this.cells[1].style.gridColumn = `${styleCols[1] - 1} / ${styleCols[1]}`
      this.cells[2].style.gridColumn = `${styleCols[2]} / ${styleCols[2] + 1}`
      this.cells[3].style.gridColumn = `${styleCols[3] + 1} / ${styleCols[3] + 2}`

      // //ROW
      this.cells[0].style.gridRow = `${styleRows[0]} / ${styleRows[0] + 1}`
      this.cells[1].style.gridRow = `${styleRows[1] + 1} / ${styleRows[1] + 2}`
      this.cells[2].style.gridRow = `${styleRows[2]} / ${styleRows[2] + 1}`
      this.cells[3].style.gridRow = `${styleRows[3] - 1} / ${styleRows[3]}`

      //POSITION  
      this.cells[0].dataset.col = styleCols[0] - 2
      this.cells[1].dataset.col = styleCols[1] - 1
      this.cells[2].dataset.col = styleCols[2]
      this.cells[3].dataset.col = styleCols[3] + 1

      this.cells[0].dataset.row = styleRows[0]
      this.cells[1].dataset.row = styleRows[1] + 1
      this.cells[2].dataset.row = styleRows[2]
      this.cells[3].dataset.row = styleRows[3] - 1

      return
    }
  }
  setPosition(styleCols = null, styleRows = null) {
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
      this.cells[0].dataset.col = "4"
      this.cells[1].dataset.col = "5"
      this.cells[2].dataset.col = "6"
      this.cells[3].dataset.col = "7"

      this.cells[0].dataset.row = "1"
      this.cells[1].dataset.row = "1"
      this.cells[2].dataset.row = "1"
      this.cells[3].dataset.row = "1"

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
      this.cells[0].dataset.col = "5"
      this.cells[1].dataset.col = "5"
      this.cells[2].dataset.col = "6"
      this.cells[3].dataset.col = "7"

      this.cells[0].dataset.row = "1"
      this.cells[1].dataset.row = "2"
      this.cells[2].dataset.row = "2"
      this.cells[3].dataset.row = "2"

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
      this.cells[0].dataset.col = "7"
      this.cells[1].dataset.col = "5"
      this.cells[2].dataset.col = "6"
      this.cells[3].dataset.col = "7"

      this.cells[0].dataset.row = "1"
      this.cells[1].dataset.row = "2"
      this.cells[2].dataset.row = "2"
      this.cells[3].dataset.row = "2"

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
      this.cells[0].dataset.col = "5"
      this.cells[1].dataset.col = "6"
      this.cells[2].dataset.col = "5"
      this.cells[3].dataset.col = "6"

      this.cells[0].dataset.row = "1"
      this.cells[1].dataset.row = "1"
      this.cells[2].dataset.row = "2"
      this.cells[3].dataset.row = "2"

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

      this.cells[0].dataset.col = "6"
      this.cells[1].dataset.col = "7"
      this.cells[2].dataset.col = "5"
      this.cells[3].dataset.col = "6"

      this.cells[0].dataset.row = "1"
      this.cells[1].dataset.row = "1"
      this.cells[2].dataset.row = "2"
      this.cells[3].dataset.row = "2"

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

      this.cells[0].dataset.col = "6"
      this.cells[1].dataset.col = "5"
      this.cells[2].dataset.col = "6"
      this.cells[3].dataset.col = "7"

      this.cells[0].dataset.row = "1"
      this.cells[1].dataset.row = "2"
      this.cells[2].dataset.row = "2"
      this.cells[3].dataset.row = "2"

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

      this.cells[0].dataset.col = "5"
      this.cells[1].dataset.col = "6"
      this.cells[2].dataset.col = "6"
      this.cells[3].dataset.col = "7"

      this.cells[0].dataset.row = "1"
      this.cells[1].dataset.row = "1"
      this.cells[2].dataset.row = "2"
      this.cells[3].dataset.row = "2"

      return
    }
  }
}

const tetris = new Tetris('.game')

tetris.start()

window.addEventListener('keydown', event => {
  if (event.code == 'ArrowUp' || event.code == 'KeyW') {
    tetris.figureFall.rotateFigure();
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
  }
  if (event.code == 'Space') {
    tetris.pause()
  }
})