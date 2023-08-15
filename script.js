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


    this.figureFall = new Figure({ color, type: "T" })
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