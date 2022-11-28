var canvas = document.getElementById('gamezone')
var context = canvas.getContext('2d')
var scoreshow = document.getElementById('score')

//Tạo biến đồ họa
var dogimg = new Image();
var bg = new Image();
var above = new Image();
var below = new Image();
//
dogimg.src = "./imgs/dog.jpg"
bg.src = "./imgs/bg.jpg"
above.src = "./imgs/above.jpg"
below.src = "./imgs/below.jpg"
//
var score = 0;
var HI = 170;
var Iy
// Vị trí con cheem
var dog ={
    x: canvas.width/5,
    y: canvas.height/2
}
// Vị trí lưới b40
var b40 = []
b40[0]={
    x:canvas.width,
    y:0
}
// Tạo hàm run() để loading hình ảnh
function run(){
    context.drawImage(bg,0,0)
    context.drawImage(dogimg,dog.x,dog.y)
    for(var i =0;i<b40.length;i++){
        Iy = above.height +HI
        context.drawImage(above,b40[i].x,b40[i].y);
        context.drawImage(below,b40[i].x,(b40[i].y+Iy));
        b40[i].x -=5;
        if(b40[i].x==canvas.width/2){
            b40.push({
                x:canvas.width,
                y:Math.floor(Math.random()*above.height-above.height)
            })
        }
        if(b40[i].x==0)b40.splice(0,1);//ống chạm mép biến mất
        if(b40[i].x==dog.x)score++;
        if(dog.y+dogimg.height==canvas.height
        || dog.x+dogimg.width >= b40[i].x && dog.x <= b40[i].x+above.width
        &&(dog.y <=b40[i].y+above.height||dog.y+dogimg.height>= b40[i].y+Iy)){
            return;
        }
        
    }
    scoreshow.innerHTML="SCORE: "+score
    dog.y+=3;//con chó ở ngoài tường
    requestAnimationFrame(run);

}
//Nút play
document.addEventListener('keydown',function(){
    dog.y-=60;
})
run()