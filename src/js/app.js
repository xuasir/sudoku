import "../css/common.scss";
const gridbulid = require("./ui/gridbulid").default;
const PopupNum = require("./ui/popupnum");

const grid = new gridbulid($("#container"));
grid.bulidui();

const popupnum = new PopupNum($("#popup"));
grid.bindPopnum(popupnum);

//检查
$("#check").on("click", e => 
    {if(grid.check()){
    alert("游戏完成");
}});

//重置
$("#reset").on("click", e => grid.reset());

//清除
$("#clear").on("click", e => grid.clear());

//重建
$("#rebulid").on("click", e => grid.rebulid());