addBufferImage("image.png")
addBufferImage("image1.png")
addBufferImage("image2.png")
addBufferImage("bins/1.png")
engineSettings(false)
const debugColors = ["red", "blue", "green", "pink", "orange", "cyan", "black", "white", "gray"]
let predefinedColors = []
for (let i = 0; i < debugColors.length; i++) {
    predefinedColors.push(Math.round((Math.random() * debugColors.length)))
}

function render() {
    const renderWidth = window.innerWidth
    const renderHeight = window.innerHeight
    canvas.height = renderHeight / 1.06
    canvas.width = renderWidth

    canvasResized()

    let prefAX = getPrefferedAxis(renderHeight, renderWidth)

    rect(renderWidth / 2, renderHeight / 2, renderWidth, renderHeight, "#1a201cff", null, null, 0, true)

    const binSize = renderHeight / 16 * 9

    rect(renderWidth / 2, renderHeight / 2, binSize, renderHeight, "#121614ff", null, null, 0, true)

    rect(renderWidth / 2 - binSize / 2, 0 + renderHeight / 10, binSize / 4, renderHeight / 5, debugColors[predefinedColors[0]])
    rect(renderWidth / 2 - binSize / 4, 0 + renderHeight / 10, binSize / 4, renderHeight / 5, debugColors[predefinedColors[1]])
    rect(renderWidth / 2, 0 + renderHeight / 10, binSize / 4, renderHeight / 5, debugColors[predefinedColors[2]])
    rect(renderWidth / 2 + binSize / 4, 0 + renderHeight / 10, binSize / 4, renderHeight / 5, debugColors[predefinedColors[3]])
    rect(renderWidth / 2 - binSize / 2, 0 + renderHeight / 10 + renderHeight/5, binSize / 4, renderHeight / 5, debugColors[predefinedColors[4]])
    rect(renderWidth / 2 - binSize / 4, 0 + renderHeight / 10 + renderHeight/5, binSize / 4, renderHeight / 5, debugColors[predefinedColors[5]])
    rect(renderWidth / 2, 0 + renderHeight / 10 + renderHeight/5, binSize / 4, renderHeight / 5, debugColors[predefinedColors[6]])
    rect(renderWidth / 2 + binSize / 4, 0 + renderHeight / 10 + renderHeight/5, binSize / 4, renderHeight / 5, debugColors[predefinedColors[7]])



    // drawImageFromBuffer(0, 100, 100)
    // drawImageFromBuffer(1, 300, 100)
    // drawImageFromBuffer(2, 100, 500)
    //path([{"x": 100, "y": 100},{"x": 250, "y": 200},{"x": 100, "y": 300}], "red", 10)


    //drawImageFromBuffer(3, 100, 100, bufferImageInfo(3, "w") / 2, bufferImageInfo(3, "h") / 2)

    if (binSize > renderWidth) {
        console.error("Nah")
        rect(renderWidth / 2, renderHeight / 2, renderWidth, renderHeight, "#ffffff")
    }
    requestAnimationFrame(render)
}

