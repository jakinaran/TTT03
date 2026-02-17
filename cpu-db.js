/*
Tarkov Graphic Optimizer
File: cpu-db.js
Version: 1.0.0

Initial stable CPU database module
JP: CPUデータベース初期安定版

This file should not be modified unless new CPU models are added.
*/

//////////////////////////
// Intel CPU Data
//////////////////////////

export const intelBase={
"14th Gen":{
i9:{"14900":{tier:5,suffix:["K","KF","F","無印","T","KS"]}},
i7:{"14700":{tier:5,suffix:["K","KF","F","無印","T"]}},
i5:{
"14600":{tier:5,suffix:["K","KF","無印","T"]},
"14500":{tier:5,suffix:["無印","T"]},
"14400":{tier:5,suffix:["F","無印","T"]}
}},
"13th Gen":{
i9:{"13900":{tier:5,suffix:["K","KF","F","無印","T","KS"]}},
i7:{"13700":{tier:5,suffix:["K","KF","F","無印","T"]}},
i5:{
"13600":{tier:5,suffix:["K","KF","無印","T"]},
"13500":{tier:5,suffix:["無印","T"]},
"13400":{tier:5,suffix:["F","無印","T"]}
}},
"12th Gen":{
i9:{"12900":{tier:5,suffix:["K","KF","F","無印","T","KS"]}},
i7:{"12700":{tier:5,suffix:["K","KF","F","無印","T"]}},
i5:{
"12600":{tier:4,suffix:["K","KF","無印","T"]},
"12500":{tier:4,suffix:["無印","T"]},
"12400":{tier:4,suffix:["F","無印","T"]}
}},
"11th Gen":{
i9:{"11900":{tier:4,suffix:["K","KF","F","無印","T"]}},
i7:{"11700":{tier:4,suffix:["K","KF","F","無印","T"]}},
i5:{
"11600":{tier:4,suffix:["K","KF","無印","T"]},
"11500":{tier:4,suffix:["無印","T"]},
"11400":{tier:4,suffix:["F","無印","T"]}
}},
"10th Gen":{
i9:{
"10900":{tier:4,suffix:["K","KF","F","無印","T"]},
"10850":{tier:4,suffix:["K"]}
},
i7:{"10700":{tier:4,suffix:["K","KF","F","無印","T"]}},
i5:{
"10600":{tier:3,suffix:["K","KF","無印","T"]},
"10500":{tier:3,suffix:["無印","T"]},
"10400":{tier:3,suffix:["F","無印","T"]}
}},
"9th Gen":{
i9:{"9900":{tier:3,suffix:["K","KF","無印","T","KS"]}},
i7:{"9700":{tier:3,suffix:["K","KF","F","無印","T"]}},
i5:{
"9600":{tier:3,suffix:["K","KF","無印","T"]},
"9500":{tier:3,suffix:["F","無印","T"]},
"9400":{tier:3,suffix:["F","無印","T"]}
}
},
"8th Gen":{
i7:{
"8700":{tier:3,suffix:["K","無印","T"]},
"8086":{tier:3,suffix:["K"]}
},
i5:{
"8600":{tier:2,suffix:["K","無印","T"]},
"8500":{tier:2,suffix:["無印","T"]},
"8400":{tier:2,suffix:["無印","T"]}
}
}
};

//////////////////////////
// AMD CPU Data
//////////////////////////

export const amdBase={
"3000":{
"Ryzen 9":{"3950":{tier:4,suffix:["X"]},"3900":{tier:4,suffix:["X","XT","無印"]}},
"Ryzen 7":{"3800":{tier:3,suffix:["X","XT"]},"3700":{tier:3,suffix:["X"]}},
"Ryzen 5":{"3600":{tier:3,suffix:["X","XT","無印"]},"3500":{tier:2,suffix:["X","無印"]},"3400":{tier:2,suffix:["G"]}},
"Ryzen 3":{"3300":{tier:2,suffix:["X"]},"3100":{tier:2,suffix:["無印"]},"3200":{tier:1,suffix:["G"]}}
},
"5000":{
"Ryzen 9":{"5950":{tier:5,suffix:["X"]},"5900":{tier:5,suffix:["X","XT","無印"]}},
"Ryzen 7":{"5800":{tier:4,suffix:["X","XT","X3D"]},"5700":{tier:4,suffix:["X","X3D","無印","G"]}},
"Ryzen 5":{"5600":{tier:3,suffix:["X","X3D","無印","G","GT"]},"5500":{tier:3,suffix:["無印","GT"]}},
"Ryzen 3":{"5300":{tier:2,suffix:["G"]},"5100":{tier:2,suffix:["無印"]}}
},
"7000":{
"Ryzen 9":{"7950":{tier:5,suffix:["X","X3D"]},"7900":{tier:5,suffix:["X","X3D","無印"]}},
"Ryzen 7":{"7800":{tier:5,suffix:["X3D"]},"7700":{tier:4,suffix:["X","無印"]}},
"Ryzen 5":{"7600":{tier:4,suffix:["X","無印","X3D"]},"7500":{tier:3,suffix:["F"]}}
},
"8000":{
"Ryzen 7":{"8700":{tier:4,suffix:["G","F"]}},
"Ryzen 5":{"8600":{tier:3,suffix:["G"]},"8500":{tier:3,suffix:["G"]},"8400":{tier:2,suffix:["F"]}},
"Ryzen 3":{"8300":{tier:2,suffix:["G"]}}
},
"9000":{
"Ryzen 9":{"9950":{tier:5,suffix:["X","X3D"]},"9900":{tier:5,suffix:["X","X3D"]}},
"Ryzen 7":{"9850":{tier:5,suffix:["X3D"]},"9800":{tier:5,suffix:["X3D"]},"9700":{tier:4,suffix:["X","F"]}},
"Ryzen 5":{"9600":{tier:4,suffix:["X","無印"]}}
}
};
