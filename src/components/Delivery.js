import { cartService } from "../services/cart.service.js"
import { userService } from "../services/user.service.js"
import { View } from "../utils/view.js"

export class Delivery{
   constructor(template, root){
      this.template = template
      this.root = root
      this.view = new View(this.template).getView()
   }

   render(){
      const { deliveryMethod, address } = userService.getChosenAddress()
      this.root.innerHTML = ''
      this.view.deliveryMethod.textContent = userService.getChosenAddress().deliveryMethod === userService.getChosenPoint().deliveryMethod ? deliveryMethod.split(' ').splice(1, 3).join(' ') : deliveryMethod
      this.view.deliveryAddress.textContent = address.place
      this.view.deliveryRating.textContent = address.rating
      address.rating === undefined || address.rating === 0 ? this.view.deliveryRating.classList.remove('active') : this.view.deliveryRating.classList.add('active')
      this.setProducts()
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

   setProducts(){
      let remains = []
      this.view.deliveryProducts.innerHTML = ''
      const productElem = document.createElement('li')
      const dateBlock = document.createElement('p')
      const blockWithProducts = document.createElement('div')
      blockWithProducts.classList.add('delivery__products')
      
      dateBlock.innerText = '5—6 февраля'
      productElem.appendChild(dateBlock)

      for(let product of this.products){
         if(!product.isChecked){
            continue
         }
         const deliveryProduct = document.createElement('div')
         deliveryProduct.classList.add('delivery__product')
         
         const counter = document.createElement('div')
         counter.classList.add('notification')
         counter.classList.add('delivery__products-notification')
         counter.classList.add('isActive')
         
         const remainsObj = {}
         remainsObj.count = product.count > 184 ? product.count - 184 : 0
         counter.innerText = product.count - remainsObj.count
         
         const productImg = document.createElement('img')
         productImg.setAttribute('src', product.images[1].url)
         remainsObj.src = product.images[1].url

         deliveryProduct.appendChild(productImg)
         deliveryProduct.appendChild(counter)
         blockWithProducts.appendChild(deliveryProduct)
         
         if(Object.keys(remainsObj).length !== 0){
            remains.push(remainsObj)
         }
      }
      productElem.appendChild(blockWithProducts)
      this.view.deliveryProducts.appendChild(productElem)
      
      if(remains.length > 0){
         remains = remains.filter(el => el.count > 0)
         if(this.view.deliveryProducts.children.length < 2){
            const productElem = document.createElement('li')
            const dateBlock = document.createElement('p')
            const blockWithProducts = document.createElement('div')
            dateBlock.innerText = '7—8 февраля'
            productElem.appendChild(dateBlock)
            for(let product of remains){
               const deliveryProduct = document.createElement('div')
               deliveryProduct.classList.add('delivery__product')
               
               const counter = document.createElement('div')
               counter.classList.add('notification')
               counter.classList.add('delivery__products-notification')
               counter.classList.add('isActive')
               
               if(product.count > 0){
                  counter.innerText = product.count
                  
                  const productImg = document.createElement('img')
                  productImg.setAttribute('src', product.src)
                  deliveryProduct.appendChild(productImg)
                  deliveryProduct.appendChild(counter)
                  blockWithProducts.appendChild(deliveryProduct)
               } 
            }
            productElem.appendChild(blockWithProducts)
            this.view.deliveryProducts.appendChild(productElem)
            cartService.setDate('5—8 фев')
         }

         if((remains.length === 0 && this.view.deliveryProducts.children.length > 1)){
            this.view.deliveryProducts.removeChild(this.view.deliveryProducts.children[1])
            cartService.setDate('5—6 фев')
         }
      }
   }
}
