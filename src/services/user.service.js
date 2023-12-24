class UserService{
   init(user){
      this.user = user
      this.setChosenPoint(this.user.addresses.pointAddresses[0])
      this.setChosenDelivery(this.user.addresses.deliveryAddresses[0])
      this.setChosenAddress(this.point)
      this.setChosenCard(this.user.card[0])
      this.setTempCard(this.getChosenCard())
      this.setTempPointAddress(this.getChosenPoint().address)
      this.setTempDeliveryAddress(this.getChosenDelivery().address)
   }

   setChosenPoint(address){
      this.point = {
         deliveryMethod: 'в Пункт выдачи',
         address
      }
   }

   setChosenDelivery(address){
      this.delivery = {
         deliveryMethod: 'Курьером',
         address
      }
   }

   setChosenAddress(address){
      this.address = address
   }

   setChosenCard(card){
      this.card = card
   }

   setTempCard(card){
      this.tempCard = card
   }

   setTempPointAddress(address){
      this.tempPointAddress = address
   }

   setTempDeliveryAddress(address){
      this.tempDelivetyAddress = address
   }

   getChosenAddress(){
      return this.address
   }

   getChosenDelivery(){
      return this.delivery
   }

   getChosenPoint(){
      return this.point
   }

   getChosenCard(){
      return this.card
   }

   getDiscount(){
      return this.user.percentOfdiscount
   }

   getCards(){
      return this.user.card
   }

   getDeliveryAddresses(){
      return this.user.addresses.deliveryAddresses
   }

   getPointAddresses(){
      return this.user.addresses.pointAddresses
   }

   getTempCard(){
      return this.tempCard
   }

   getTempPointAddress(){
      return this.tempPointAddress
   }

   getTempDeliveryAddress(){
      return this.tempDelivetyAddress
   }

   deletePointAddresses(id){
      this.user.addresses.pointAddresses = this.getPointAddresses().filter(address => address.id !== id)
   }

   deleteDeliveryAddresses(id){
      this.user.addresses.deliveryAddresses = this.getDeliveryAddresses().filter(address => address.id !== id)
   }
}

export const userService = new UserService()
