

function $(element) {
    return document.getElementById(element)
}
class App{
    constructor(id){
        this.data=[]
        this.soMuc = 0
        this.loaiNoiDung = "so"
        this.soDong = ''
        this.arrMax =''
        this.arrMin =''
        this.numberMax= ''
        this.numberMin = ''
        this.thuTuCoDinh = false
        this.thoiGianAn = 1000
        this.thoiGianHien = 2000
        this.i=0
        this.count =0
        this.myTime
        this.text =''
        this.formStyles=''
        this.inputStringStyles=''
        this.formId = id  
    }

    creatHtml(){
        const form = document.getElementById(`containerform${this.formId}`);
        var html =`
         <form  id="${this.formId}-form">
        <div class="inputfiel" id="${this.formId}-form-hiden">
        <div class="title">Điều kiện kiểm tra</div>
        <label class="grid_1">Số mục kiểm tra</label>
        <input class="grid_1" id="${this.formId}-so-muc" type="text" value="5" />
        <div class="row_space"></div>
        <label class="grid_1">Loại nội dung</label>
        <select class="grid_1" id="${this.formId}-select-content">
            <option value="so">Số</option>
            <option value="bienso">Biển Số</option>
        </select>
        <label class="element-float-left grid_2">Số dòng; Độ dài mỗi dòng (vd: 3-5; 2-3)</label>
            <input class="grid_1" type="text" id="${this.formId}-inputString" />
        <div class="row_space"></div>
        <label class="grid_1">Sử dụng thứ tự cổ định</label>
        <span class="grid_1">
            <input class="check-box" type="checkbox" id="${this.formId}-radomItem" />
        </span>
        <div class="row_space"></div>
        <label class="grid_2">Thời gian giữa 2 mục (mili-giây)</label>
        <input class="grid_1" type="text" value="5000" id="${this.formId}-time-hide" />
        <div class="row_space"></div>
        <label class="grid_2">Thời gian hiển thị mỗi mục (mili-giây)</label>
        <input class="grid_1" type="text" id="${this.formId}-time-show" value="1000" />
        <div class="row_space"></div>
    </div>
    <div class="btn-control">
        <button class="grid_1" id="${this.formId}-btn" type="button">bắt đầu</button>
        <button class="grid_1" id="${this.formId}-btn-pause" type="button" disabled>tạm dừng</button>
        <button class="grid_1" id="${this.formId}resume" type="button" disabled >tiếp tục</button>
        <button class="grid_1" type="button" id="${this.formId}-btn-endGame" disabled >kết thúc</button>
        <button class="grid_1" type="button" id="${this.formId}-btnReStart" disabled >bắt đầu lại</button>
        <button class="grid_1" id="${this.formId}-btn-show" type="button" disabled >hiện kết quả</button>
    </div>
    </form>
    <div class="row_space"></div>
        <div class="message">
            <div id="${this.formId}inner-Text"></div>
        </div>`
        
        form.innerHTML = html

        const soMuc = $(`${this.formId}-so-muc`)
        const content = $(`${this.formId}-select-content`)
        const soDong = $(`${this.formId}-inputString`)
        const thuTuCoDinh = $(`${this.formId}-radomItem`)
        const thoiGianAn = $(`${this.formId}-time-hide`)
        const thoiGianHien = $(`${this.formId}-time-show`)

        this.formStyles = $(`${this.formId}-form-hiden`)
        this.inputStringStyles=$(`${this.formId}-inputString-styles`)
        this.text = $(`${this.formId}inner-Text`)
        

        const btnPause = $(`${this.formId}-btn-pause`)
        const btnStart = $(`${this.formId}-btn`)
        const btnResume =$(`${this.formId}resume`)
        const btnEndGame = $(`${this.formId}-btn-endGame`)
        const btnReStart =$(`${this.formId}-btnReStart`)
        const btnShow = $(`${this.formId}-btn-show`)

        content.addEventListener('change',()=>{
            this.changeInputString()
        })

        btnStart.addEventListener("click",()=>{
            this.loaiNoiDung = content.value
            btnStart.disabled = true
            btnPause.disabled = false
            btnResume.disabled = true
            btnEndGame.disabled = false
            btnReStart.disabled =true
            btnShow.disabled =  true
            this.formStyles.style.display = 'none'
            this.data =[]
            this.soMuc = soMuc.value
            this.soDong =   soDong.value
            this.thuTuCoDinh = thuTuCoDinh.checked
            this.thoiGianAn = thoiGianAn.value
            this.thoiGianHien = thoiGianHien.value
            this.startMemoryTest()
        })

        btnPause.addEventListener('click',()=>{
            console.log('pause')
            btnStart.disabled = true
            btnPause.disabled = true
            btnResume.disabled = false
            btnEndGame.disabled = false
            btnReStart.disabled =true
            btnShow.disabled =  true
            clearInterval(this.myTime)
        })

        btnResume.addEventListener('click',()=>{
            console.log('Resume')
            btnStart.disabled = true
            btnPause.disabled = false
            btnResume.disabled = true
            btnEndGame.disabled = false
            btnReStart.disabled =true
            btnShow.disabled =  true
            this.checkItem()
        })

        btnEndGame.addEventListener('click',()=>{
            this.formStyles.style.display = 'block'
            btnStart.disabled = false
            btnPause.disabled = true
            btnResume.disabled = true
            btnEndGame.disabled = true
            btnReStart.disabled =false
            btnShow.disabled =  false
            this.endMemoryTest()
        })

        btnReStart.addEventListener('click',()=>{
            btnStart.disabled = true
            btnPause.disabled = false
            btnResume.disabled = true
            btnEndGame.disabled = false
            btnReStart.disabled =true
            btnShow.disabled =  true
            this.restartMemoryTest()
        })
        
        btnShow.addEventListener('click',()=>{
            btnReStart.disabled = true
            btnShow.disabled =  true
            this.showNumberMemoryTest()
          
        })
    }

