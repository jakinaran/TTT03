/*
Tarkov Graphic Optimizer
File: app.js
Version: 3.0.2
Created: 2026-02-18

Patch:
- Wrap all logic in DOMContentLoaded to ensure modal buttons work
- Keep help modal + safe highlight logic
*/

import { intelBase, amdBase } from "./cpu-db.js";
import { gpuBase } from "./gpu-db.js";

document.addEventListener("DOMContentLoaded", () => {

//////////////////////////
// DOM
//////////////////////////

const genSelect=document.getElementById("cpuGen");
const gradeSelect=document.getElementById("cpuGrade");
const numberSelect=document.getElementById("cpuNumber");
const suffixSelect=document.getElementById("cpuSuffix");

const gpuSeriesSelect=document.getElementById("gpuSeries");
const gpuNumberSelect=document.getElementById("gpuNumber");
const gpuVramSelect=document.getElementById("gpuVram");
const resolutionSelect=document.getElementById("resolutionSelect");

let currentCpuData=null;
let currentGpuBrand=null;

//////////////////////////
// HELP MODAL
//////////////////////////

const helpSpecBtn=document.getElementById("helpSpecBtn");
const helpResBtn=document.getElementById("helpResBtn");

const helpSpecModal=document.getElementById("helpSpecModal");
const helpResModal=document.getElementById("helpResModal");

const closeSpec=document.getElementById("closeSpec");
const closeRes=document.getElementById("closeRes");

if(helpSpecBtn){
helpSpecBtn.addEventListener("click",()=>helpSpecModal.style.display="block");
}

if(helpResBtn){
helpResBtn.addEventListener("click",()=>helpResModal.style.display="block");
}

if(closeSpec){
closeSpec.addEventListener("click",()=>helpSpecModal.style.display="none");
}

if(closeRes){
closeRes.addEventListener("click",()=>helpResModal.style.display="none");
}

window.addEventListener("click",(e)=>{
if(e.target===helpSpecModal) helpSpecModal.style.display="none";
if(e.target===helpResModal) helpResModal.style.display="none";
});

//////////////////////////
// CPU UI
//////////////////////////

document.querySelectorAll("input[name='brand']").forEach(radio=>{
radio.addEventListener("change",()=>{
resetCpuAll();
currentCpuData=radio.value==="Intel"?intelBase:amdBase;
Object.keys(currentCpuData).forEach(gen=>addOption(genSelect,gen));
genSelect.disabled=false;
});
});

genSelect.addEventListener("change",()=>{
resetCpuBelow(gradeSelect);
if(!genSelect.value)return;
Object.keys(currentCpuData[genSelect.value]).forEach(g=>addOption(gradeSelect,g));
gradeSelect.disabled=false;
});

gradeSelect.addEventListener("change",()=>{
resetCpuBelow(numberSelect);
if(!gradeSelect.value)return;
Object.keys(currentCpuData[genSelect.value][gradeSelect.value])
.forEach(n=>addOption(numberSelect,n));
numberSelect.disabled=false;
});

numberSelect.addEventListener("change",()=>{
resetCpuBelow(suffixSelect);
if(!numberSelect.value)return;
currentCpuData[genSelect.value][gradeSelect.value][numberSelect.value]
.suffix.forEach(s=>addOption(suffixSelect,s));
suffixSelect.disabled=false;
});

function resetCpuAll(){
genSelect.innerHTML='<option value="">選択してください</option>';
gradeSelect.innerHTML='<option value="">選択してください</option>';
numberSelect.innerHTML='<option value="">選択してください</option>';
suffixSelect.innerHTML='<option value="">選択してください</option>';
genSelect.disabled=gradeSelect.disabled=numberSelect.disabled=suffixSelect.disabled=true;
}

function resetCpuBelow(select){
select.innerHTML='<option value="">選択してください</option>';
select.disabled=true;
if(select===gradeSelect)resetCpuBelow(numberSelect);
if(select===numberSelect)resetCpuBelow(suffixSelect);
}

//////////////////////////
// GPU UI
//////////////////////////

document.querySelectorAll("input[name='gpuBrand']").forEach(radio=>{
radio.addEventListener("change",()=>{
currentGpuBrand=radio.value;
resetGpu();
Object.keys(gpuBase[currentGpuBrand])
.forEach(series=>addOption(gpuSeriesSelect,series));
gpuSeriesSelect.disabled=false;
updateGpuNumbers();
});
});

gpuSeriesSelect.addEventListener("change",updateGpuNumbers);
gpuNumberSelect.addEventListener("change",updateGpuVram);

function updateGpuNumbers(){
gpuNumberSelect.innerHTML='<option value="">選択してください</option>';
gpuVramSelect.innerHTML='<option value="">番号選択後に表示</option>';
gpuVramSelect.disabled=true;
if(!currentGpuBrand)return;

let list=[];
const selectedSeries=gpuSeriesSelect.value;

Object.keys(gpuBase[currentGpuBrand]).forEach(series=>{
if(!selectedSeries||selectedSeries===series){
Object.keys(gpuBase[currentGpuBrand][series]).forEach(num=>{
list.push({series,num,...gpuBase[currentGpuBrand][series][num]});
});
}
});

list.sort((a,b)=>{
if(a.gen!==b.gen)return a.gen-b.gen;
return String(a.num).localeCompare(String(b.num));
});

list.forEach(item=>addOption(gpuNumberSelect,item.num));
gpuNumberSelect.disabled=false;
}

function updateGpuVram(){
gpuVramSelect.innerHTML='<option value="">選択してください</option>';
if(!currentGpuBrand||!gpuNumberSelect.value)return;

Object.keys(gpuBase[currentGpuBrand]).forEach(series=>{
if(gpuBase[currentGpuBrand][series][gpuNumberSelect.value]){
gpuBase[currentGpuBrand][series][gpuNumberSelect.value]
.vram.forEach(v=>addOption(gpuVramSelect,v+"GB"));
}
});
gpuVramSelect.disabled=false;
}

function resetGpu(){
gpuSeriesSelect.innerHTML='<option value="">未選択（全表示）</option>';
gpuNumberSelect.innerHTML='<option value="">選択してください</option>';
gpuVramSelect.innerHTML='<option value="">番号選択後に表示</option>';
gpuSeriesSelect.disabled=true;
gpuNumberSelect.disabled=true;
gpuVramSelect.disabled=true;
}

//////////////////////////
// Main
//////////////////////////

document.getElementById("calcBtn").addEventListener("click",()=>{

if(!currentGpuBrand){
alert("GPUメーカーを選択してください");
return;
}

if(!genSelect.value||!gradeSelect.value||!numberSelect.value||!suffixSelect.value||
!gpuNumberSelect.value||!gpuVramSelect.value){
alert("CPU・GPU・VRAMをすべて選択してください");
return;
}

let cpuTier=currentCpuData[genSelect.value][gradeSelect.value][numberSelect.value].tier;
if(suffixSelect.value==="T")cpuTier=Math.max(1,cpuTier-1);

let gpuTier;
let gpuSeries;

Object.keys(gpuBase[currentGpuBrand]).forEach(series=>{
if(gpuBase[currentGpuBrand][series][gpuNumberSelect.value]){
gpuTier=gpuBase[currentGpuBrand][series][gpuNumberSelect.value].tier;
gpuSeries=series;
}
});

const vram=parseInt(gpuVramSelect.value.replace("GB",""));
const resolution=parseInt(resolutionSelect.value);

const settings=calculateSettings(cpuTier,gpuTier,vram,resolution);

const cpuName=
gradeSelect.value+" "+numberSelect.value+
(suffixSelect.value==="無印"?"":suffixSelect.value);

const gpuName=
gpuSeries+" "+gpuNumberSelect.value+
" ("+gpuVramSelect.value+")";

document.getElementById("cpuResult").innerText=cpuName;
document.getElementById("gpuResult").innerText=gpuName;

renderSettings(settings);
renderBalance(cpuTier,gpuTier);
renderWarning(gpuTier,resolution);
applyHighlight(gpuTier,settings,resolution);

});

//////////////////////////
// Warning
//////////////////////////

function renderWarning(gpuTier,resolution){
const box=document.getElementById("warningBox");

if(gpuTier<=2&&resolution===2160){
box.style.display="block";
box.innerHTML='⚠ GPU性能に対して <span class="warn-red">高解像度の為</span> フレームレートが低下する可能性があります';
}else{
box.style.display="none";
}
}

//////////////////////////
// Highlight
//////////////////////////

function applyHighlight(gpuTier, settings, resolution){

const lodCell=document.getElementById("agg_lod");
const visCell=document.getElementById("agg_vis");

if(!lodCell||!visCell)return;

lodCell.classList.remove("highlight-warning");
visCell.classList.remove("highlight-warning");

const weakGPU=(gpuTier<=2);
const highRes=(parseInt(resolution)>=1440);

if(!weakGPU||!highRes)return;

const a=settings.aggressive;

const lodText=mapLOD(a.lod);
const visText=mapVisibility(a.vis);

lodCell.classList.add("highlight-warning");
visCell.classList.add("highlight-warning");

lodCell.innerHTML=lodText+' <span style="font-size:11px;">※解像度を下げると改善する可能性あり</span>';
visCell.innerHTML=visText+' <span style="font-size:11px;">※解像度を下げると改善する可能性あり</span>';

}

//////////////////////////
// Balance
//////////////////////////

function renderBalance(cpuTier,gpuTier){

const diff=cpuTier-gpuTier;
let text="";

if(diff===0){
text="CPU = GPU の傾向 👍（どちらも同程度でボトルネックの心配少なめ）";
}
else if(diff===-1){
text="CPU < GPU の傾向（CPUが少し弱くボトルネックの心配が少しあり）";
}
else if(diff<=-2){
text="CPU << GPU の傾向（CPUが弱くボトルネックの心配があります）";
}
else if(diff===1){
text="CPU > GPU の傾向（GPUが少し弱くボトルネックの心配が少しあり）";
}
else{
text="CPU >> GPU の傾向（GPUが弱くボトルネックの心配があります）";
}

document.getElementById("balanceText").innerText=text;
}

//////////////////////////
// Logic
//////////////////////////

function calculateSettings(cpuTier,gpuTier,vram,resolution){

let baseTier=Math.min(cpuTier,gpuTier);

let penalty=0;
if(gpuTier<=2&&resolution>=1440) penalty=1;
if(gpuTier<=2&&resolution===2160) penalty=2;

const effectiveTier=Math.max(1,baseTier-penalty);

let recommended=getBaseMatrix(effectiveTier);
let aggressive=getBaseMatrix(Math.min(5,effectiveTier+1));

recommended=applyVramLimit(recommended,vram);
aggressive=applyVramLimit(aggressive,vram);

recommended=applyTierSafety(recommended,effectiveTier);
aggressive=applyTierSafety(aggressive,effectiveTier+1);

recommended=applyResolutionLimit(recommended,resolution,gpuTier);
aggressive=applyResolutionLimit(aggressive,resolution,gpuTier);

aggressive=applyColoredUltraLimit(aggressive,gpuTier,vram,true);

return{recommended,aggressive};
}

function getBaseMatrix(tier){

const map={
1:{tex:1,shadow:1,lod:1,vis:2,aa:0,hbao:0,ssr:0},
2:{tex:2,shadow:2,lod:2,vis:3,aa:1,hbao:1,ssr:1},
3:{tex:3,shadow:2,lod:2,vis:4,aa:2,hbao:3,ssr:2},
4:{tex:3,shadow:3,lod:3,vis:5,aa:2,hbao:4,ssr:3},
5:{tex:4,shadow:3,lod:3,vis:5,aa:3,hbao:4,ssr:3}
};

return JSON.parse(JSON.stringify(map[Math.max(1,Math.min(5,tier))]));
}

function applyVramLimit(settings,vram){
if(vram<=4)settings.tex=Math.min(settings.tex,2);
else if(vram<=6)settings.tex=Math.min(settings.tex,3);
return settings;
}

function applyTierSafety(settings,tier){
if(tier>=5){
settings.vis=Math.min(settings.vis,5);
settings.lod=Math.min(settings.lod,3);
settings.shadow=Math.min(settings.shadow,3);
}
return settings;
}

function applyResolutionLimit(settings,resolution,gpuTier){

let maxVis=6;

if(gpuTier<=2) maxVis=3;
else{
if(resolution===1440) maxVis=5;
if(resolution===2160) maxVis=4;
}

settings.vis=Math.min(settings.vis,maxVis);

return settings;
}

function applyColoredUltraLimit(settings,gpuTier,vram,isAggressive){

if(!isAggressive)return settings;

if(gpuTier>=4&&vram>=10){
settings.hbao=5;
}else{
settings.hbao=Math.min(settings.hbao,4);
}

return settings;
}

//////////////////////////
// Mapping
//////////////////////////

function mapTexture(v){
const list=["Low（低）","Medium（中）","High（高）","Ultra（最高）"];
return list[v-1]||"-";
}

function mapShadow(v){
const list=["Low","Medium","High","Ultra"];
return list[v-1]||"-";
}

function mapLOD(v){
const list=["2.0","2.5","3.0","4.0"];
return list[v-1]||"-";
}

function mapVisibility(v){
const list=["400","1000","1500","2000","2500","3000"];
return list[v-1]||"-";
}

function mapAA(v){
const list=["Off（オフ）","FXAA","TAA","TAA High（TAA高）"];
return list[v]||"-";
}

function mapHBAO(v){
const list=["Off（オフ）","Max Performance","High Performance","High","Ultra","Colored Ultra"];
return list[v]||"-";
}

function mapSSR(v){
const list=["Off（オフ）","Low（低）","Medium（中）","High（高）","Ultra（最高）"];
return list[v]||"-";
}

//////////////////////////
// Render
//////////////////////////

function renderSettings(settings){

const r=settings.recommended;
const a=settings.aggressive;

document.getElementById("rec_tex").innerText=mapTexture(r.tex);
document.getElementById("rec_shadow").innerText=mapShadow(r.shadow);
document.getElementById("rec_lod").innerText=mapLOD(r.lod);
document.getElementById("rec_vis").innerText=mapVisibility(r.vis);
document.getElementById("rec_aa").innerText=mapAA(r.aa);
document.getElementById("rec_hbao").innerText=mapHBAO(r.hbao);
document.getElementById("rec_ssr").innerText=mapSSR(r.ssr);

document.getElementById("agg_tex").innerText=mapTexture(a.tex);
document.getElementById("agg_shadow").innerText=mapShadow(a.shadow);
document.getElementById("agg_lod").innerText=mapLOD(a.lod);
document.getElementById("agg_vis").innerText=mapVisibility(a.vis);
document.getElementById("agg_aa").innerText=mapAA(a.aa);
document.getElementById("agg_hbao").innerText=mapHBAO(a.hbao);
document.getElementById("agg_ssr").innerText=mapSSR(a.ssr);
}

//////////////////////////

function addOption(select,value){
const opt=document.createElement("option");
opt.value=value;
opt.textContent=value;
select.appendChild(opt);
}

}); // DOMContentLoaded end
