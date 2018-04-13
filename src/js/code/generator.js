// 生成数独解决方案
const toolkit = require("./toolkit");

module.exports = class generator {

    generate() {
        // 入口方法
        while (!this.innerGenerate()) {

        }
    };

    innerGenerate() {
        this.matrix = toolkit.matrix.makeMatrix();
        this.oder = toolkit.matrix.makeMatrix().map(row => row.map((v, i) => i)).map(row => toolkit.matrix.shffule(row)); //9*9随机列生成
        for (let n = 1; n <= 9; n++) { //按数字1-9循环每列填入
            if (!this.fillNum(n)) {
                return false;
            }
        }
        return true;
    };
        fillNum(n) {
            return  this.fillRow(n, 0);
        };

        fillRow(n, rowIndex) {

            if (rowIndex > 8) {
                return true;
            };

            const row = this.matrix[rowIndex];
            const oders = this.oder[rowIndex];
            for (let i = 0; i < 9; i++) {
                const colIndex = oders[i]; //以随机列的value 去确定所选要 fill的列数
                if (row[colIndex]) { //如果有数字则继续下一列
                    continue;
                };
                // 检查是否可以填写 n 
                if (!toolkit.matrix.fillNumAble(this.matrix, n, rowIndex, colIndex)) {
                    continue;
                };
                row[colIndex] = n;
                //写入成功便递归调用填写下一行
                if (!this.fillRow(n, rowIndex + 1)) { //如果这一行所有列都不能填写会返回false，然后返回上一行 对上一行重新填值
                    row[colIndex] = 0;
                    continue;
                };
                return true;
            }
            return false;
        };
    }