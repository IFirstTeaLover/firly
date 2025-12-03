
function render() {
    ctx.imageSmoothingEnabled = false
    const renderWidth = window.innerWidth
    const renderHeight = window.innerHeight
    canvas.height = renderHeight
    canvas.width = renderWidth
    //ctx.clearRect(0, 0, canvas.width, canvas.height)
    let prefAX
    if (renderHeight > renderWidth){
        prefAX = renderHeight
    }else{
        prefAX = renderWidth
    }
    const iconOffset = prefAX / 190
    rect(0 - prefAX/ 400, renderHeight - renderHeight / 10, renderWidth + prefAX/ 200, renderHeight / 10 + prefAX/ 200, "#1a1a1a", "#121212", prefAX/ 400)
    rect(0 + iconOffset, renderHeight - renderHeight / 10 + iconOffset, renderHeight / 10 - iconOffset * 2, renderHeight / 10 - iconOffset * 2, "#111111ff", "#090909ff", prefAX/ 400, 10)
    for (let index = 1.1; index < 23; index++) {
        rect((0 + iconOffset) * index * 8, renderHeight - renderHeight / 10 + iconOffset, renderHeight / 10 - iconOffset * 2, renderHeight / 10 - iconOffset * 2, "#111111ff", "#090909ff", prefAX/ 400, 10)  
    }
    requestAnimationFrame(render)
}

function rect(x, y, w, h, fillColor, strokeColor, strokeSize, round) {
    try {
        ctx.beginPath()
        ctx.strokeStyle = strokeColor
        ctx.fillStyle = fillColor
        ctx.lineWidth = strokeSize

        if (round > 0) {

            ctx.roundRect(x, y, w, h, round)
        } else {
            ctx.rect(x, y, w, h)
        }

        ctx.fill()
        ctx.stroke()
        ctx.closePath()
    } catch (e) {
        console.warn(e)
    }
}

function circle(x, y, r, fillColor, strokeColor, strokeSize, arc) {
    ctx.beginPath()
    if (!arc) {
        ctx.arc(x, y, r, 0, Math.PI * 2)
    } else {
        if (arc > 1) {
            ctx.arc(x, y, r, 0, arc)
        } else { console.error("Arc is less than one!") }
    }
    ctx.strokeStyle = strokeColor
    ctx.fillStyle = fillColor
    ctx.lineWidth = strokeSize

    ctx.fill()
    ctx.stroke()
}