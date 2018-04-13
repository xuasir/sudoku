//生成数独谜盘
const generator = require('./generator');

module.exports = class sudoku {
    constructor() {
        const generator1 = new generator();
        generator1.generate();
        this.solutionMatrix = generator1.matrix;
    }

    make(level = 5) {
        //生成谜盘
        this.puzzleMatrix =
        this.solutionMatrix.map(row => row.map(cell => Math.random() * 9 < level ? 0 : cell));
    }
};