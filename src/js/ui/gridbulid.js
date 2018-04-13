// 构建九宫格的模块
const sudoku = require("../code/sudoku");
const checker = require("../code/checker");

export default class gridbulid {
    constructor(container) {
        this._$container = container; //获取jquery对象
    }
    bulidui() {
        const sudoku1 = new sudoku();
        sudoku1.make();
        const matrix = sudoku1.puzzleMatrix;
        const $cells = matrix.map(rowvalues => rowvalues.map(cellvalues => $("<span>").addClass(cellvalues ? "fixed" : "empty").text(cellvalues))); //生成包含值的span标签集合
        const $div = $cells.map(cells => $("<div>").addClass("row").append(cells)); //生成一个承载span的div集合
        this._$container.append($div); //将div集合插入dom中const $div = $cells.map(cells => $("<div>").addClass("row").append(cells));//生成一个承载span的div集合
    }

    check() {
        this._popupnum.pophidden();
        const date = this._$container.children().map((rowIndex, div) => {
            return $(div).children().map((colIndex, span) => parseInt($(span).text()) || 0);
        }).toArray().map($date => $date.toArray());

        const checkers = new checker(date);
        if(checkers.checker()){
            return true;
        }
        const marks = checkers._matrixMakes;
        this._$container.children()
            .each((rowIndex, div) =>{
                $(div).children()
                    .each((colIndex,span) =>{
                        if(!marks[rowIndex][colIndex]){
                            if(!$(span).hasClass("empty")){
                                $(span).addClass("error");}
                        }
                })
            })
    }

    reset() {
        this._popupnum.pophidden();
         this._$container.children()
             .each((rowIndex, div) => {
                 $(div).children()
                     .each((colIndex, span) => {
                         if (!$(span).hasClass("fixed")) {
                             $(span).text(0).addClass("empty");
                         }
                         $(span).removeClass("error");
                     })
             })
    }

    clear() {
        this._popupnum.pophidden();
        this._$container.children()
            .each((rowIndex, div) => {
                $(div).children()
                    .each((colIndex, span) => {
                        if ($(span).hasClass("error")) {
                                $(span).removeClass("error");
                        }
                    })
            })
    }

    rebulid() {
        this._popupnum.pophidden();
        this._$container.empty();
        this.bulidui();
    }
    bindPopnum(popupnum) {
        this._popupnum = popupnum;
        this._$container.on("click", "span", e => {
            const $cell = $(e.target);
            if ($cell.hasClass("fixed")) {
                popupnum.pophidden();
                return;
            }
            popupnum.popup($cell);
        })
    }
};