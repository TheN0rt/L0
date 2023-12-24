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
      this.view.payCardNumber.textContent = card.number
      this.view.payCardMonth.textContent = card.date.month > 10 ? card.date.month : '0' + card.date.month
      this.view.payCardYear.textContent = card.date.year
      cartService.isCheckboxChecked() ? this.view.payInfo.classList.remove('isVisible') : this.view.payInfo.classList.add('isVisible')
      this.attach() 
   }

   attach() {
      const clone = this.template.content.cloneNode(true)
      this.root.appendChild(clone);
   }
}