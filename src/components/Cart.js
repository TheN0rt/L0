import { user } from "../data/userData.js"
import { cartService } from "../services/cart.service.js"
import { favoriteService } from "../services/favorite.service.js"
import { formService, typesOfInput } from "../services/form.service.js"
import { stockService } from "../services/stock.service.js"
import { userService } from "../services/user.service.js"
import { getPriceWithDiscount, morphWord } from "../utils/helpers.js"
import { Delivery } from "./Delivery.js"
import { Pay } from "./Pay.js"
import { PopupList } from "./PopupList.js"
import { ProductList } from "./ProductList.js"
import { Summary } from "./Summary.js"

export class Cart{
   init(){
      this.render()
      this.addFunctionalityForOtherElements()
   }
   
   render(){
      const productList = new ProductList(document.querySelector('#infoAboutProduct'), document.querySelector('.cart__container .cart-block'))
      const summary = new Summary(document.querySelector('#summaryInfo'), document.querySelector('.main-flex'))
      const missingProductList = new ProductList(document.querySelector('#infoAboutMissingProduct'), document.querySelector(".cart__miss-block .cart-block"))
      const delivery = new Delivery(document.querySelector('#delivery'), document.querySelector('.cart__delivey-wrapper'))
      const pay = new Pay(document.querySelector('#pay'), document.querySelector('.cart__delivery-pay'))
      const popupPayList = new PopupList(document.querySelector('#popupPay'), document.querySelector('#popup__pay'))
      const popupDeliveryList = new PopupList(document.querySelector('#popupDelivery'), document.querySelector('#popup__delivery'))
      const products = cartService.getProducts()
      const missingProducts = cartService.getMissingProducts()
      
      productList.update(products)
      missingProductList.update(missingProducts)
      delivery.update(products)
      summary.update(products)
      pay.render()
      popupPayList.render(userService.getCards())
      popupDeliveryList.render(userService.getDeliveryAddresses())
      this.addFunctionalityForProduct()
      this.changeSummaryInfoInAccord(products)
   }

   changeSummaryInfoInAccord(products){
      const productCounter = products.reduce((acc, product) => acc += product.count , 0)
      const totalPrice = products.reduce((acc, product) =>
      acc += getPriceWithDiscount(product.price, product.count, product.percentOfdiscount, user.percentOfdiscount), 0)

      document.querySelector('.header__productCounter').innerText = productCounter + morphWord(productCounter, [' товар', ' товара', ' товаров'])
      document.querySelector('.header__productPrice').innerText =  totalPrice.toLocaleString() + ' сом'
   }

