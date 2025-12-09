let bins = []
let binsPositions = []
let binSize = {}
let dragging = { "bin": null, "x": 0, "y": 0 }
function drawBins() {
    let padding = renderHeight / 23
    let binAspect = bufferImageInfo(0, "h") / bufferImageInfo(0, "w")
    let binZoneWidth = renderHeight / 16 * 9
    const startX = renderWidth / 2 - binZoneWidth / 2 / 1.1;
    const binZoneHeight = renderHeight * 0.9;
    const startY = renderHeight / 2 - binZoneHeight / 2 * 1.05;

    const binWidth = (binViewSize - 3 * padding) / 4;
    const binHeight = binWidth * binAspect;
    binSize = { "x": binWidth, "y": binHeight }
    for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 4; c++) {

            const x = startX + c * (binWidth + padding);
            const y = startY + r * (binHeight + (padding / 1.4));
            drawImageFromBuffer(0, x, y, binWidth, binHeight);
        }
    }

    let repeats = numberTo2DGrid(bins.length, 4, 5)
    const fullRows = Math.floor(bins.length / 4);
    const other = bins.length % 4
    let index = -1
    for (let r = 0; r < fullRows + (other > 0 ? 1 : 0); r++) {
        const cols = (r < fullRows) ? 4 : other;
        for (let c = 0; c < cols; c++) {
            index++
            const x = startX + c * (binWidth + padding);
            const y = startY + r * (binHeight + (padding / 1.4));
            if (bins[index].state !== "MOVING") {
                drawImageFromBuffer(bins[index].id, x, y, binWidth, binHeight);
            } else {
                drawImageFromBuffer(bins[index].id, binsPositions[index].x, binsPositions[index].y, binWidth, binHeight)
            }
        }
    }
}

setInterval(() => {
    if (bins.length < 20) {
        bins.push(createBin(1))
        let padding = renderHeight / 23
        let binAspect = bufferImageInfo(0, "h") / bufferImageInfo(0, "w")
        const index = bins.length - 1;
        const row = Math.floor(index / 4);
        const col = index % 4;
        let binZoneWidth = renderHeight / 16 * 9
        const startX = renderWidth / 2 - binZoneWidth / 2 / 1.1;
        const binZoneHeight = renderHeight * 0.9;
        const startY = renderHeight / 2 - binZoneHeight / 2 * 1.05;
        const binWidth = (binViewSize - 3 * padding) / 4;
        const binHeight = binWidth * binAspect;
        const x = startX + col * (binWidth + padding);
        const y = startY + row * (binHeight + (padding / 1.4));

        binsPositions[index] = { x, y };
    }
}, 1000);

canvas.addEventListener("mousedown", function (e) {
    const cx = e.offsetX
    const cy = e.offsetY
    for (let iy = 0; iy < 5; iy++) {
        for (let i = 0; i < 4; i++) {
            let index = iy * 4 + i
            let bin = binsPositions[index]
            if (cx > bin.x && cx < bin.x + binSize.x) {
                if (cy > bin.y && cy < bin.y + binSize.y) {
                    debugInfo("X: " + i + " Y: " + iy + " Full success!")
                    bins.forEach(s => s.state = "IDLE")
                    if (bins[iy * 4 + i]) bins[iy * 4 + i].state = "MOVING"
                    dragging.bin = iy * 4 + i
                    dragging.x = cx - bin.x
                    dragging.y = cy - bin.y
                }
            }
        }

    }
})

canvas.addEventListener("mouseup", (e) => {
    bins[dragging.bin].state = "IDLE"
    dragging.bin = null
})

canvas.addEventListener("mousemove", (e) => {
    if (dragging.bin === null) return
    const cx = e.offsetX
    const cy = e.offsetY

    binsPositions[dragging.bin].x = cx - dragging.x
    binsPositions[dragging.bin].y = cy - dragging.y

})

function createBin(n) {
    return {
        "state": "IDLE",
        "id": n
    }

}