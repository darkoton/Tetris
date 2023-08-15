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
            rotateL: this.rotateL,
            rotateS: this.rotateS,
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
            this.cells[0].dataset.col = styleCols[0] + 2
            this.cells[1].dataset.col = styleCols[1] + 1
            this.cells[2].dataset.col = styleCols[2]
            this.cells[3].dataset.col = styleCols[3] - 1

            this.cells[0].dataset.row = styleRows[0]
            this.cells[1].dataset.row = styleRows[1] - 1
            this.cells[2].dataset.row = styleRows[2]
            this.cells[3].dataset.row = styleRows[3] + 1


            return
        }
        if (this.rotate == 3) {
            if (this.cells.some(this.checkWallLeft)) {
                console.log("right");
                styleCols = styleCols.map(el => el + 1)
            }
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
    rotateL(styleCols, styleRows) {
        if (this.rotate == 1) {
            if (this.cells.some(this.checkWallRight)) {
                styleCols = styleCols.map(el => el - 1)
            }
            // COL
            this.cells[0].style.gridColumn = `${styleCols[0] + 2} / ${styleCols[0] + 3}`
            this.cells[1].style.gridColumn = `${styleCols[1] - 1} / ${styleCols[1]}`
            this.cells[2].style.gridColumn = `${styleCols[2]} / ${styleCols[2] + 1}`
            this.cells[3].style.gridColumn = `${styleCols[3] + 1} / ${styleCols[3] + 2}`

            //ROW
            this.cells[0].style.gridRow = `${styleRows[0]} / ${styleRows[0] + 1}`
            this.cells[1].style.gridRow = `${styleRows[1] - 1} / ${styleRows[1]}`
            this.cells[2].style.gridRow = `${styleRows[2]} / ${styleRows[2] + 1}`
            this.cells[3].style.gridRow = `${styleRows[3] + 1} / ${styleRows[3] + 2}`

            //POSITION  
            this.cells[0].dataset.col = styleCols[0] + 2
            this.cells[1].dataset.col = styleCols[1] - 1
            this.cells[2].dataset.col = styleCols[2]
            this.cells[3].dataset.col = styleCols[3] + 1

            this.cells[0].dataset.row = styleRows[0]
            this.cells[1].dataset.row = styleRows[1] - 1
            this.cells[2].dataset.row = styleRows[2]
            this.cells[3].dataset.row = styleRows[3] + 1

            return
        }

        if (this.rotate == 2) {
            //COL
            this.cells[0].style.gridColumn = `${styleCols[0]} / ${styleCols[0] + 1}`
            this.cells[1].style.gridColumn = `${styleCols[1] + 1} / ${styleCols[1] + 2}`
            this.cells[2].style.gridColumn = `${styleCols[2]} / ${styleCols[2] + 1}`
            this.cells[3].style.gridColumn = `${styleCols[3] - 1} / ${styleCols[3]}`

            // //ROW
            this.cells[0].style.gridRow = `${styleRows[0] + 2} / ${styleRows[0] + 3}`
            this.cells[1].style.gridRow = `${styleRows[1] - 1} / ${styleRows[1]}`
            this.cells[2].style.gridRow = `${styleRows[2]} / ${styleRows[2] + 1}`
            this.cells[3].style.gridRow = `${styleRows[3] + 1} / ${styleRows[3] + 2}`

            //POSITION  

            this.cells[0].dataset.col = styleCols[0]
            this.cells[1].dataset.col = styleCols[1] + 1
            this.cells[2].dataset.col = styleCols[2]
            this.cells[3].dataset.col = styleCols[3] - 1

            this.cells[0].dataset.row = styleRows[0] + 2
            this.cells[1].dataset.row = styleRows[1] - 1
            this.cells[2].dataset.row = styleRows[2]
            this.cells[3].dataset.row = styleRows[3] + 1

            return
        }
        if (this.rotate == 3) {
            if (this.cells.some(this.checkWallLeft)) {
                styleCols = styleCols.map(el => el + 1)
            }
            //COL
            this.cells[0].style.gridColumn = `${styleCols[0] - 2} / ${styleCols[0] - 1}`
            this.cells[1].style.gridColumn = `${styleCols[1] + 1} / ${styleCols[1] + 2}`
            this.cells[2].style.gridColumn = `${styleCols[2]} / ${styleCols[2] + 1}`
            this.cells[3].style.gridColumn = `${styleCols[3] - 1} / ${styleCols[3]}`

            // //ROW
            this.cells[0].style.gridRow = `${styleRows[0]} / ${styleRows[0] + 1}`
            this.cells[1].style.gridRow = `${styleRows[1] + 1} / ${styleRows[1] + 2}`
            this.cells[2].style.gridRow = `${styleRows[2]} / ${styleRows[2] + 1}`
            this.cells[3].style.gridRow = `${styleRows[3] - 1} / ${styleRows[3]}`

            //POSITION  
            this.cells[0].dataset.col = styleCols[0] - 2
            this.cells[1].dataset.col = styleCols[1] + 1
            this.cells[2].dataset.col = styleCols[2]
            this.cells[3].dataset.col = styleCols[3] - 1

            this.cells[0].dataset.row = styleRows[0]
            this.cells[1].dataset.row = styleRows[1] + 1
            this.cells[2].dataset.row = styleRows[2]
            this.cells[3].dataset.row = styleRows[3] - 1

            return
        }
        if (this.rotate == 4) {
            //COL
            this.cells[0].style.gridColumn = `${styleCols[0]} / ${styleCols[0] + 1}`
            this.cells[1].style.gridColumn = `${styleCols[1] - 1} / ${styleCols[1]}`
            this.cells[2].style.gridColumn = `${styleCols[2]} / ${styleCols[2] + 1}`
            this.cells[3].style.gridColumn = `${styleCols[3] + 1} / ${styleCols[3] + 2}`

            // //ROW
            this.cells[0].style.gridRow = `${styleRows[0] - 2} / ${styleRows[0] - 1}`
            this.cells[1].style.gridRow = `${styleRows[1] + 1} / ${styleRows[1] + 2}`
            this.cells[2].style.gridRow = `${styleRows[2]} / ${styleRows[2] + 1}`
            this.cells[3].style.gridRow = `${styleRows[3] - 1} / ${styleRows[3]}`

            //POSITION  
            this.cells[0].dataset.col = styleCols[0]
            this.cells[1].dataset.col = styleCols[1] - 1
            this.cells[2].dataset.col = styleCols[2]
            this.cells[3].dataset.col = styleCols[3] + 1

            this.cells[0].dataset.row = styleRows[0] - 2
            this.cells[1].dataset.row = styleRows[1] + 1
            this.cells[2].dataset.row = styleRows[2]
            this.cells[3].dataset.row = styleRows[3] - 1

            return
        }
    }
    rotateS(styleCols, styleRows) {
        if (this.rotate == 1 || this.rotate == 3) {
            if (this.cells.some(this.checkWallRight)) {
                styleCols = styleCols.map(el => el - 1)
            }
            //COL
            this.cells[0].style.gridColumn = `${styleCols[0] + 1} / ${styleCols[0] + 2}`
            this.cells[1].style.gridColumn = `${styleCols[1] + 1} / ${styleCols[1] + 2}`
            this.cells[2].style.gridColumn = `${styleCols[2]} / ${styleCols[2] + 1}`
            this.cells[3].style.gridColumn = `${styleCols[3]} / ${styleCols[3] + 1}`

            //ROW
            this.cells[0].style.gridRow = `${styleRows[0] - 1} / ${styleRows[0]}`
            this.cells[1].style.gridRow = `${styleRows[1] - 2} / ${styleRows[1] - 1}`
            this.cells[2].style.gridRow = `${styleRows[2] + 1} / ${styleRows[2] + 2}`
            this.cells[3].style.gridRow = `${styleRows[3]} / ${styleRows[3] + 1}`

            //POSITION  
            this.cells[0].dataset.col = styleCols[0] + 1
            this.cells[1].dataset.col = styleCols[1] + 1
            this.cells[2].dataset.col = styleCols[2]
            this.cells[3].dataset.col = styleCols[3]

            this.cells[0].dataset.row = styleRows[0] - 1
            this.cells[1].dataset.row = styleRows[1] - 2
            this.cells[2].dataset.row = styleRows[2] + 1
            this.cells[3].dataset.row = styleRows[3]
        }

        if (this.rotate == 2 || this.rotate == 4) {
            //COL
            this.cells[0].style.gridColumn = `${styleCols[0] - 1} / ${styleCols[0]}`
            this.cells[1].style.gridColumn = `${styleCols[1] - 1} / ${styleCols[1]}`
            this.cells[2].style.gridColumn = `${styleCols[2]} / ${styleCols[2] + 1}`
            this.cells[3].style.gridColumn = `${styleCols[3]} / ${styleCols[3] + 1}`

            //ROW
            this.cells[0].style.gridRow = `${styleRows[0] + 1} / ${styleRows[0] + 2}`
            this.cells[1].style.gridRow = `${styleRows[1] + 2} / ${styleRows[1] + 3}`
            this.cells[2].style.gridRow = `${styleRows[2] - 1} / ${styleRows[2]}`
            this.cells[3].style.gridRow = `${styleRows[3]} / ${styleRows[3] + 1}`

            //POSITION  
            this.cells[0].dataset.col = styleCols[0] - 1
            this.cells[1].dataset.col = styleCols[1] - 1
            this.cells[2].dataset.col = styleCols[2]
            this.cells[3].dataset.col = styleCols[3]

            this.cells[0].dataset.row = styleRows[0] + 1
            this.cells[1].dataset.row = styleRows[1] + 2
            this.cells[2].dataset.row = styleRows[2] - 1
            this.cells[3].dataset.row = styleRows[3]

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
