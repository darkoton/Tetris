class O extends Figure {
    constructor(color) {
        super({ color });

        this.setPosition()
    }

    setPosition() {
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
    }

    rotateFigure() {
    }
}