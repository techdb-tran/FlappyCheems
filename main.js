const canvas = document.getElementById('gamezone');
const context = canvas.getContext('2d');
const scoreShow = document.getElementById('score');

//Tạo biến đồ họa
const dogImg = new Image();
const bg = new Image();
const above = new Image();
const below = new Image();
//
dogImg.src = "./imgs/dog.jpg";
bg.src = "./imgs/bg.jpg";
above.src = "./imgs/above.jpg";
below.src = "./imgs/below.jpg";
//
let score = 0;
const HI = 300;
let Iy;

// Vị trí con cheem
const dog = {
    x: canvas.width/5,
    y: canvas.height/2
};

// Vị trí lưới b40
const b40 = [{
    x: canvas.width,
    y: 0
}];

// Tạo hàm run() để loading hình ảnh
function run(){
    context.drawImage(bg, 0, 0);
    context.drawImage(dogImg, dog.x, dog.y);
    for(let i = 0; i < b40.length; i++){
        Iy = above.height + HI;
        context.drawImage(above, b40[i].x, b40[i].y);
        context.drawImage(below, b40[i].x, (b40[i].y + Iy));
        b40[i].x -= 5;
        if(b40[i].x === canvas.width/2){
            b40.push({
                x: canvas.width,
                y: Math.floor(Math.random() * above.height - above.height)
            });
        }
        if(b40[i].x === 0) b40.splice(0, 1); //ống chạm mép biến mất
        if(b40[i].x === dog.x) score++;
        if(dog.y + dogImg.height === canvas.height
        || dog.x + dogImg.width >= b40[i].x && dog.x <= b40[i].x + above.width
        && (dog.y <= b40[i].y + above.height || dog.y + dogImg.height >= b40[i].y + Iy)){
            return;
        }
    }
    scoreShow.innerHTML = "SCORE: " + score;
    dog.y += 3; //con chó ở ngoài tường
    requestAnimationFrame(run);
}

//Nút play
document.addEventListener('keydown', function(){
    dog.y -= 60;
});

run();
