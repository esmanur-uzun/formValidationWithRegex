const form = {
    formControl: document.querySelector(".register-form"),
    resetButton: document.querySelector("#resetButton"),
    inputs:{},
    errormessage: document.querySelectorAll(".form-floating"),

    formElement(){
        const allInputs = document.querySelectorAll("input")
        allInputs.forEach(element => {
            this.inputs[element.id] = element.value
        })
    },
    errMessage(message,index){
        const err = document.createElement("p")
        err.textContent=message
        this.errormessage[index].appendChild(err)

        setTimeout(()=>{
            err.remove()
        },2000)

    },
    formValidate(){
        const name = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/
        const email = /[a-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}/
        const phone = /^(5|05)([0-9]{2})\s?([0-9]{3})\s?([0-9]{2})\s?([0-9]{2})$/
        const password = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/
        
        if(name.test(this.inputs.name) == false)
        {   
            this.errMessage("*Bu alan numerik değer içeremez",0)
        }
        else if(phone.test(this.inputs.phone) == false){
                this.errMessage("* Lütfen 0555 555 55 55 formatında bir numara giriniz",1)
        }
        else if(email.test(this.inputs.email) == false){
            this.errMessage("*Lütfen geçerli bir mail adresi giriniz",2)
        }
        else if(password.test(this.inputs.password) == false){
            this.errMessage("*Şifre en az bir tane sayı ve alfabetik karakter içermelidir",3)
        }
    
    },
    submitForm(){
        console.log('sadasd')
        this.formControl.addEventListener("submit",(e) =>{

            this.formElement()
            this.formValidate() 
            var data= this.inputs
            
            axios.post('http://localhost:3000/newUser',data).then(res => console.log(res)).catch(err => console.log(err))
            
            fetch("http://localhost:3000/newUser",{
                method: "POST",
                headers:{
                    'Content-type':'application/json'
                },
                body: JSON.stringify(data)
            }).then(response => response.json()).then(data => console.log(data)).catch(error=> console.log(error))
            e.preventDefault()
        })
        this.resetButton.addEventListener("click",() =>{
            this.formControl.value=""
        })
    }
}

form.submitForm()
