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
let binSize
function render() {
    renderWidth = window.innerWidth
    renderHeight = window.innerHeight
    canvas.height = renderHeight / 1.06
    canvas.width = renderWidth

    canvasResized()

    let prefAX = getPrefferedAxis()

    rect(renderWidth / 2, renderHeight / 2, renderWidth, renderHeight, "#1a201cff", null, null, 0, true)

    binSize = renderHeight / 16 * 9 / 1.1

    rect(renderWidth / 2, renderHeight / 2, binSize * 1.1, renderHeight, "#272f2bff", null, null, 0, true)

    // rect(renderWidth / 2 - binSize / 2, 0 + renderHeight / 10, Math.round(binSize / 4), renderHeight / 5, debugColors[predefinedColors[0]])
    // rect(renderWidth / 2 - binSize / 4, 0 + renderHeight / 10, Math.round(binSize / 4), renderHeight / 5, debugColors[predefinedColors[1]])
    // rect(renderWidth / 2, 0 + renderHeight / 10, Math.round(binSize / 4), renderHeight / 5, debugColors[predefinedColors[2]])
    // rect(renderWidth / 2 + binSize / 4, 0 + renderHeight / 10, Math.round(binSize / 4), renderHeight / 5, debugColors[predefinedColors[3]])
    // rect(renderWidth / 2 - binSize / 2, 0 + renderHeight / 10 + renderHeight/5, Math.round(binSize / 4), renderHeight / 5, debugColors[predefinedColors[4]])
    // rect(renderWidth / 2 - binSize / 4, 0 + renderHeight / 10 + renderHeight/5, Math.round(binSize / 4), renderHeight / 5, debugColors[predefinedColors[5]])
    // rect(renderWidth / 2, 0 + renderHeight / 10 + renderHeight/5, Math.round(binSize / 4), renderHeight / 5, debugColors[predefinedColors[6]])
    // rect(renderWidth / 2 + binSize / 4, 0 + renderHeight / 10 + renderHeight/5, Math.round(binSize / 4), renderHeight / 5, debugColors[predefinedColors[7]])
    // console.log(Math.round(binSize / 4) + "and: " + renderHeight/5)
    drawBins()
    numberTo2DGrid(thisDebb, 4, 5)
    requestAnimationFrame(render)
}

