import { userService } from "../services/user.service.js"
import { View } from "../utils/view.js"

export class PopupAddress{
   constructor(template, root){
      this.template = template
      this.root = root
      this.view = new View(this.template).getView()
   }

   render(address){
      const rootDataTag = this.root.getAttribute('data-tag')
      const id = address.id
      this.view.label.setAttribute('for', `${rootDataTag}__${id}`)
      this.view.input.setAttribute('id', `${rootDataTag}__${id}`)
      this.view.input.setAttribute('value', address.id)
      
      if(rootDataTag === 'deliveryPoint'){
         this.view.input.checked =  
         userService.getChosenPoint().address.id === id ?
         true : false
      } else{
         this.view.input.checked =  
         userService.getChosenDelivery().address.id === id ?
         true : false
      }
      this.view.addressName.textContent = address.place

      if(this.view.rating){
         this.view.rating.textContent = address.rating ? address.rating : ''
      }
      this.attach() 
   }

   attach() {
      const clone = this.template.content.cloneNode(true)
      this.root.appendChild(clone);
   }
}
