import { cartService } from "../services/cart.service.js"
import { userService } from "../services/user.service.js"
import { View } from "../utils/view.js"
import { PopupCard } from "./PopupCard.js"
import { PopupAddress } from "./PopupAddress.js"

export class PopupList{
   constructor(template, root){
      this.template = template
      this.root = root
      this.view = new View(this.template).getView()
      this.isOpen = false
      this.cards = userService.getCards()
      this.pointAddresses = userService.getPointAddresses()
      this.deliveryAddresses = userService.getDeliveryAddresses()
   }

   render(){
      this.root.innerHTML = ''
      if(this.view.popupPayForm){
         this.view.popupPayForm.innerHTML = ''
         for(let card of this.cards){
            const popupCard = new PopupCard(document.querySelector('#cardBlockForPopup'), this.view.popupPayForm)
            popupCard.render(card)
         }
      }

      else{
         this.view.deliveryPoint.innerHTML = ''
         this.view.deliveryAddress.innerHTML = ''

         if(cartService.getSelection() == this.view.deliveryPointSelection.getAttribute('data-tag')){
            this.view.deliveryPointSelection.classList.add('active')
            this.view.deliveryPoint.classList.add('active')
            this.view.deliveryAddressSelection.classList.remove('active')
            this.view.deliveryAddress.classList.remove('active')
         } else{
            this.view.deliveryAddress.classList.add('active')
            this.view.deliveryAddressSelection.classList.add('active')
            this.view.deliveryPointSelection.classList.remove('active')
            this.view.deliveryPoint.classList.remove('active')
         }

         for(let address of this.pointAddresses){
            const popupAddress = new PopupAddress(document.querySelector('#addressBlockForPopup'), this.view.deliveryPoint)
            popupAddress.render(address)
         }

         for(let address of this.deliveryAddresses){
            const popupCurier = new PopupAddress(document.querySelector('#courierBlockForPopup'), this.view.deliveryAddress)
            popupCurier.render(address)
         }
      }
      this.attach() 
   }

   attach() {
      const clone = this.template.content.cloneNode(true)
      this.root.appendChild(clone);
   }
}
