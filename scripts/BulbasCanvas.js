const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d")
var imagesBuffer = []
var settings
function rect(x, y, w, h, fillColor, strokeColor, strokeSize, round, centered) {
    try {
        ctx.beginPath()
        ctx.strokeStyle = strokeColor
        ctx.fillStyle = fillColor
        ctx.lineWidth = strokeSize

        pasteX = x
        pasteY = y
        if (centered) pasteX = x - w/2; pasteY = y - h/2
        if (round > 0) {
            ctx.roundRect(pasteX, pasteY, w, h, round)
        } else {
            ctx.rect(pasteX, pasteY, w, h)
        }

        ctx.fill()
        if (strokeColor, strokeSize){
            ctx.stroke()
        }
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

    ctx.drawImage(thisImage, x - thisImage.width/2, y - thisImage.height / 2)
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

function bufferImageInfo(id, info){
    if (info == "w"){
        return imagesBuffer[id].width
    }
    if (info == "h"){
        return imagesBuffer[id].height
    }
}

function drawImageFromBuffer(id, x, y, w, h) {
    if (w == undefined) w = id.width
    if (h == undefined) h = id.height
    try { ctx.drawImage(imagesBuffer[id], x - imagesBuffer[id].width/2, y - imagesBuffer[id].height / 2, w, h); } catch (e) { console.warn(e) }
}

function path(points, color, thickness, cap) {
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineCap = cap
    if (cap === undefined)ctx.lineCap = 'round'

    ctx.lineWidth = thickness
    ctx.moveTo(points[0].x, points[0].y)
    points.forEach(i => {
        ctx.lineTo(i.x, i.y)
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

function getPrefferedAxis(h,w) {
    let renderHeight = h
    let renderWidth = w
    try {
        if (renderHeight > renderWidth) {
            prefAX = renderHeight
        } else {
            prefAX = renderWidth
        }
    }catch(e){console.log("Failed to get preffered Axis: " + e + ", Most likely caused by render.js not being loaded yet")}
}

function nineSlice(imageSRC, sliceSize){
    let image = new Image()
    image.src = imageSRC
    const w = image.width
    const h = image.height
    const L = sliceSize.L
    const R = sliceSize.R
    const B = sliceSize.B
    const T = sliceSize.T

    const sliced = {
        tl: [0, 0, L, T],
        t:  [L, 0, w - L - R, T],
        tr: [w - R, 0, R, T],

        l:  [0, T, L, h - T - B],
        c:  [L, T, w - L - R, h - T - B],
        r:  [w - R, T, R, h - T - B],

        bl: [0, h - B, L, B],
        b:  [L, h - B, w - L - R, B],
        br: [w - R, h - B, R, B],
        //You will never undestand this hahaha
    }
    image.remove()
    return sliced
}