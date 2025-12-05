const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d")
var imagesBuffer = []
var settings
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
    ctx.closePath()
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

function addBufferImage(source) {
    try {
        let thisImage = null
        for (const img of imagesBuffer) {
            if (img.src === new URL(source, window.location.href).href) {
                thisImage = img;
                throw new Error("Image was already buffered!!! It WILL blow up if you dont fix it...")
                break;
            }
        }

        if (!thisImage) {
            thisImage = new Image()
            thisImage.dataset = { src: (window.location.href).href };
            thisImage.src = source
            imagesBuffer.push(thisImage)
        }
    } catch (e) { console.warn(e) }
}

function drawImageFromBuffer(id, x, y) {
    try { ctx.drawImage(imagesBuffer[id], x, y); } catch (e) { console.warn(e) }
}

function path(points, color, thickness) {
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineWidth = thickness
    ctx.moveTo(points[0].x, points[0].y)
    points.forEach(i => {
        ctx.lineTo(points[i].x, points[i].y)
    });
    ctx.stroke()
    ctx.closePath()
}

function engineSettings(ise) {
    ctx.imageSmoothingEnabled = ise
    settings = ise
}

function canvasResized() {
    engineSettings(settings)
}

function getPrefferedAxis() {
    try {
        if (renderHeight > renderWidth) {
            prefAX = renderHeight
        } else {
            prefAX = renderWidth
        }
    }catch(e){"Failed to get preffered Axis: " + e + " Most likely caused by render.js not being loaded yet"}
}
