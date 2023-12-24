import { stockService } from "../services/stock.service.js";
import { userService } from "../services/user.service.js";
import { getFullprice, getPriceWithDiscount, getProductDiscount, getUserDiscount } from "../utils/helpers.js";
import { View } from "../utils/view.js";

export class Product{
   constructor(template, product){
      this.template = template
      this.view = new View(this.template).getView()
      this.product = product
   }

   render(){
      const stockCounter = stockService.getStockCounter(this.product.id)
      this.view.productName.textContent = this.product.name
      this.view.productImg.setAttribute('src', this.product.images[0].url)
      this.view.productSize.textContent = this.product.size ? "Размер: " + this.product.size.map(size => size) : ''
      this.view.productColor.textContent = this.product.color ? "Цвет: " + this.product.color.map(color => color) : ''
      this.view.favorite.src = this.product.isInFavorite ? '/src/images/icons/favoriteActive.svg' : '/src/images/icons/favorite.svg'
      
      if(this.template.getAttribute('id') !== 'infoAboutMissingProduct'){
         const userDiscount = userService.getDiscount()
         this.view.checkbox.checked = this.product.isChecked
         this.view.companyName.textContent = this.product.company.name
         this.view.productStock.textContent = this.product.stock ? this.product.stock.map(stock => stock) : ''
         this.view.modalCompanyName.textContent = this.product.company.name
         this.view.modalCompanyOGRN.textContent = "ОГРН: " + this.product.company.ogrn
         this.view.modalCompanyAddress.textContent = this.product.company.address
   
         this.view.productCount.textContent = this.product.count
   
         this.view.productCurrentPrice.textContent = getPriceWithDiscount(this.product.price, this.product.count, this.product.percentOfdiscount, userDiscount).toLocaleString()
         this.view.productFullPice.textContent = getFullprice(this.product.price, this.product.count).toLocaleString()
         this.view.productDiscount.textContent = "Скидка " + this.product.percentOfdiscount + "%"
         this.view.productDiscountCount.textContent = -getProductDiscount(this.product.price, this.product.percentOfdiscount) + " сом"
         this.view.userDiscount.textContent = "Скидка покупателя " + userDiscount + "%"
         this.view.userDiscountCount.textContent = -getUserDiscount(this.product.price, userDiscount) + " сом"
         this.product.count === stockCounter ? this.view.productIncrease.classList.add('gray') : this.view.productIncrease.classList.remove('gray')
         this.product.count === 1 ? this.view.productDecrease.classList.add('gray') : this.view.productDecrease.classList.remove('gray')

         if(stockCounter < 100){
            this.view.productAttention.classList.add('isActive')
            this.view.productAttention.innerText = `Осталось ${stockCounter} шт.`
         } else{
            this.view.productAttention.classList.remove('isActive')
         }
      }

   }
}
