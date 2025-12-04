
function render() {

    ctx.imageSmoothingEnabled = false
    const renderWidth = window.innerWidth
    const renderHeight = window.innerHeight
    canvas.height = renderHeight
    canvas.width = renderWidth
    let prefAX
    if (renderHeight > renderWidth) {
        prefAX = renderHeight
    } else {
        prefAX = renderWidth
    }

    rect(0,0, renderWidth, renderHeight, "#1a201cff")

    const barSize = prefAX / 5
    
    image("image.png", 100, 100)
    image("image1.png", 300, 100)
    image("image.png", 200, 300)

    requestAnimationFrame(render)
}

