function canvasFunc(width,height,ctx,bgcColor){

ctx.fillRect(0, 0, width, height);
// 随机数
function random(min, max) {
    let num = Math.floor(Math.random() * (max - min) + min);
    if (num === 0) {
        num = 1;
    }
    return num
}
//suijiyanse
function randomColor() {
    return `rgb(${random(0,255)},${random(0,255)},${random(0,255)})`
}
//小球类
function Ball(x, y, vx, vy, size, color, line) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.size = size;
    this.color = color, this.lineColor = line;
}
//绘制函数
Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
}
//更新函数：重复绘制，禁止小球移出画布
Ball.prototype.update = function() {
    if ((this.x + this.size) >= width || (this.x - this.size) <= 0) {
        this.vx = -(this.vx);
    }
    if ((this.y + this.size) >= height || (this.y - this.size) <= 0) {
        this.vy = -(this.vy)
    }
    this.x += this.vx;
    this.y += this.vy;
}

let list = [];
for (let i = 0; i <= 90; i++) {
    let circle = new Ball(
        random(0, width),
        random(0, height),
        random(-6, 6) * (1 / 3.0),
        random(-6, 6) * (1 / 3.0),
        3,
        "rgb(255,255,255)",
        `rgba(${random(0,255)},${random(0,255)},${random(0,255)}`
    )
    list.push(circle);
}

function loopCircle() {
    ctx.fillStyle = bgcColor
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list.length; j++) {
            let lx = list[j].x - list[i].x;
            let ly = list[j].y - list[i].y;
            let LL = Math.sqrt(Math.pow(lx, 2) + Math.pow(ly, 2));

            //比对：当距离满足时，绘制线条，以rgba实现过渡
            if (LL <= 180) {
                ctx.beginPath();
                ctx.strokeStyle = `${list[i].lineColor},${(180-LL)/180})`;

                ctx.moveTo(list[i].x, list[i].y);
                ctx.lineWidth = 1;
                ctx.lineTo(list[j].x, list[j].y);
                ctx.stroke()
            }
        }
        list[i].draw();
        list[i].update();
    }
    requestAnimationFrame(loopCircle);
}
loopCircle()
} 
export default canvasFunc;
