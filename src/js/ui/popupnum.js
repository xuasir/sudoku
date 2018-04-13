//弹出面板
module.exports = class PopupNum {

    constructor($pop) {
        this._$pop = $pop.hide().removeClass("hidden");

        this._$pop.on("click","span",e =>{
            const $cell = this._targetCell;
            const $span = $(e.target);
            //点击回填样式
            if($span.hasClass("mark1")){
                if($cell.hasClass("mark1")){
                    $cell.removeClass("mark1");
                }else{
                    $cell.removeClass("mark2");
                    $cell.addClass("mark1");
                }
                return ;
            }
            if ($span.hasClass("mark2")) {
                if ($cell.hasClass("mark2")) {
                    $cell.removeClass("mark2");
                } else {
                    $cell.removeClass("mark1");
                    $cell.addClass("mark2");
                }
                return;
            }
            //点击取消
            if($span.hasClass("cancel")){
                $cell.text(0).addClass("empty");
                return ;
            }
            //点击回填数字
            $cell.text($span.text()).removeClass("empty");
        })
    }
    popup($cell) {
        this._targetCell = $cell;
        const {
            left,
            top
        } = $cell.position();
        let le = `${left}`;
        if(le>205){
            le -= 86;
        }
        this._$pop.css({
            left: le + 'px',
            top: `${top}px`
        }).show();
    }
    pophidden(){
        this._$pop.hide().addClass("hideen");
    }
};