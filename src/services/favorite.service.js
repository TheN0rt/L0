import { missingProducts, products } from "../data/productsData.js"

class FavoriteService{
   init(){
      this.favorites = [...products.filter(el => el.isInFavorite), ...missingProducts.filter(el => el.isInFavorite)]
   }

   setInFavorite(product){
      product.isInFavorite = true
      this.favorites = [...products.filter(el => el.isInFavorite), ...missingProducts.filter(el => el.isInFavorite)]
   }

   deleteFromFavorite(product){
      product.isInFavorite = false
      this.favorites = [...products.filter(el => el.isInFavorite), ...missingProducts.filter(el => el.isInFavorite)]
   }

   getFavorites(){
      return this.favorites
   }
}

export const favoriteService = new FavoriteService()