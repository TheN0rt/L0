export const typesOfInput = ['name', 'surname', 'email', 'phone', 'inn']

class FormService{
   init(){
      this.validateError = {}
   }

   checkEmptyValidation(input, type){
      let errorText;
   
      switch(type){
         case 'name':
            errorText = 'Укажите имя'
            break
         case 'surname':
            errorText = 'Укажите фамилию'
            break
         case 'email':
            errorText = 'Укажите почту'
            break
         case 'phone':
            errorText = 'Укажите номер телефона'
            break
         case 'inn':
            errorText = 'Укажите ИНН'
            break
         }

      if(input.value.length === 0){
         this.validateError[type] = errorText
      } else{
         delete this.validateError[type]
      }
   }

   checkValidation(input, type){
      const value = input.value
      let validate;
      let errorText;
   
      switch(type){
         case 'name':
            validate = /^[A-Za-zА-Яа-я]+$/;
            errorText = 'Проверьте имя'
            break
         case 'surname':
            validate = /^[A-Za-zА-Яа-я]+$/;
            errorText = 'Проверьте фамилию'
            break
         case 'email':
            validate = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
            errorText = 'Проверьте адрес электронной почты'
            break
         case 'phone':
            validate = /^\+\d \d{3} \d{3} \d{2} \d{2}$/;
            errorText = 'Формат +9 999 999 99 99'
            break
         case 'inn':
            validate = /[0-9]{14}/
            errorText = 'Проверьте ИНН'
            break
         default:
            break
      }
   
      if(!validate.test(value)) {
         this.validateError[type] = errorText
      } else{
         delete this.validateError[type]
      }
   }

   getValidateError(){
      return this.validateError
   }
}

export const formService = new FormService()