   addFunctionalityForProduct(){
      const products = cartService.getProducts()
      const missingProducts = cartService.getMissingProducts()
      const cartItemCheckboxes = document.querySelectorAll('.cart__item .checkbox')
      const checkboxeForAllProducts = document.querySelector('#cart-checkbox__all')
      const inputForms = document.querySelectorAll('.form__input')
      const inputs = document.querySelectorAll('.form__input input[type="text"]')
      const orderBtn = document.querySelector('#order__btn')

      document.querySelectorAll('.counter__plus').forEach((el, id) => el.addEventListener('click', () => {
         const stockCounter = stockService.getStockCounter(products[id].id)
         if(stockCounter > products[id].count){
            cartService.increaseCount(products[id])
            this.render()
         }
      }))

      document.querySelectorAll('.counter__minus').forEach((el, id) => el.addEventListener('click', () => {
         if(products[id].count !== 1){
            cartService.decreaseCount(products[id])
            this.render()
         }
      }))

      document.querySelectorAll('.cart__container .cart-block .delete').forEach((el, id) => el.addEventListener('click', () => {
         cartService.deleteProduct(id)
         this.render()
      }))

      document.querySelectorAll('.cart__miss-block .cart-block .delete').forEach((el, id) => el.addEventListener('click', () => {
         cartService.deleteMissingProduct(id)
         document.querySelector('.header__title-count').innerText = cartService.getMissingProducts().length + morphWord(cartService.getMissingProducts().length, [' товар', ' товара', ' товаров'])
         this.render()
      }))

      cartItemCheckboxes.forEach((el, id) => el.addEventListener('change', (e) => {
         products[id].isChecked = e.target.checked ? true : false 
         const isAllChecked = products.every(product => product.isChecked === true)
         checkboxeForAllProducts.checked = isAllChecked ? true : false
         this.render()
      }))

      document.querySelector('#pay__immid').addEventListener('change', (e) => {
         cartService.setPayCheckbox(e.target.checked)
         this.render()
      })

      document.querySelectorAll('#popup__pay input[type="radio"]').forEach(el => el.addEventListener('change', (e) => {
         const name = e.target.value
         const currentCard = userService.getCards().find(card => card.name === name)
         userService.setTempCard(currentCard)
      }))

      document.querySelectorAll('#popup__delivery input[type="radio"]').forEach(el => el.addEventListener('change', (e) => {
         const id = e.target.value
         const dataset = document.querySelector('.popup__delivery-item.active').getAttribute('data-set')
         const currentAddress = dataset === 'deliveryPointSelection' ? userService.getPointAddresses().find(address => address.id == id) : userService.getDeliveryAddresses().find(address => address.id == id)

         if(dataset === 'deliveryPointSelection'){
            userService.setTempPointAddress(currentAddress)
         } else{
            userService.setTempDeliveryAddress(currentAddress)
         }
      }))

      document.querySelectorAll('.popup__delivery-item').forEach((el, id) => el.addEventListener('click', () => {
         cartService.setSelection(el.getAttribute('data-tag'))
         const dataset = document.querySelector('.popup__delivery-item.active').getAttribute('data-set')
         
         if(dataset === 'deliveryPointSelection'){
            const address = userService.getChosenPoint().address
            userService.setTempPointAddress(address)
         } else{
            const address = userService.getChosenDelivery().address
            userService.setTempDeliveryAddress(address)
         }

         this.render()
      }))

      document.querySelectorAll('.pay__change').forEach(el => el.addEventListener('click', () => {
         document.querySelector('#popup__pay').classList.add('active')
         document.querySelector('html').classList.add('disabledOverflow')
      }))

      document.querySelectorAll('.change__delivery').forEach(el => el.addEventListener('click', () => {
         document.querySelector('#popup__delivery').classList.add('active')
         document.querySelector('html').classList.add('disabledOverflow')
         cartService.setSelection(document.querySelector('.popup__delivery-item.active').getAttribute('data-set'))
      }))

      document.querySelectorAll('.close__icon').forEach(el => el.addEventListener('click', () => {
         document.querySelector('.popup.active').classList.remove('active')
         document.querySelector('html').classList.remove('disabledOverflow')
         this.render()
      }))

      document.querySelector('#popup__pay .choose').addEventListener('click', () => {
         document.querySelector('.popup.active').classList.remove('active')
         document.querySelector('html').classList.remove('disabledOverflow')
         userService.setChosenCard(userService.getTempCard())
         this.render()
      })

      document.querySelector('#popup__delivery .choose').addEventListener('click', () => {
         document.querySelector('.popup.active').classList.remove('active')
         document.querySelector('html').classList.remove('disabledOverflow')
         const dataset = document.querySelector('.popup__delivery-item.active').getAttribute('data-set')
         console.log(dataset)
         if(dataset === 'deliveryPointSelection'){
            userService.setChosenPoint(userService.getTempPointAddress())
            userService.setChosenAddress(userService.getChosenPoint())
         } else{
            console.log(userService.getTempDeliveryAddress())
            userService.setChosenDelivery(userService.getTempDeliveryAddress())
            userService.setChosenAddress(userService.getChosenDelivery())
         }
         this.render()
      })

      const checkFormInput = (input, index) => {
         if(input.value.length > 0){
            formService.checkValidation(input, typesOfInput[index])
         } else{
            formService.checkEmptyValidation(input, typesOfInput[index])
         }

         if(typesOfInput[index] in formService.getValidateError()){
            inputForms[index].classList.add('error')
         } else{
            inputForms[index].classList.remove('error')
         }

         if(typesOfInput[index] in formService.getValidateError() && typesOfInput[index] === 'inn'){
            inputForms[index].querySelector('span').classList.remove('isVisible')
         } else{
            inputForms[index].querySelector('span')?.classList.add('isVisible')
         }

         inputForms[index].querySelector('p').innerText = formService.getValidateError()[typesOfInput[index]]
      }

      inputs.forEach((input, index) => {
         input.addEventListener('blur', () => {
            if(input.value.length > 0){
               checkFormInput(input, index, formService.checkValidation)
            }
         })
      
         input.addEventListener('input', () => {
            if(input.value.length > 0){
               document.querySelectorAll('.form__input').forEach(el => {
                  if(el.contains(input)) el.querySelector('label').classList.add('isVisible')
               })

               inputForms[index].classList.remove('error')
            } else{
               document.querySelectorAll('.form__input').forEach(el => {
                  if(el.contains(input)) el.querySelector('label').classList.remove('isVisible')
               })
            }
         })
      })

      orderBtn.addEventListener('click', () => {
         inputs.forEach((input, index) => {
            checkFormInput(input, index)
         })
      
         if(Object.keys(formService.getValidateError()).length > 0){
            document.querySelector('.cart-form').scrollIntoView({ 
               behavior: 'smooth' 
            });
         }
      })

      document.querySelectorAll('.cart__container .favorite').forEach((el, idx) => el.addEventListener('click', () => {
         if(favoriteService.getFavorites().some(favorite => favorite.id === products[idx].id)){
            favoriteService.deleteFromFavorite(products[idx])
         } else{
            favoriteService.setInFavorite(products[idx])
         }
      }))

      document.querySelectorAll('.cart__miss-block .favorite').forEach((el, idx) => el.addEventListener('click', () => {
         if(favoriteService.getFavorites().some(favorite => favorite.id === missingProducts[idx].id)){
            favoriteService.deleteFromFavorite(missingProducts[idx])
         } else{
            favoriteService.setInFavorite(missingProducts[idx])
         }
      }))

      document.querySelectorAll('.cart__container .favorite img').forEach((el, idx) => {
         el.addEventListener('mouseover', () => {
            el.src = '/src/images/icons/favoriteActive.svg'
         })

         el.addEventListener('mouseout', () => {
            if(!favoriteService.getFavorites().some(favorite => favorite.id === products[idx].id)){
               el.src = '/src/images/icons/favorite.svg'
            }
         })
      })

      document.querySelectorAll('.cart__miss-block .favorite img').forEach((el, idx) => {
         el.addEventListener('mouseover', () => {
            el.src = '/src/images/icons/favoriteActive.svg'
         })

         el.addEventListener('mouseout', () => {
            if(!favoriteService.getFavorites().some(favorite => favorite.id === missingProducts[idx].id)){
               el.src = '/src/images/icons/favorite.svg'
            }
         })
      })

      document.querySelectorAll('.delete img').forEach((el) => {
         el.addEventListener('mouseover', () => {
            el.src = '/src/images/icons/deleteActive.svg'
         })

         el.addEventListener('mouseout', () => {
            el.src = '/src/images/icons/delete.svg'
         })
      })
      
      document.querySelectorAll('.address__address .delete').forEach((el, idx) => el.addEventListener('click', () =>{
         const id = userService.getDeliveryAddresses()[idx].id
         userService.deleteDeliveryAddresses(id)
         userService.setChosenDelivery(userService.getDeliveryAddresses()[0])
         if(id === userService.getChosenAddress().address.id){
            userService.setTempDeliveryAddress(userService.getChosenDelivery().address)
            userService.setChosenAddress(userService.getChosenDelivery())
         }
         this.render()
      }))

      document.querySelectorAll('.address__point .delete').forEach((el, idx) => el.addEventListener('click', () => {
         const id = userService.getPointAddresses()[idx].id
         userService.deletePointAddresses(id)
         userService.setChosenPoint(userService.getPointAddresses()[0])
         if(id === userService.getChosenAddress().address.id){
            userService.setTempPointAddress(userService.getChosenPoint().address)
            userService.setChosenAddress(userService.getChosenPoint())
         }
         this.render()
      }))
   }
   
   addFunctionalityForOtherElements(){
      const products = cartService.getProducts()
      const cartItemCheckboxes = document.querySelectorAll('.cart__item .checkbox')
      const checkboxeForAllProducts = document.querySelector('#cart-checkbox__all')
      checkboxeForAllProducts.addEventListener('change', (e) => {
         cartItemCheckboxes.forEach((_, idx) => {
            products[idx].isChecked = e.target.checked ?  true : false
         })
         this.render()
      })
   
      document.querySelectorAll('.header__arrow > img').forEach((el, id) => el.addEventListener('click', (e) => {
         e.target.classList.toggle('active')
         document.querySelectorAll('.cart__accord-main')[id].classList.toggle('active')

         if(document.querySelector('.cart-accord').contains(e.target)){
            document.querySelector('.cart-accord label').classList.toggle('isActive')
            document.querySelector('.header__input-p').classList.toggle('isActive')
         }
      }))
   }
}
