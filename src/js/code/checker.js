//检查数独算法
function checkArray(array) {
    const length = array.length;
    const marks = new Array(length);
    marks.fill(true);
    for (let i = 0; i < length - 1; i++) {
        //判断是否为 0 
        const v = array[i];
        if (!v) {
            marks[i] = false;
            continue;
        }
        //判断是否重复
        for (let j = i + 1; j < length; j++) {
            if (v === array[j]) {
                marks[i] = marks[j] = false;
            }
        }
    }
    return marks;
};

//开始检查
// 输入：用户提交的matrix
// 检查：检查 行，列，宫
// 输出：是否成功，marks
const toolkit = require('./toolkit');

 module.exports = class checker {
    constructor(matrix) {
        this._matrix = matrix;
        this._matrixMakes = toolkit.matrix.makeMatrix(true);
    }

    get makeMatrix() {
        return this._matrixMakes;
    }

    get isSuccess() {
        return this.isSuccess;
    }

    checker() {
        this.checkRoww();
        this.chexkCol();
        this.checkBox();

        //是否成功
        const isSuccess = this._matrixMakes.every(row => row.every(mark => mark));
        return isSuccess;
    }

    checkRoww() {
        for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
            const marks = checkArray(this._matrix[rowIndex]);
            for (let colIndex = 0; colIndex < marks.length; colIndex++) {
                if (!marks[colIndex]) {
                    this._matrixMakes[rowIndex][colIndex] = false;
                }
            }
        }
    }

    chexkCol() {
        for (let colIndex = 0; colIndex < 9; colIndex++) {
            const cols = [];
            for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
                cols[rowIndex] = this._matrix[rowIndex][colIndex];
            }
            const marks = checkArray(cols);
            for (let rowIndex = 0; rowIndex < marks.length; rowIndex++) {
                if (!marks[rowIndex]) {
                    this._matrixMakes[rowIndex][colIndex] = false;
                }
            }
        }
    }
    checkBox() {
        for (let boxIndex = 0; boxIndex < 9; boxIndex++) {
            const boxs = toolkit.box.getBoxCells(this._matrix, boxIndex);
            const marks = checkArray(boxs);
            for (let cellIndex = 0; cellIndex <9; cellIndex++) {
                if (!marks[cellIndex]) {
                    const {
                        rowIndex,
                        colIndex
                    } = toolkit.box.converFromBoxIndex(boxIndex, cellIndex);
                    this._matrixMakes[rowIndex][colIndex] = false;
                }
            }
        }
    }

};
