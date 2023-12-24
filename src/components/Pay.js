import { cartService } from "../services/cart.service.js"
import { userService } from "../services/user.service.js"
import { View } from "../utils/view.js"

export class Pay{
   constructor(template, root){
      this.template = template
      this.root = root
      this.view = new View(this.template).getView()
   }

   render(){
      const card = userService.getChosenCard()
      this.root.innerHTML = ''
      this.view.payCardImg.setAttribute('src', card.image)
      this.view.payCardNumber = card.number
      this.view.payCardMonth = card.date.month
      this.view.payCardYear = card.date.year
      cartService.isCheckboxChecked() ? this.view.payInfo.classList.remove('isVisible') : this.view.payInfo.classList.add('isVisible')
      this.attach() 
   }

   attach() {
      const clone = this.template.content.cloneNode(true)
      this.root.appendChild(clone);
   }
}