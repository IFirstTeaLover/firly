addBufferImage("image.png")
addBufferImage("image1.png")
addBufferImage("image2.png")
engineSettings(false)
function render() {
    const renderWidth = window.innerWidth
    const renderHeight = window.innerHeight
    canvas.height = renderHeight
    canvas.width = renderWidth

    canvasResized()
    
    let prefAX = getPrefferedAxis()

    rect(0, 0, renderWidth, renderHeight, "#1a201cff")

    const barSize = prefAX / 5

    drawImageFromBuffer(0, 100, 100)
    drawImageFromBuffer(1, 300, 100)
    drawImageFromBuffer(2, 100, 500)

    requestAnimationFrame(render)
}

