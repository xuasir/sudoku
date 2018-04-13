// 矩阵生成
const matrixToolkit = {
    //生成行
    makeRow(v = 0) {
        const array = new Array(9);
        array.fill(v);
        return array;
    },
    //生成整个二维数组
    makeMatrix(v) {
        return Array.from({
            length: 9
        }, () => this.makeRow(v)); //Array.from方法传入一个可遍历的为数组，第二个参数为一个 map方法，将每一行数组fill到二维数组
    },
    //洗牌算法 传入数组随机打乱返回乱序后的数组
    shffule(array) {
        const endIndex = array.length - 2;
        for (let i = 0; i <= endIndex; i++) {
            const j = i + Math.floor(Math.random() * (array.length - i)); //随机选取选取当前位置之后的位置
            [array[i], array[j]] = [array[j], array[i]]; //利用es6的数据解构进行交换赋值
        }
        return array;
    },
    //检查当前位置能否填写 n
    fillNumAble(matrix, n, rowIndex, colIndex) {
        const row = matrix[rowIndex];
        const col = this.makeRow().map((v, i) => matrix[i][colIndex]);
        const {
            boxIndex
        } = boxToolkit.converToBoxIndex(rowIndex, colIndex);
        const box = boxToolkit.getBoxCells(matrix, boxIndex);
        for (let i = 0; i < 9; i++) {
            if (row[i] === n || col[i] === n || box[i] === n){
                return false;
            }
            continue;  
        }
        return true;
    }
};
// 宫坐标
const boxToolkit = {
    //获取坐标所在宫的所有cell 以数组形式返回
    getBoxCells(matrix, boxIndex) {
        const rowStartIndex = Math.floor(boxIndex / 3) * 3;
        const colStartIndex = boxIndex % 3 * 3;
        const result = [];
        for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
            const rowIndex = rowStartIndex + Math.floor(cellIndex / 3);
            const colIndex = colStartIndex + cellIndex % 3;
            result.push(matrix[rowIndex][colIndex]);
        }
        return result;
    },
    //行列转宫坐标，宫cell坐标
    converToBoxIndex(rowIndex, colIndex) {
        return {
            boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
            cellIndex: rowIndex % 3 * 3 + colIndex % 3
        }
    },
    //反向转
    converFromBoxIndex(boxIndex, cellIndex) {
        return {
            rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
            colIndex: boxIndex % 3 * 3 + cellIndex % 3
        }
    }
};

// 工具集模块
module.exports = class toolkit {
    static get matrix() {
        return matrixToolkit;
    }
    static get box() {
        return boxToolkit;
    }
}