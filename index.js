/************************************************
                VARIABLES
************************************************/
const navbar = document.querySelector("#navbar");
const canvas = document.querySelector("#canvas");
const rightBtn = document.querySelector("#right-btn")
const leftBtn = document.querySelector("#left-btn")
const project1 = document.querySelector("#project1")
const project2 = document.querySelector("#project2")
const project3 = document.querySelector("#project3")
//              grey                        light pink                    light pink                  light absolute                light absolute            dark grey              light blue grey               another light blue grey     dark blue                  dark blue
const colors = ["rgba(197, 201, 203, 0.6)", "rgba(245, 206, 206, 0.6)", "rgba(250, 232, 232, 0.6)", "rgba(215, 225, 232, 0.6)", "rgba(193, 209, 220, 0.6)", "rgba(45, 58, 66, 0.6)", "rgba(232, 242, 250, 0.6)", "rgba(211, 233, 240, 0.6)", "rgba(173, 212, 237, 0.6)", "rgba(109, 157, 194, 0.6)"]
const colors2 = ["rgba(197, 201, 203, 1)", "rgba(245, 206, 206, 1)", "rgba(250, 232, 232, 1)", "rgba(215, 225, 232, 1)", "rgba(193, 209, 220, 1)", "rgba(45, 58, 66, 1)","rgba(240, 179, 179, 1)", "rgba(230, 193, 181, 1)", "rgba(173, 212, 237, 1)", "rgba(109, 157, 194, 1)"]


let c = canvas.getContext("2d")
let sticky = navbar.offsetTop;
let circles = []
let welcome = []
let paragraph = []

let textx = 350 // x position at which the text will start
let texty = 400 // y position at which the text will fall

let mouse = {
  x: 0,
  y: 0
}

let project = 1

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

window.addEventListener("load", drawText)

rightBtn.addEventListener("click", () => {
  if(project === 3) {
    project = 1
  } else (
    project += 1
  )
  displayProject()
})

leftBtn.addEventListener("click", () => {
  if(project === 1) {
    project = 3
  } else (
    project -= 1
  )
  displayProject()
})


/************************************************
                  CLASSES
************************************************/
class Circle {
  constructor(x, y, z) {
    this.x = x
    this.dx = (Math.random() - 0.5) * 4
    this.y = y
    this.dy = (Math.random() - 0.5) * 4
    this.z = z
    this.r = Math.floor(Math.random() * Math.floor(7)) + 3
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

    if(mouse.x - this.x < 100 && mouse.x - this.x > -100 && mouse.y - this.y + window.pageYOffset < 100 && mouse.y - this.y + window.pageYOffset > -100) {
      this.x += -this.dx*100
      this.y += -this.dy*100
      // this.draw2()
    } else {
      this.x += this.dx
      this.y += this.dy

    }
    this.draw()
  }
}

class Text {
  constructor(letter, endx, endy) {
    this.letter = letter
    this.x = endx - Math.floor(Math.random() * (3) + 1) * 100
    // this.y = Math.floor(Math.random() * (8) + 1) * 100
    this.y = endy
    this.ex = endx
    this.color = 0
  }

  draw() {
    c.beginPath()
    c.arc(this.ex + 70, this.y - 60, 50, 0, Math.PI * 2, false)
    c.fillStyle = "rgba(255,255,255,0.8)"
    c.fill()
    // c.fillRect(this.ex + 20, this.y - 100, 100, 100)

    c.font = "160px Fredericka the Great";
    c.strokeStyle = `rgba(67, 75, 82, ${this.color})`;
    c.strokeText(this.letter, this.x, this.y);
  }

  move() {
    if(this.x < this.ex) {
      this.x += 5
    } else if (this.x > this.ex) {
      this.x -= 5
    }

    if(this.color < 1){
      this.color += 0.005
    }

    this.draw()
  }

}

class Paragraph {
  constructor(text, x, y) {
    this.text = text
    this.x = x
    this.y = y
    this.color = 0
  }

  draw() {
    c.font = "30px Waiting for the Sunrise";
    c.fillStyle = `rgba(67, 75, 82, ${this.color})`;
    c.fillText(this.text, this.x, this.y);
  }

  move() {
    if(this.color < 0.7) {
      this.color += 0.01
    }
    this.draw()
  }
}

/************************************************
                OBJECT CREATIONS
************************************************/
function makeCircles() {
  for (var i = 0; i < 3; i++) {
    if(circles.length < 600) {
      circles.push(new Circle(Math.floor(Math.random() * (1580 - 50 + 1)) + 50, Math.floor(Math.random() * (850 - 50 + 1)) + 50, Math.floor(Math.random() * Math.floor(10))))
    }
  }
}

setInterval(makeCircles, 100)

function drawText() {
  welcome.push(new Text("W", textx, texty))
  welcome.push(new Text("E", textx + 160, texty))
  welcome.push(new Text("L", textx + 280, texty))
  welcome.push(new Text("C", textx + 400, texty))
  welcome.push(new Text("O", textx + 510, texty))
  welcome.push(new Text("M", textx + 620, texty))
  welcome.push(new Text("E", textx + 780, texty))
}

paragraph.push(new Paragraph("Linya Hu is a budding software developer based in Brooklyn, NY.", textx + 50, texty + 100))
paragraph.push(new Paragraph("Something else blah blah blah and other stuff", textx + 50, texty + 150))
paragraph.push(new Paragraph("just to show some interesting stuff and personality and a bit of other things", textx + 50, texty + 200))
paragraph.push(new Paragraph("to sell myself, but this is supposed to be fun as well as professional", textx + 50, texty + 250))



/************************************************
                FUNCTIONS
************************************************/
function addStickyNav() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
    navbar.classList.remove("initial");

    welcome = []
    circles = []

  } else {
    navbar.classList.remove("sticky");
    navbar.classList.add("initial");

    if(welcome.length === 0){
      drawText()
    }
  }
}

function animate() {
  requestAnimationFrame(animate)

  c.clearRect(0,0,1600,900)
  circles.forEach( circle => {
    circle.move()
  })

  welcome.forEach( letter => {
    letter.move()
  })

  if(circles.length > 50) {
    paragraph.forEach( sentence => {
      sentence.move()
    })
  }
}

function displayProject() {
  if(project === 1) {
    project1.classList.remove("hidden")
    project2.classList.add("hidden")
    project3.classList.add("hidden")
  } else if (project === 2) {
    project1.classList.add("hidden")
    project2.classList.remove("hidden")
    project3.classList.add("hidden")
  } else if (project === 3) {
    project1.classList.add("hidden")
    project2.classList.add("hidden")
    project3.classList.remove("hidden")
  }
}

animate()

// welcome.draw()
