const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 1080
canvas.height = 680

const gravity = 0.4

c.fillRect(0, 0, canvas.width, canvas.height)

class Sprite {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
        this.height = 150
    }

    draw() {
        c.fillStyle = "blue"
        c.fillRect(this.position.x, this.position.y, 40, this.height)
    }

    update(){
        this.draw()

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if(this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0
        }else this.velocity.y += gravity
        

        
    }
}

// Player e inimigos
const player = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 10
    }
})
player.draw()

const enemy = new Sprite({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 10
    }
})
enemy.draw()


const keys = {
    d: {
        pressed: false
    },
    a: {
        pressed: false
    },
    w: {
        pressed : false
    }
}

let lasKey

// game
function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle ="black"
    c.fillRect(0, 0,canvas.width, canvas.height)

    player.update() 
    enemy.update()

    player.velocity.x = 0

    if (keys.a.pressed && lasKey === 'a')  {
        player.velocity.x = -4
    }else if (keys.d.pressed && lasKey === 'd') {
        player.velocity.x = 4
    }

}
animate()


//  character Move
window.addEventListener('keydown', (event) =>{
    switch (event.key){
        case 'd' :
            keys.d.pressed = true
            lasKey = 'd'
            break
        case 'a' :
            keys.a.pressed = true
            lasKey = 'a'
            break
        case 'w' :
            player.velocity.y = -10
            break
    }
  
})

window.addEventListener('keyup', (event) =>{
    switch (event.key){
        case 'd' :
            keys.d.pressed = false   
            break
        case 'a' :
            keys.a.pressed = false
            break
        case 'w': 
            keys.w.pressed = false
            break
        
    }
  
})

