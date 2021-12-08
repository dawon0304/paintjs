const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
//ctx = context

const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = '#2c2c2c';
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;


ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
// 선이 가지는 색을 표시
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
// 선의 굵기를 표시


// ctx.fillStyle = "green";
// ctx.fillRect(50, 20, 100, 49);
// fillRecti(x, y, width, height);

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        // 클릭하지 않고 마우스를 움직였을 때에는 path를 시작하는 것.
        // path는 선.


        ctx.moveTo(x, y);
        // path를 만들면 마우스의 x y좌표로 path를 옮기는 것
        // 마우스를 움직이는 모든 순간에 path를 만든다는 말.
        // path의 시작점은 내 마우스가 있는 곳.
    }else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
    
}


// (클릭하지 않아도) 마우스를 움직이고 있다면 onMouseMove가 실행되고 있는거고 
// painting을 하게되면 ctx.beginPath();  /   ctx.moveTo(x, y); 
// 위 조건문이 적용되지 않고, lineTo를 호출하고, lineTo는 path의 이 전 위치에서 지금 위치까지 선을 만든다.
// 위 조건문들이 있어도, stroke가 없으면 선이 안그어짐. 


function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill"
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
};

function handleCM(event) {
    event.preventDefault();
    
}

function handleSaveClick() {
    const image =canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
};

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
};


