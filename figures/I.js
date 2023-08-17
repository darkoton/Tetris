class I extends Figure {
    constructor(color) {
        super({ color });

        this.setPosition()
    }

    setPosition() {
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
    }

    rotateFigure() {
        this.rotate = (this.rotate % 4) + 1;
        let styleCols = this.cells.map(cell => +cell.dataset.col);
        let styleRows = this.cells.map(cell => +cell.dataset.row);

        if (this.rotate == 1 || this.rotate == 3) {
            if (this.cells.some(this.checkWallRight)) {
                styleCols = styleCols.map(el => el - 2)
            }
            if (this.cells.some(this.checkWallLeft)) {
                styleCols = styleCols.map(el => el + 1)
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
}