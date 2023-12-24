import { userService } from "../services/user.service.js"
import { View } from "../utils/view.js"

export class PopupCard{
   constructor(template, root){
      this.template = template
      this.root = root
      this.view = new View(this.template).getView()
   }

   render(card){
      this.view.label.setAttribute('for', `${card.name}__bank`)
      this.view.input.setAttribute('id', `${card.name}__bank`)
      this.view.input.setAttribute('value', card.name)
      this.view.input.checked = card.name === userService.getChosenCard().name ?
      true : false
      this.view.bankImg.setAttribute('src', card.image)
      this.view.cardNumber.textContent = card.number
      this.attach() 
   }

   attach() {
      const clone = this.template.content.cloneNode(true)
      this.root.appendChild(clone);
   }
}
