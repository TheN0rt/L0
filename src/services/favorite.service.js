import { missingProducts, products } from "../data/productsData.js"

class FavoriteService{
   init(){
      this.favorites = [...products.filter(el => el.isInFavorite), ...missingProducts.filter(el => el.isInFavorite)]
      this.updateCounters()
   }

   setInFavorite(product){
      product.isInFavorite = true
      this.favorites = [...products.filter(el => el.isInFavorite), ...missingProducts.filter(el => el.isInFavorite)]
      this.updateCounters()
   }

   deleteFromFavorite(product){
      product.isInFavorite = false
      this.favorites = [...products.filter(el => el.isInFavorite), ...missingProducts.filter(el => el.isInFavorite)]
      this.updateCounters()
   }
   
   updateCounters(){
      const notification = document.querySelector('.favorite__mobile .notification')
      notification.innerText = this.favorites.length

      this.favorites.length > 0 ? notification.classList.add('isActive')
      : notification.classList.remove('isActive')
   }

   getFavorites(){
      return this.favorites
   }
}

export const favoriteService = new FavoriteService()