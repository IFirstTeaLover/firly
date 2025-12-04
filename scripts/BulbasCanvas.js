var imagesBuffer = []
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

function image(imageSource, x, y) {
    let thisImage = null
    for (const img of imagesBuffer) {
        if (img.src === new URL(imageSource, window.location.href).href) {
            thisImage = img;
            break;
        }
    }

    if (!thisImage) {
        thisImage = new Image()
        thisImage.src = imageSource
        imagesBuffer.push(thisImage)
    }

    ctx.drawImage(thisImage, x, y)
}