    startMemoryTest(){      
        let arrayOfPairs
        const regex =  /^\d+-\d+;\d+-\d+$/
        if (regex.test(this.soDong)) {
            arrayOfPairs = this.soDong.split(';')
            const pair1 = arrayOfPairs[0].split('-')
            const pair2 = arrayOfPairs[1].split('-')
            this.arrMin = parseInt(pair1[0], 10)  
            this.arrMax = parseInt(pair1[1], 10)
            this.numberMin = parseInt(pair2[0], 10) 
            this.numberMax= parseInt(pair2[1], 10) 
        }    else {
            this.arrMin = 1
            this.arrMax = 2
            this.numberMin = 3
            this.numberMax = 4
        }

        if(this.loaiNoiDung ==="so"){
            this.arrNumber(this.soMuc,this.arrMax,this.arrMin,this.numberMax,this.numberMin)           
        }
            else{
                this.arrrRadom(this.soMuc)
            }

            this.i= 0
            this.count = 0
            this.checkItem()
    }

    restartMemoryTest(){
        this.formStyles.style.display = 'none'
        this.i = 0
        this.count = 0
        this.checkItem()
    }

    endMemoryTest(){
        clearInterval(this.myTime)
        this.i = 0
        this.count = 0
    }

    showNumberMemoryTest(){
        this.text.style.visibility = 'visible'
        let html = ''
        if (this.loaiNoiDung == 'so') {
            for (let i = 0; i < this.data.length; i++) {
                html += `<div class="showContent" > <span class='numberContent'>${i}</span> </br> ${this.data[
                    i
                ].join('</br>')} </br> </br> </div>`
            }
        } else if ((this.loaiNoiDung) == 'bienso') {
            for (let i = 0; i < this.data.length; i++) {
                html += ` <div class="showContent"><span class="numberContent"> ${i} </span> </br> ${this.data[i]} </br>  </br> </div>`
            }
        }
        clearInterval(this.myTime)
        this.text.innerHTML = html
        this.count = 0
    }
     
