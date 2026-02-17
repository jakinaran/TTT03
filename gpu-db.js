/*
Tarkov Graphic Optimizer
File: gpu-db.js
Version: 1.1.0

Added missing popular GPUs
JP: 人気GPU追加版

This file should not be modified unless new GPU models are added.
*/

export const gpuBase={
NVIDIA:{
GTX:{
"970":{tier:1,gen:900,vram:[4]},
"980":{tier:1,gen:900,vram:[4]},

"1050 Ti":{tier:1,gen:1000,vram:[4]},
"1060 3GB":{tier:1,gen:1000,vram:[3]},
"1060 6GB":{tier:2,gen:1000,vram:[6]},
"1070":{tier:2,gen:1000,vram:[8]},

/* ★ 追加 */
"1080":{tier:3,gen:1000,vram:[8]},
"1080 Ti":{tier:4,gen:1000,vram:[11]},
"1650":{tier:2,gen:1600,vram:[4]},

"1660":{tier:2,gen:1600,vram:[6]},
"1660 Super":{tier:2,gen:1600,vram:[6]},
"1660 Ti":{tier:2,gen:1600,vram:[6]}
},

RTX:{
"2060":{tier:3,gen:2000,vram:[6,12]},
"2060 Super":{tier:3,gen:2000,vram:[8]},
"2070":{tier:3,gen:2000,vram:[8]},
"2070 Super":{tier:3,gen:2000,vram:[8]},
"2080":{tier:4,gen:2000,vram:[8]},
"2080 Super":{tier:4,gen:2000,vram:[8]},

"3050":{tier:2,gen:3000,vram:[6,8]},
"3060":{tier:3,gen:3000,vram:[8,12]},
"3060 Ti":{tier:3,gen:3000,vram:[8]},
"3070":{tier:4,gen:3000,vram:[8]},
"3070 Ti":{tier:4,gen:3000,vram:[8]},
"3080":{tier:4,gen:3000,vram:[10,12]},
"3080 Ti":{tier:4,gen:3000,vram:[12]},

/* ★ 追加 */
"4060":{tier:3,gen:4000,vram:[8]},

"4060 Ti":{tier:5,gen:4000,vram:[8,16]},
"4070":{tier:5,gen:4000,vram:[12]},
"4070 Ti":{tier:5,gen:4000,vram:[12]},
"4070 Ti Super":{tier:5,gen:4000,vram:[16]},
"4080":{tier:5,gen:4000,vram:[16]},
"4090":{tier:5,gen:4000,vram:[24]}
}
},

AMD:{
RX:{

/* ★ 追加 */
"570":{tier:1,gen:400,vram:[4,8]},
"580":{tier:2,gen:400,vram:[4,8]},

"470":{tier:1,gen:400,vram:[4,8]},
"480":{tier:1,gen:400,vram:[4,8]},

"5500 XT":{tier:2,gen:5000,vram:[4,8]},
"5600 XT":{tier:2,gen:5000,vram:[6]},
"5700 XT":{tier:3,gen:5000,vram:[8]},

/* ★ 追加 */
"6500 XT":{tier:2,gen:6000,vram:[4]},

"6600":{tier:3,gen:6000,vram:[8]},
"6600 XT":{tier:3,gen:6000,vram:[8]},
"6650 XT":{tier:3,gen:6000,vram:[8]},
"6700 XT":{tier:4,gen:6000,vram:[12]},
"6800":{tier:4,gen:6000,vram:[16]},

/* ★ 追加 */
"6800 XT":{tier:4,gen:6000,vram:[16]},

"6900 XT":{tier:5,gen:6000,vram:[16]},

"7600":{tier:5,gen:7000,vram:[8]},
"7700 XT":{tier:5,gen:7000,vram:[12]},
"7800 XT":{tier:5,gen:7000,vram:[16]}
}
}
};
