/*
Tarkov Graphic Optimizer
File: app.js
Version: 3.2.0
Created: 2026-02-18

Patch:
- Aggressive color logic (green only when different from recommended)
- Red cell priority respected
*/

document.addEventListener("DOMContentLoaded", () => {

const calcBtn = document.getElementById("calcBtn");

function applyColorLogic(){

const ids = [
["rec_tex","agg_tex"],
["rec_shadow","agg_shadow"],
["rec_lod","agg_lod"],
["rec_vis","agg_vis"],
["rec_aa","agg_aa"],
["rec_hbao","agg_hbao"],
["rec_ssr","agg_ssr"]
];

ids.forEach(pair=>{

const rec = document.getElementById(pair[0]);
const agg = document.getElementById(pair[1]);

if(!rec || !agg) return;

if(agg.classList.contains("highlight-warning")) return;

const recVal = rec.innerText.trim();
const aggVal = agg.innerText.trim();

if(recVal !== aggVal){
agg.style.color = "#4caf50";
agg.style.fontWeight = "bold";
}else{
agg.style.color = "";
agg.style.fontWeight = "";
}

});

}

if(calcBtn){
calcBtn.addEventListener("click",()=>{
setTimeout(applyColorLogic,50);
});
}

});