    setupTime(arr,a, b) {
        this.myTime = setInterval(() => {
            if (this.count == a + b) {
                this.i++
                this.count = 0
            }
            if (this.i < arr.length) {
                if (this.count == 0) {
                    if (this.loaiNoiDung == 'so')
                        this.text.innerHTML = `<div class='showContent'><span class='numberContent'>${this.i}</span> </br> ${arr[this.i].join('</br>')}</div>`
                      } else if (this.loaiNoiDung == 'bienso') {
                    this.text.innerHTML = `<div class='showContent'><span class='numberContent'>${this.i}</span> </br> ${arr[this.i]}</div>`
                 }
                if (this.count > a) {
                    this.text.style.visibility = 'hidden'
                } else {
                    this.text.style.visibility = 'visible'
                }
            } else {
                this.text.style.visibility = 'visible'
                this.text.innerHTML = '...'
                clearInterval(this.myTime)
                setTimeout(() => {
                    $(`${this.formId}-btn`).disabled =false
                    $(`${this.formId}-btn-pause`).disabled =true
                    $(`${this.formId}resume`).disabled =true
                    $(`${this.formId}-btn-endGame`).disabled =true
                    $(`${this.formId}-btnReStart`).disabled =false
                    $(`${this.formId}-btn-show`).disabled =false
                    this.formStyles.style.display = 'block'
                    console.log('end')
                }, 1000)
            }
            this.count = this.count + 100
        }, 100)
    }

    generateRandomString() {
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

    arrrRadom(a) {
        for (let i = 0; i < a; i++) {
            this.data.push(this.generateRandomString())
        }
    }

    radomLengthNumbers(number) {
        let html = ''
        for (let i = 0; i < number; i++) {
            let radomNumner = Math.floor(Math.random() * 10)
            html += radomNumner
        }
        return html
    }

    radomLengthArrs(arrmax, arrmin, numberMax, numberMin) {
        const radomLengthArr = Math.floor(Math.random() * (arrmax - arrmin + 1)) + arrmin
        const Number = []
        for (let i = 0; i < radomLengthArr; i++) {
            const radomLengthNumber =
            Math.floor(Math.random() * (numberMax - numberMin + 1)) + numberMin
            Number.push(this.radomLengthNumbers(radomLengthNumber))
        }
        return Number
    }

    arrNumber(ar, max, min, numberMax, numberMin) {
        for (let i = 0; i < ar; i++) {
            this.data.push(this.radomLengthArrs(max, min, numberMax, numberMin))
        }
    }

    checkItem(){
        if(this.thuTuCoDinh === false){
            const newArray = [...this.data]
            const radomItem =[]
    
            while (radomItem.length < this.data.length) {
                const randomIndex = Math.floor(Math.random() * newArray.length);
                const randomElement = newArray.splice(randomIndex, 1)[0];
                radomItem.push(randomElement);
              }
              
              this.setupTime(radomItem,Number(this.thoiGianHien), Number(this.thoiGianAn))
        }
            else{
                this.setupTime(this.data,Number(this.thoiGianHien), Number(this.thoiGianAn))
            }
    }

     changeInputString() {
        if (this.loaiNoiDung === 'so') {
            this.inputStringStyles.style.display = 'block'
        } else {
            this.inputStringStyles.style.display = 'none'
        }
    }   
}
const container = $("container1")
function a(n) {
    for (let i = 1; i <= n; i++) {
        new App(i).creatHtml()
        if(n > 1 ){
            $(`${i}-form-hiden`).classList.add('hafl')
        }
        $(`containerform${i}`).style.width = `${100/n}%`
    }
}

const selectLevel = $('selectLevel')
selectLevel.addEventListener('change',()=>{
    a(selectLevel.value)
    if(selectLevel.value == 1 ){
        $("containerform2").style.width = "0px"
        $("containerform3").style.width = "0px"
        $('containerform2').innerHTML = " "
        $('containerform3').innerHTML = " "
    }   else if(selectLevel.value ==2){
        $('containerform3').innerHTML = " "
    }
        else{

        }

})
a(1)













