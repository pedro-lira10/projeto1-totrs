const clockContainer = document.querySelector('.clock-Container')

const updateClock = () => {
    const present = new Date()
    const hours= present.getHours()
    const minutes = present.getMinutes()
    const seconds = present.getSeconds()

    const clokHTML = `  
        <span>${hours}</span>
        <span>${minutes}</span>
        <span>${seconds}</span>
    `

    clockContainer.innerHTML = clokHTML
}

setInterval (updateClock, 1000)



