class Figure {
  constructor({ color }) {
    this.color = color
    // this.rotate = [1, 2, 3, 4][Math.trunc(Math.random() * 4)]
    this.rotate = 1
    this.state = "fall"
    this.cells = []
    this.paddCol = 0

    for (let i = 0; i < 4; i++) {
      const cell = document.createElement('span')

      cell.classList.add('cell')
      cell.style.background = this.color
      cell.style.boxShadow = "inset 3px 3px rgba(255, 255, 255, 0.5), inset -3px -3px rgba(0, 0, 0, 0.5)"
      this.cells[i] = cell
    }

    //checkCell - возвращает boolean
    // true - клеток и стены нет,
    // false - клетки или стина есть
    this.checkCell = (center, rows, cols) => {
      let wall = false
      let cells = cols.map((col, index) => {
        if (+center.dataset.col + col < 1 || +center.dataset.col + col > 10) {
          wall = true
        }
        return document.querySelector(`.cell[data-row='${+center.dataset.row + +rows[index]}'][data-col='${+center.dataset.col + +col}']`)
      })
      return cells.every(cell => {
        return !cell && !wall
      })
    }

    this.setPosition()
  }


}
