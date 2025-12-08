let bins = []
function drawBins() {
    let padding = renderHeight / 23
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

    let repeats = numberTo2DGrid(bins.length, 4, 5)
    const fullRows = Math.floor(bins.length / 4);
    const other = bins.length % 4
    let index = -1
    for (let r = 0; r < fullRows + (other > 0 ? 1:0); r++) {
        const cols = (r < fullRows) ? 4 : other;
        for (let c = 0; c < cols; c++) {
            index++
            const x = startX + c * (binWidth + padding);
            const y = startY + r * (binHeight + (padding / 1.2));

            drawImageFromBuffer(bins[index], x, y, binWidth, binHeight);
        }
    }
}

setInterval(() => {
    var r = Math.random()
    if (r < 0.25){
        bins.push(1)
    }else if(r > 0.85){
        bins.push(3)
    }else if (r > 0.5){
        bins.push(2)
    }else{
        bins.push(4)
    }
}, 1000);