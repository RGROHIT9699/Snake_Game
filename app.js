let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')

let cell = 50;
let snake = [[0,0]];
let dir = 'right';

let sc = 0;

let go = false;

let food = generateFood();

let inte = setInterval(function(){
        update();
        draw();
},100)

document.addEventListener('keydown',function(eve){
    if(eve.key === 'ArrowDown'){
        dir = 'down';
    } 
    else if(eve.key === 'ArrowUp') {
        dir = 'up';
    }
    else if(eve.key === 'ArrowLeft') {
        dir = 'left';
    } 
    else {
        dir = 'right';  
    }
    
})

function draw () {
    if(go === true) {
        clearInterval(inte);
        ctx.fillStyle = 'red';
        ctx.font = '50px monospace';
        ctx.fillText('GAME OVER!!', canvas.width / 2 - 100, canvas.height /2);
        return;
        // 
    }
    ctx.clearRect(0,0,1000,600);
    for(let ce of snake) {
        ctx.fillStyle = '#b9c8a6'
        ctx.fillRect(ce[0],ce[1],cell,cell);
        ctx.strokeStyle = '#4d4302'
        ctx.strokeRect(ce[0],ce[1],cell,cell);
    }
    
    ctx.fillStyle = '#FEF9D9'
    ctx.fillRect(food[0],food[1],cell,cell);
    
    ctx.fillStyle = '#6e578c'
    ctx.font = '24px monospace';
    ctx.fillText(`Score: ${sc }`,25,25)

}

function update() {
    let hx = snake[snake.length-1][0];
    let hy = snake[snake.length-1][1];
    let newhx;
    let newhy;
    if(dir === 'right') {
        newhx = hx+ cell;
        newhy = hy;
        if(newhx === 1000 || del(newhx,newhy)) {
            go = true;
        }
    } else if (dir === 'left') {
        newhx = hx - cell;
        newhy = hy;
        if(newhx <0 || del(newhx,newhy)) {
            go = true;
        }
    } else if (dir === 'up') {
        newhx = hx;
        newhy = hy - cell;
        if(newhy <0 || del(newhx,newhy)){
            go = true;
        }
    } else {
        newhx = hx;
        newhy = hy + cell;
        if(newhy ===600 || del(newhx,newhy)){
            go = true;
        }
    }
    snake.push([newhx,newhy]);
    if(newhx === food[0] && newhy === food[1]) {
        food = generateFood();
        sc += 1;
    } else {
        snake.shift();
    }
}

function generateFood() {
    return [
        Math.round(Math.random()*(1000-cell) / cell) * cell,
        Math.round(Math.random()*(600-cell) / cell) * cell ,
    ]
}

function del (newhx,newhy) {
    for (let i of snake) {
        if(i[0] === newhx && i[1] === newhy) {
            return true;
        } 
    }
    return false;
}