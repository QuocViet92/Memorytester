let i = 0
let count = 0
let b, d, z, c, arrayOfPairs, myTime
const arrRadom = []
let dataMemory = []
const text = document.getElementById('inner-Text')
const bienso = document.getElementById('select-content')
const a = document.getElementById('so-muc')
const g = document.getElementById('time-show')
const v = document.getElementById('time-hide')
const inputString = document.getElementById('inputString')
const formStyles = document.getElementById('form-hiden')
const inputStringStyles = document.getElementById('inputString-styles')
const btnStart = document.getElementById('btn')
const btnPause = document.getElementById('btn-pause')
const btnShowMess = document.getElementById('btn-show')
const btnResume = document.getElementById('resume')
const btnEndGame = document.getElementById('btn-endGame')
const btnReStart = document.getElementById('btnReStart')
const btnStartDisable = [btnShowMess, btnStart, btnResume, btnReStart]
const btnEndDisable = [btnEndGame, btnResume, btnPause]
const btnEndVisible = [btnStart, btnReStart, btnShowMess]
const btnShowMessDisabled = [
    btnPause,
    btnEndGame,
    btnReStart,
    btnReStart,
    btnPause
]

function $(element) {
    return element.value
}

function btnVisible(arr) {
    arr.forEach((button) => {
        button.disabled = false
    })
}

function btnHidden(arr) {
    arr.forEach((button) => {
        button.disabled = true
    })
}

function setupTime(a, b) {
    myTime = setInterval(() => {
        if (count == a + b) {
            i++
            count = 0
        }

        if (i < dataMemory.length) {
            if (count == 0) {
                if ($(bienso) == 'so')
                    text.innerHTML = `<div class='showContent'><span class='numberContent'>${i}</span> </br> ${dataMemory[
                        i
                    ].join('</br>')}</div>`
            } else if ($(bienso) == 'bienso') {
                text.innerHTML = `<div class='showContent'><span class='numberContent'>${i}</span> </br> ${dataMemory[i]}</div>`
            }
            if (count > a) {
                text.style.visibility = 'hidden'
            } else {
                text.style.visibility = 'visible'
            }
        } else {
            text.style.visibility = 'visible'
            text.innerHTML = '...'
            btnVisible(btnEndVisible)
            btnHidden(btnEndDisable)
            clearInterval(myTime)
            setTimeout(() => {
                formStyles.style.display = 'block'
            }, 1000)
        }
        count = count + 100
    }, 100)
}

function radomLengthNumbers(number) {
    let html = ''
    for (let i = 0; i < number; i++) {
        let radomNumner = Math.floor(Math.random() * 10)
        html += radomNumner
    }
    return html
}

function radomLengthArrs(arrmax, arrmin, numberMax, numberMin) {
    const radomLengthArr =
        Math.floor(Math.random() * (arrmax - arrmin + 1)) + arrmin
   
    const Number = []
    for (let i = 0; i < radomLengthArr; i++) {
        const radomLengthNumber =
        Math.floor(Math.random() * (numberMax - numberMin + 1)) + numberMin
        Number.push(radomLengthNumbers(radomLengthNumber))
        console.log(radomLengthNumber)
    }
    return Number
}



function arrNumber(ar, max, min, numberMax, numberMin) {
    for (let i = 0; i < ar; i++) {
        dataMemory.push(radomLengthArrs(max, min, numberMax, numberMin))
    }
}

function innerNumber() {
    btnEndGame.disabled = false
    btnPause.disabled = false
    btnHidden(btnStartDisable)
    formStyles.style.display = 'none'
    const regex = /^\d+-\d+;\d+-\d+$/
    if (regex.test($(inputString))) {
        arrayOfPairs = inputString.value.split(';')
        const pair1 = arrayOfPairs[0].split('-')
        const pair2 = arrayOfPairs[1].split('-')
        b = parseInt(pair1[0], 10)
        d = parseInt(pair1[1], 10)
        z = parseInt(pair2[0], 10)
        c = parseInt(pair2[1], 10)
    } else {
        b = 1
        d = 2
        z = 3
        c = 4
    }

    dataMemory = []
    if ($(bienso) == 'so') {
        arrNumber($(a), d, b, c, z)
    } else {
        arrrRadom($(a))
        dataMemory = arrRadom
    }
    i = 0
    count = 0
    setupTime(Number($(g)), Number($(v)))
}

function resume() {
    btnResume.disabled = true
    btnPause.disabled = false
    setupTime(Number($(g)), Number($(v)))
}

function pause() {
    btnPause.disabled = true
    btnResume.disabled = false
    clearInterval(myTime)
}

function endGame() {
    clearInterval(myTime)
    btnHidden(btnEndDisable)
    btnVisible(btnEndVisible)
    btnResume.disabled = true
    formStyles.style.display = 'block'
    i = 0
    count = 0
}
function reStart() {
    btnVisible(btnEndDisable)
    btnHidden(btnEndVisible)
    btnResume.disabled = true
    formStyles.style.display = 'none'
    i = 0
    count = 0
    setupTime(Number($(g)), Number($(v)))
}

function showNumber() {
    btnHidden(btnShowMessDisabled)
    btnShowMess.disabled = true
    text.style.visibility = 'visible'
    let html = ''
    if ($(bienso) == 'so') {
        for (let i = 0; i < dataMemory.length; i++) {
            html += `<div class="showContent" > <span class='numberContent'>${i}</span> </br> ${dataMemory[
                i
            ].join('</br>')} </br> </br> </div>`
        }
    } else if ($(bienso) == 'bienso') {
        for (let i = 0; i < dataMemory.length; i++) {
            html += ` ${i} </br> ${dataMemory[i]} </br>  </br>`
        }
    }
    clearInterval(myTime)
    text.innerHTML = html
    count = 0
}

function generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let randomString = ''

    for (let i = 0; i < 8; i++) {
        if (i === 2 || i === 3) {
            const randomChar = characters.charAt(
                Math.floor(Math.random() * characters.length)
            )
            randomString += randomChar
        } else {
            randomString += Math.floor(Math.random() * 10)
        }
    }
    randomString = randomString.slice(0, 2) + '-' + randomString.slice(2)

    return randomString
}

function arrrRadom(a) {
    for (let i = 0; i < a; i++) {
        arrRadom.push(generateRandomString())
    }
}

function changeInputString() {
    console.log($(bienso))
    if ($(bienso) == 'so') {
        inputStringStyles.style.display = 'block'
    } else {
        inputStringStyles.style.display = 'none'
    }
}

btnStart.addEventListener('click', innerNumber)
btnPause.addEventListener('click', pause)
btnShowMess.addEventListener('click', showNumber)
btnResume.addEventListener('click', resume)
bienso.addEventListener('change', changeInputString)
btnReStart.addEventListener('click', reStart)
btnEndGame.addEventListener('click', endGame)
