/************************************************
                VARIABLES
************************************************/
const navbar = document.querySelector("#navbar");
const canvas = document.querySelector("#canvas");
//              grey                        light pink                    light pink                  light absolute                light absolute            dark grey              light blue grey               another light blue grey     dark blue                  dark blue
const colors = ["rgba(197, 201, 203, 0.7)", "rgba(245, 206, 206, 0.7)", "rgba(250, 232, 232, 0.7)", "rgba(215, 225, 232, 0.7)", "rgba(193, 209, 220, 0.7)", "rgba(45, 58, 66, 0.7)", "rgba(232, 242, 250, 0.7)", "rgba(211, 233, 240, 0.7)", "rgba(173, 212, 237, 0.7)", "rgba(109, 157, 194, 0.7)"]
const colors2 = ["rgba(197, 201, 203, 1)", "rgba(245, 206, 206, 1)", "rgba(250, 232, 232, 1)", "rgba(215, 225, 232, 1)", "rgba(193, 209, 220, 1)", "rgba(45, 58, 66, 1)","rgba(240, 179, 179, 1)", "rgba(230, 193, 181, 1)", "rgba(173, 212, 237, 1)", "rgba(109, 157, 194, 1)"]

let c = canvas.getContext("2d")
let sticky = navbar.offsetTop;
let circles = []
let mouse = {
  x: 0,
  y: 0
}

// let height = document.body.clientWidth
// let width = document.body.clientHeight

/************************************************
                EVENT LISTENERS
************************************************/
window.addEventListener("scroll", addStickyNav)

window.addEventListener("mousemove", e => {
  mouse.x = e.x
  mouse.y = e.y
})


/************************************************
                  CLASSES
************************************************/
class Circle {
  constructor(x, y, z) {
    this.x = x
    this.dx = (Math.random() - 0.5) * 3
    this.y = y
    this.dy = (Math.random() - 0.5) * 3
    this.z = z
    this.r = Math.floor(Math.random() * Math.floor(15)) + 5
  }

  draw() {
    c.beginPath()
    c.arc(this.x + this.r, this.y + this.r, this.r, 0, Math.PI * 2, false)
    c.fillStyle = colors[this.z]
    c.fill()
  }

  draw2() {
    c.beginPath()
    c.arc(this.x + this.r, this.y + this.r, this.r, 0, Math.PI * 2, false)
    // c.fillStyle = colors2[this.z]
    c.fillStyle = "rgb(31, 70, 99)"
    c.fill()
  }

  move() {
    if(this.x - this.r< 0 ) {
      this.x += this.r
      this.dx = -this.dx
    } else if (this.x + this.r*2 > 1600) {
      this.x -= this.r
      this.dx = -this.dx
    }

    if(this.y - this.r < 0) {
      this.y += this.r
      this.dy = -this.dy
    } else if (this.y + this.r*2 > 900) {
      this.y -= this.r
      this.dy = -this.dy
    }

    if(mouse.x - this.x < 100 && mouse.x - this.x > -100 && mouse.y - this.y < 100 && mouse.y - this.y > -100) {
      this.x += -this.dx*80
      this.y += -this.dy*80
      // this.draw2()
    } else {
      this.x += this.dx
      this.y += this.dy

    }
    this.draw()
  }
}

class Text {
  constructor() {

  }
}
/************************************************
                OBJECT CREATIONS
************************************************/

for (var i = 0; i < 500; i++) {
  circles.push(new Circle(Math.floor(Math.random() * (1580 - 50 + 1)) + 50, Math.floor(Math.random() * (850 - 50 + 1)) + 50, Math.floor(Math.random() * Math.floor(10))))
}

/************************************************
                FUNCTIONS
************************************************/
function addStickyNav() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
    navbar.classList.remove("initial");
  } else {
    navbar.classList.remove("sticky");
    navbar.classList.add("initial");
  }
}

function animate() {
  requestAnimationFrame(animate)

  c.clearRect(0,0,1600,900)
  circles.forEach( circle => {
    circle.move()
  })
}

animate()
