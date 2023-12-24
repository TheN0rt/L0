import { cartService } from "../services/cart.service.js"
import { userService } from "../services/user.service.js"
import { getFullprice, getPriceWithDiscount, morphWord } from "../utils/helpers.js"
import { View } from "../utils/view.js"

export class Summary{
   constructor(template, root){
      this.template = template
      this.root = root
      this.view = new View(this.template).getView()
   }

   render(){
      const { deliveryMethod, address } = userService.getChosenAddress()
      const card = userService.getChosenCard()
      const discount = userService.getDiscount()
      const products = cartService.getProducts()
      const fullPrice = products.reduce((acc, product) => {
         return acc += product.isChecked ? getFullprice(product.price, product.count) : 0
      }, 0)
      const totalPrice = products.reduce((acc, product) =>
      acc += product.isChecked ? getPriceWithDiscount(product.price, product.count, product.percentOfdiscount, discount) : 0, 0)
      const productCount = products.reduce((acc, product) => acc += product.isChecked ? product.count : 0, 0)
      this.root.innerHTML = ''
      this.view.summaryPrice.textContent = totalPrice.toLocaleString()

      this.view.summaryProductCount.textContent = productCount
      this.view.summaryProductWord.textContent = morphWord(productCount, [' товар', ' товара', ' товаров'])
      this.view.summaryFullPrice.textContent = fullPrice.toLocaleString()
      this.view.summaryDiscount.textContent = (totalPrice - fullPrice).toLocaleString().split('-').join('− ')
      this.view.summaryAddress.textContent = address.place
      this.view.summaryDeliveryDate.textContent = cartService.getDate().split('—').join('–')
      this.view.summaryCardImg.setAttribute('src', card.image)
      this.view.summaryCardNumber.textContent = card.number
      this.view.deliveryMethod.textContent = deliveryMethod.toLowerCase()
      this.view.input.checked = cartService.isCheckboxChecked()
      cartService.isCheckboxChecked() ? this.view.payInfo.classList.remove('isVisible') : this.view.payInfo.classList.add('isVisible') 
      this.view.summaryOrderBtn.textContent = cartService.isCheckboxChecked() ?
      `Оплатить ${totalPrice.toLocaleString()} сом` : 'Заказать'
      this.attach() 
   }
   
   attach() {
      const clone = this.template.content.cloneNode(true)
      this.root.appendChild(clone);
   }

   update(products){
      this.products = products;
      this.render();
   }
}
