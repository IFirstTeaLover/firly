addBufferImage("bins/bg.png")
addBufferImage("bins/1.png")
addBufferImage("bins/2.png")
addBufferImage("bins/3.png")
addBufferImage("bins/4.png")
engineSettings(true)
const debugColors = ["red", "blue", "green", "pink", "orange", "cyan", "black", "white", "gray"]
let predefinedColors = []
for (let i = 0; i < debugColors.length; i++) {
    predefinedColors.push(Math.round((Math.random() * debugColors.length)))
}
let thisDebb = 1
let renderWidth = window.innerWidth
let renderHeight = window.innerHeight
let binViewSize
function render() {
    renderWidth = window.innerWidth
    renderHeight = window.innerHeight
    canvas.height = renderHeight / 1.06
    canvas.width = renderWidth

    canvasResized()

    let prefAX = getPrefferedAxis()

    rect(renderWidth / 2, renderHeight / 2, renderWidth, renderHeight, "#1a201cff", null, null, 0, true)

    binViewSize = renderHeight / 16 * 9 / 1.1

    rect(renderWidth / 2, renderHeight / 2, binViewSize * 1.1, renderHeight, "#272f2bff", null, null, 0, true)

    drawBins()
    numberTo2DGrid(thisDebb, 4, 5)
    requestAnimationFrame(render)
}

