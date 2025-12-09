let tabs = []
for (let i = 1; i < 7; i++) {
    tabs.push(document.getElementById("tab" + i))
}


tabs.forEach(i => {
    i.addEventListener("click", () => {
        tabs.forEach(i => {
            i.classList = ""
        })
        i.classList = "active"
    })
})