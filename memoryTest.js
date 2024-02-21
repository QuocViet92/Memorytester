function $(element) {
    return document.getElementById(element)
}


function createElement(elementName, attrs, children) {
    const element = document.createElement(elementName);

    if (attrs && typeof attrs === 'object') {
      for (var key in attrs) {
        if (attrs.hasOwnProperty(key)) {
          element.setAttribute(key, attrs[key]);
        }
      }
    }

    if (children && children.length > 0) {
      for (var i = 0; i < children.length; i++) {
        element.appendChild(children[i]);
      }
    }
  
    return element;
  }

class App{
    constructor(id){
        this._data=[]
        this._soMuc = 0
        this._loaiNoiDung = "so"
        this._soDong = ''
        this._arrMax =''
        this._arrMin =''
        this._numberMax= ''
        this._numberMin = ''
        this._thuTuCoDinh = false
        this._thoiGianAn = 1000
        this._thoiGianHien = 2000
        this._i=0
        this._count =0
        this._myTime
        this._text =''
        this._formStyles=''
        this._inputStringStyles=''
        this._inputString=''
        this._formId = id  
    }
    _$(idPart){
return $(`${this._formId}${idPart}`)
    }

    creatHtml(){
        const form = document.getElementById(`container1`);
       
      const formHtml=createElement('div',{class:`container-Form${this._formId}`,id:`containerform${this._formId}`},[
       createElement('form',
       {id:`${this._formId}-form`},
            [createElement('div',{class:'inputfiel',id:`${this._formId}-form-hiden`},
                 [createElement('div',{class:'title'},[document.createTextNode("Điều kiện kiểm tra")]),
                  createElement('label',{class:'grid_1'},[document.createTextNode("Số mục kiểm tra")]),
                  createElement('input',{class:'grid_1',id:`${this._formId}-so-muc`,type:'text',value:5},[]),
                  createElement('div',{class:'row_space'},[]),
                  createElement('label',{class:'grid_1'},[document.createTextNode('Loại nội dung')]),
                  createElement('select',{class:'grid_1',id:`${this._formId}-select-content`},[
                        createElement('option',{value:'so'},[document.createTextNode("Số")]),
                        createElement('option',{value:'bienso'},[document.createTextNode("Biển Số")])
                  ]),
                  createElement('label',{class:'element-float-left grid_2',id:`${this._formId}-inputString-styles`},[document.createTextNode('Số dòng; Độ dài mỗi dòng (vd: 3-5; 2-3)')]),
                  createElement('input',{class:'grid_1',type:'text',id:`${this._formId}-inputString`},[]),
                  createElement('div',{class:'row_space'},[]),
                  createElement('label',{class:'grid_1'},[document.createTextNode('Sử dụng thứ tự cố định')]),
                  createElement('span',{class:'grid_1'},[
                        createElement('input',{class:'checkbox',type:'checkbox',id:`${this._formId}-radomItem`},[])
                  ]),
                  createElement('div',{class:'row_space'},[]),
                  createElement('label',{class:'grid_2'},[document.createTextNode('thời gian giữa hai mục (mili-giây)')]),
                  createElement('input',{class:'grid_1',type:'text',value:5000,id:`${this._formId}-time-hide`},[]),
                  createElement('div',{class:'row_space'},[]),
                  createElement('label',{class:'grid_2'},[document.createTextNode('Thời gian hiển thị mỗi mục (mili-giây)')]),
                  createElement('input',{class:'grid_1',type:'text',id:`${this._formId}-time-show`,value:1000},[])

                  ]
            ),
             createElement('div',{class:'btn-control'},[
                  createElement('button',{class:'grid_1',id:`${this._formId}-btn`,type:'button'},[document.createTextNode('bắt đầu')]),
                  createElement('button',{class:'grid_1',id:`${this._formId}-btn-pause`,type:'button',disabled:true},[document.createTextNode('tạm dừng')]),
                  createElement('button',{class:'grid_1',id:`${this._formId}resume`,type:'button', disabled:true},[document.createTextNode('tiếp tục')]),
                  createElement('button',{class:'grid_1',id:`${this._formId}-btn-endGame`,type:'button', disabled:true},[document.createTextNode('kết thúc')]),
                  createElement('button',{class:'grid_1',id:`${this._formId}-btnReStart`,type:'button', disabled:true},[document.createTextNode('bắt đầu lại')]),
                  createElement('button',{class:'grid_1',id:`${this._formId}-btn-show`,type:'button', disabled:true},[document.createTextNode('hiện kết quả')]),
             ])
            ]
       ),
       createElement('div',{class:'message'},[
            createElement('div',{id:`${this._formId}inner-Text`})
       ])
    ])
        
        form.appendChild(formHtml) 

        


        const soMuc = this._$('-so-muc')
        const content = this._$('-select-content')
        const soDong = this._$('-inputString')
        const thuTuCoDinh = this._$('-radomItem')
        const thoiGianAn = this._$('-time-hide')
        const thoiGianHien = this._$('-time-show')

        this._formStyles = this._$('-form-hiden')
        this._inputStringStyles= this._$('-inputString-styles')
        this._inputString = this._$('-inputString')
        this._text = this._$('inner-Text')
        

        const btnPause = this._$('-btn-pause')
        const btnStart = this._$('-btn')
        const btnResume = this._$('resume')
        const btnEndGame = this._$('-btn-endGame')
        const btnReStart = this._$('-btnReStart')
        const btnShow = this._$('-btn-show')

        content.addEventListener('change',()=>{
            this._loaiNoiDung = content.value
            this.changeInputString()
        })

        btnStart.addEventListener("click",()=>{
            this._loaiNoiDung = content.value
            btnStart.disabled = true
            btnPause.disabled = false
            btnResume.disabled = true
            btnEndGame.disabled = false
            btnReStart.disabled =true
            btnShow.disabled =  true
            this._formStyles.style.display = 'none'
            this._data =[]
            this._soMuc = soMuc.value
            this._soDong =   soDong.value
            this._thuTuCoDinh = thuTuCoDinh.checked
            this._thoiGianAn = thoiGianAn.value
            this._thoiGianHien = thoiGianHien.value
            this.startMemoryTest()
        })

        btnPause.addEventListener('click',()=>{
            btnStart.disabled = true
            btnPause.disabled = true
            btnResume.disabled = false
            btnEndGame.disabled = false
            btnReStart.disabled =true
            btnShow.disabled =  true
            clearInterval(this._myTime)
        })

        btnResume.addEventListener('click',()=>{
            btnStart.disabled = true
            btnPause.disabled = false
            btnResume.disabled = true
            btnEndGame.disabled = false
            btnReStart.disabled =true
            btnShow.disabled =  true
            this.checkItem()
        })

        btnEndGame.addEventListener('click',()=>{
            this._formStyles.style.display = 'block'
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
        if (regex.test(this._soDong)) {
            arrayOfPairs = this._soDong.split(';')
            const pair1 = arrayOfPairs[0].split('-')
            const pair2 = arrayOfPairs[1].split('-')
            this._arrMin = parseInt(pair1[0], 10)  
            this._arrMax = parseInt(pair1[1], 10)
            this._numberMin = parseInt(pair2[0], 10) 
            this._numberMax= parseInt(pair2[1], 10) 
        }    else {
            this._arrMin = 1
            this._arrMax = 2
            this._numberMin = 3
            this._numberMax = 4
        }

        if(this._loaiNoiDung ==="so"){
            this.arrNumber(this._soMuc,this._arrMax,this._arrMin,this._numberMax,this._numberMin)           
        }
            else{
                this.arrrRadom(this._soMuc)
            }

            this._i= 0
            this._count = 0
            this.checkItem()
    }

    restartMemoryTest(){
        this._formStyles.style.display = 'none'
        this._i = 0
        this._count = 0
        this.checkItem()
    }

    endMemoryTest(){
        clearInterval(this._myTime)
        this._i = 0
        this._count = 0
    }

    showNumberMemoryTest(){
        this._text.style.visibility = 'visible'
        let html = ''
        if (this._loaiNoiDung == 'so') {
            for (let i = 0; i < this._data.length; i++) {
                html += `<div class="showContent" > <span class='numberContent'>${i}</span> </br> ${this._data[
                    i
                ].join('</br>')} </br> </br> </div>`
            }
        } else if ((this._loaiNoiDung) == 'bienso') {
            for (let i = 0; i < this._data.length; i++) {
                html += ` <div class="showContent"><span class="numberContent"> ${i} </span> </br> ${this._data[i]} </br>  </br> </div>`
            }
        }
        clearInterval(this._myTime)
        this._text.innerHTML = html
        this._count = 0
    }
     
    setupTime(arr,a, b) {
        this._myTime = setInterval(() => {
            if (this._count == a + b) {
                this._i++
                this._count = 0
            }
            if (this._i < arr.length) {
                if (this._count == 0) {
                    if (this._loaiNoiDung == 'so')
                        this._text.innerHTML = `<div class='showContent'><span class='numberContent'>${this._i}</span> </br> ${arr[this._i].join('</br>')}</div>`
                      } else if (this._loaiNoiDung == 'bienso') {
                    this._text.innerHTML = `<div class='showContent'><span class='numberContent'>${this._i}</span> </br> ${arr[this._i]}</div>`
                 }
                if (this._count > a) {
                    this._text.style.visibility = 'hidden'
                } else {
                    this._text.style.visibility = 'visible'
                }
            } else {
                this._text.style.visibility = 'visible'
                this._text.innerHTML = '...'
                clearInterval(this._myTime)
                setTimeout(() => {
                    this._$('-btn').disabled =false
                    this._$('-btn-pause').disabled =true
                    this._$('resume').disabled =true
                    this._$('-btn-endGame').disabled =true
                    this._$('-btnReStart').disabled =false
                    this._$('-btn-show').disabled =false
                    this._formStyles.style.display = 'block'
                    console.log('end')
                }, 1000)
            }
            this._count = this._count + 100
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
            this._data.push(this.generateRandomString())
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
            this._data.push(this.radomLengthArrs(max, min, numberMax, numberMin))
        }
    }

    checkItem(){
        if(this._thuTuCoDinh === false){
            const radomItem =[]
    
            while (radomItem.length < this._data.length) {
                const randomIndex = Math.floor(Math.random() * this._data   .length);
                const randomElement = this._data[randomIndex]
                radomItem.push(randomElement);
              }
              
              this.setupTime(radomItem,Number(this._thoiGianHien), Number(this._thoiGianAn))
        }
            else{
                this.setupTime(this._data,Number(this._thoiGianHien), Number(this._thoiGianAn))
            }
    }

     changeInputString() {
        if (this._loaiNoiDung == 'so') {
            this._inputStringStyles.style.display = 'block'
            this._inputString.style.display= 'block'
        } else if(this._loaiNoiDung == 'bienso'){
            this._inputStringStyles.style.display = 'none'
            this._inputString.style.display= 'none'
        }
    }   
}

function initializeTesters(n) {
    document.getElementById(`container1`).innerHTML =""
    for (let i = 1; i <= n; i++) {
        new App(i).creatHtml()
        if(n > 1 ){
            $(`${i}-form-hiden`).classList.add('hafl')
        }
        $(`containerform${i}`).style.width = `${100/n}%`
    }

const selectLevel = $('selectLevel')
selectLevel.addEventListener('change',()=>{
    initializeTesters(selectLevel.value)
})
<<<<<<< HEAD
initializeTesters(1)













=======
a(1)
>>>>>>> d625fe4e815dcaf1b7f927a9331aba522edf4843
