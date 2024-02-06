

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
        this.inputString=''
        this.formId = id  
    }
     createElementWithAttributes(elementName, attrs, children) {
        // Tạo phần tử
        var element = document.createElement(elementName);
      
        // Thêm thuộc tính cho phần tử
        if (attrs && typeof attrs === 'object') {
          for (var key in attrs) {
            if (attrs.hasOwnProperty(key)) {
              element.setAttribute(key, attrs[key]);
            }
          }
        }
      
        // Thêm thẻ con cho phần tử
        if (children && children.length > 0) {
          for (var i = 0; i < children.length; i++) {
            element.appendChild(children[i]);
          }
        }
      
        return element;
      }

    creatHtml(){
        const form = document.getElementById(`container1`);
       
      const formHtml=this.createElementWithAttributes('div',{class:`container-Form${this.formId}`,id:`containerform${this.formId}`},[
       this.createElementWithAttributes('form',
       {id:`${this.formId}-form`},
            [this.createElementWithAttributes('div',{class:'inputfiel',id:`${this.formId}-form-hiden`},
                 [this.createElementWithAttributes('div',{class:'title'},[document.createTextNode("Điều kiện kiểm tra")]),
                  this.createElementWithAttributes('label',{class:'grid_1'},[document.createTextNode("Số mục kiểm tra")]),
                  this.createElementWithAttributes('input',{class:'grid_1',id:`${this.formId}-so-muc`,type:'text',value:5},[]),
                  this.createElementWithAttributes('div',{class:'row_space'},[]),
                  this.createElementWithAttributes('label',{class:'grid_1'},[document.createTextNode('Loại nội dung')]),
                  this.createElementWithAttributes('select',{class:'grid_1',id:`${this.formId}-select-content`},[
                        this.createElementWithAttributes('option',{value:'so'},[document.createTextNode("Số")]),
                        this.createElementWithAttributes('option',{value:'bienso'},[document.createTextNode("Biển Số")])
                  ]),
                  this.createElementWithAttributes('label',{class:'element-float-left grid_2',id:`${this.formId}-inputString-styles`},[document.createTextNode('Số dòng; Độ dài mỗi dòng (vd: 3-5; 2-3)')]),
                  this.createElementWithAttributes('input',{class:'grid_1',type:'text',id:`${this.formId}-inputString`},[]),
                  this.createElementWithAttributes('div',{class:'row_space'},[]),
                  this.createElementWithAttributes('label',{class:'grid_1'},[document.createTextNode('Sử dụng thứ tự cố định')]),
                  this.createElementWithAttributes('span',{class:'grid_1'},[
                        this.createElementWithAttributes('input',{class:'checkbox',type:'checkbox',id:`${this.formId}-radomItem`},[])
                  ]),
                  this.createElementWithAttributes('div',{class:'row_space'},[]),
                  this.createElementWithAttributes('label',{class:'grid_2'},[document.createTextNode('thời gian giữa hai mục (mili-giây)')]),
                  this.createElementWithAttributes('input',{class:'grid_1',type:'text',value:5000,id:`${this.formId}-time-hide`},[]),
                  this.createElementWithAttributes('div',{class:'row_space'},[]),
                  this.createElementWithAttributes('label',{class:'grid_2'},[document.createTextNode('Thời gian hiển thị mỗi mục (mili-giây)')]),
                  this.createElementWithAttributes('input',{class:'grid_1',type:'text',id:`${this.formId}-time-show`,value:1000},[])

                  ]
            ),
             this.createElementWithAttributes('div',{class:'btn-control'},[
                  this.createElementWithAttributes('button',{class:'grid_1',id:`${this.formId}-btn`,type:'button'},[document.createTextNode('bắt đầu')]),
                  this.createElementWithAttributes('button',{class:'grid_1',id:`${this.formId}-btn-pause`,type:'button',disabled:true},[document.createTextNode('tạm dừng')]),
                  this.createElementWithAttributes('button',{class:'grid_1',id:`${this.formId}resume`,type:'button', disabled:true},[document.createTextNode('tiếp tục')]),
                  this.createElementWithAttributes('button',{class:'grid_1',id:`${this.formId}-btn-endGame`,type:'button', disabled:true},[document.createTextNode('kết thúc')]),
                  this.createElementWithAttributes('button',{class:'grid_1',id:`${this.formId}-btnReStart`,type:'button', disabled:true},[document.createTextNode('bắt đầu lại')]),
                  this.createElementWithAttributes('button',{class:'grid_1',id:`${this.formId}-btn-show`,type:'button', disabled:true},[document.createTextNode('hiện kết quả')]),
             ])
            ]
       ),
       this.createElementWithAttributes('div',{class:'message'},[
            this.createElementWithAttributes('div',{id:`${this.formId}inner-Text`})
       ])
    ])
        
        form.appendChild(formHtml) 

        const soMuc = $(`${this.formId}-so-muc`)
        const content = $(`${this.formId}-select-content`)
        const soDong = $(`${this.formId}-inputString`)
        const thuTuCoDinh = $(`${this.formId}-radomItem`)
        const thoiGianAn = $(`${this.formId}-time-hide`)
        const thoiGianHien = $(`${this.formId}-time-show`)

        this.formStyles = $(`${this.formId}-form-hiden`)
        this.inputStringStyles=$(`${this.formId}-inputString-styles`)
        this.inputString = $(`${this.formId}-inputString`)
        this.text = $(`${this.formId}inner-Text`)
        

        const btnPause = $(`${this.formId}-btn-pause`)
        const btnStart = $(`${this.formId}-btn`)
        const btnResume =$(`${this.formId}resume`)
        const btnEndGame = $(`${this.formId}-btn-endGame`)
        const btnReStart =$(`${this.formId}-btnReStart`)
        const btnShow = $(`${this.formId}-btn-show`)

        content.addEventListener('change',()=>{
            this.loaiNoiDung = content.value
            console.log('change')
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
        console.log('inputString')
        console.log(this.loaiNoiDung)
        if (this.loaiNoiDung == 'so') {
            console.log("so")
            this.inputStringStyles.style.display = 'block'
            this.inputString.style.display= 'block'
        } else if(this.loaiNoiDung == 'bienso'){
            console.log('bienso')
            this.inputStringStyles.style.display = 'none'
            this.inputString.style.display= 'none'
        }
    }   
}

const container = $("container1")
function a(n) {
    document.getElementById(`container1`).innerHTML =""
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
})
a(1)













