class CartService{
   init(products, missingProducts){
      this.setProducts(products)
      this.setMissingProducts(missingProducts)
      this.updateCounter()
      this.setPayCheckbox(false)
      this.setSelection('deliveryPointSelection')
   }

   setSelection(selection){
      this.selection = selection
   }

   setProducts(products){
      this.products = products
   }

   setMissingProducts(missingProducts){
      this.missingProducts = missingProducts
   }

   setPayCheckbox(check){
      this.check = check
   }

   getProducts(){
      return this.products
   }

   getMissingProducts(){
      return this.missingProducts
   }

   getSelection(){
      return this.selection
   }

   isCheckboxChecked(){
      return this.check
   }

   deleteProduct(id){
      this.products = this.products.filter((_, idx) => idx !== id)
      this.updateCounter()
   }

   deleteMissingProduct(id){
      this.missingProducts = this.missingProducts.filter((_, idx) => idx !== id)
   }

   increaseCount(product){
      product.count++
   }

   decreaseCount(product){
      product.count--
   }

   updateCounter(){
      document.querySelectorAll('.icons__cart .notification').forEach(el => {
         if(this.products.length === 0){
            el.classList.remove('isActive')
         }
   
         el.innerText = this.products.length
      })
   }

   setDate(date){
      this.date = date
   }

   getDate(){
      return this.date
   }
}

export const cartService = new CartService() 
