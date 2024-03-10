import { animalRanges, randomIntFromInterval, easeInOutQuad } from './shared.js'

class SpinningWheel {
  constructor() {
    this.canvas = document.getElementById('main-canvas')
    this.ctx = this.canvas.getContext('2d')
    this.dimentions = {
      centerX: window.innerWidth / 2,
      centerY: window.innerHeight / 2
    }
    this.radius = 600
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    window.addEventListener('resize', () => {
      this.dimentions.centerX = window.innerWidth / 2
      this.dimentions.centerY = window.innerHeight / 2
      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight
    })
    this.rotationDegrees = 0
    this.rotationDirection = 1
    this.rotations = 1
    this.spinned = false
    this.currentRotationCount = 0
    this.completed = false
    this.betResult = 0
    this.reseted = false
    this.resetTimeout = null
    this.resetRAF = null
    this.spinGraphics = new Image()
    this.spinGraphics.src = './assets/images/wheel.png'
    this.spinGraphics.addEventListener('load', this.drawWheel.bind(this))
    this.spinningWheelAudio = new Audio()
    this.spinningWheelAudio.src = './assets/songs/spin.mp3'
    this.resetingWheelAudio = new Audio()
    this.resetingWheelAudio.src = './assets/songs/reset.mp3'
  }

  spin(degrees) {
    this.spinningWheelAudio.load()
    this.spinningWheelAudio.play()
    this.rotationDegrees = degrees
    this.spinned = true
  }

  drawArrow() {
    const x = window.innerWidth / 2
    const y = 0
    const size = 50
    const p1 = { x: x - size / 2, y }
    const p2 = { x: x + size / 2, y }
    const p3 = { x: x, y: y + size * 2 }
    this.ctx.beginPath()
    this.ctx.moveTo(p1.x, p1.y)
    this.ctx.lineTo(p2.x, p2.y)
    this.ctx.lineTo(p3.x, (p3.y * p3.y) / 50)
    this.ctx.closePath()
    this.ctx.fillStyle = '#fff'
    this.ctx.fill()
  }

  drawRotatedWheel() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.save()
    this.ctx.translate(this.dimentions.centerX, this.dimentions.centerY)
    const easingFactor = easeInOutQuad(this.currentRotationCount / (this.rotationDegrees * (Math.PI / 180)))
    const easedRotation = easingFactor * this.rotationDegrees * (Math.PI / 180) * this.rotationDirection
    this.ctx.rotate(easedRotation)
    this.ctx.drawImage(
      this.spinGraphics,
      -this.radius / 2,
      -this.radius / 2,
      this.radius,
      this.radius
    )
    this.ctx.restore()
  }

  checkRotationCompletion() {
    if (this.currentRotationCount >= this.rotations * (Math.PI * 2)) {
      document.getElementById('amount-spins').innerText = `${this.rotations} ROTAÇÕES`
      const currentDegree = this.rotations * 360
      this.betResult = this.rotationDegrees - currentDegree
      console.log(this.betResult)
      this.rotations++
    }
  }

  performRotation() {
    if (this.currentRotationCount < this.rotationDegrees * (Math.PI / 180)) return
    this.spinned = false
    this.reseted = false
    for (const range of animalRanges) {
      if (this.betResult > range.min && this.betResult <= range.max) {
        document.getElementById('bet-result').innerText = range.result
        break
      }
    }
    this.resetRotation()
  }

  resetRotation() {
    this.resetTimeout = setTimeout(this.resetRotationLogic.bind(this), 1000)
  }

  resetRotationLogic() {
    this.resetingWheelAudio.load()
    this.resetingWheelAudio.play()
    document.getElementById('bet-result').innerText = ''
    const startTime = Date.now()
    const startRotation = this.currentRotationCount
    const reset = () => {
      const elapsed = Date.now() - startTime
      const easingBackFactor = easeInOutQuad(elapsed / 3000)
      this.currentRotationCount = startRotation * (1 - easingBackFactor)
      if (elapsed < 3000) {
        this.resetRAF = requestAnimationFrame(reset)
        if (!this.reseted) this.reseted = true
        return
      }
      this.currentRotationCount = 0
      this.rotations = 0
      document.getElementById('amount-spins').innerText = `${this.rotations} ROTAÇÕES`
      clearTimeout(this.resetTimeout)
      cancelAnimationFrame(this.resetRAF)
    }
    reset()
  }

  drawWheel() {
    requestAnimationFrame(this.drawWheel.bind(this))
    this.drawRotatedWheel()
    this.drawArrow()
    if (!this.spinned) return
    this.currentRotationCount += 0.2
    this.checkRotationCompletion()
    this.performRotation()
  }
}

const spinningWheel = new SpinningWheel()

document.getElementById('bet').addEventListener('click', () => {
  spinningWheel.spin(randomIntFromInterval(5500, 6500))
})
