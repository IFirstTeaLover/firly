addBufferImage("bins/bg.png")
addBufferImage("bins/1.png")
engineSettings(true)
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

    const binSize = renderHeight / 16 * 9 / 1.1

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
    let padding = renderHeight/23
    let binAspect = bufferImageInfo(0, "h") / bufferImageInfo(0, "w")
    let binZoneWidth = renderHeight / 16 * 9
    const startX = renderWidth / 2 - binZoneWidth / 2 / 1.1;
    const binZoneHeight = renderHeight * 0.9;
    const startY = renderHeight / 2 - binZoneHeight / 2 * 1.05;

    const binWidth = (binSize - 3 * padding) / 4;
    const binHeight = binWidth * binAspect;
    for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 4; c++) {

            const x = startX + c * (binWidth + padding);
            const y = startY + r * (binHeight + (padding / 1.2));

            drawImageFromBuffer(0, x, y, binWidth, binHeight);
        }
    }

    for (let r = 0; r < 1; r++) {
        for (let c = 0; c < 2; c++) {

            const x = startX + c * (binWidth + padding);
            const y = startY + r * (binHeight + (padding / 1.2));

            drawImageFromBuffer(1, x, y, binWidth, binHeight);
        }
    }
    
    requestAnimationFrame(render)
}

