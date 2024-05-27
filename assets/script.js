let currentColor = 'black';
let brushSize = 5;
let draw = false;
let mouseX = 0;
let mouseY = 0;

let sizeOption = document.querySelector('.advanced');
let screen = document.querySelector('#tela');
let ctx = screen.getContext('2d');

document.querySelector('.brush-size').addEventListener('change', function () {

    (this.value > 500 || this.value < 1) ? this.value = 5 : "";

    activeButton();

    brushSize = this.value;
});

document.querySelectorAll('.btn-brushSize').forEach(btn => {

    btn.addEventListener('click', function () {

        activeButton();

        btn.classList.add('active');
        brushSize = this.value;
    });
});

document.querySelector('#color').addEventListener('change', function () {

    currentColor = this.value;
});

document.querySelector('.btn-advanced').addEventListener('click', function () {

    sizeOption.classList.toggle('advanced');
});

screen.addEventListener('mousedown', function (event) {

    draw = true;

    mouseX = event.pageX - this.offsetLeft;
    mouseY = event.pageY - this.offsetTop;
});

screen.addEventListener('mouseup', function () {

    draw = false;
});

screen.addEventListener('mousemove', function (event) {

    if (draw) {

        activeDraw(event.pageX, event.pageY);
    }
});

document.querySelector('.clear').addEventListener('click', function () {

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
});

function activeButton() {

    const activeElement = document.querySelector('.active');

    if (activeElement)
        activeElement.classList.remove('active');
}

function activeDraw(x, y) {

    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;

    ctx.beginPath();
    ctx.lineWidth = brushSize;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.moveTo(mouseX, mouseY);
    ctx.lineTo(pointX, pointY);
    ctx.closePath();
    ctx.strokeStyle = currentColor;
    ctx.stroke();

    mouseX = pointX;
    mouseY = pointY
}