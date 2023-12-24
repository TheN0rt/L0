export const getFullprice = (price, count) => {
   return (price * count)
}

export const getPriceWithDiscount = (price, count, productDiscount, userDiscount) => {
   return Math.floor(getFullprice(price, count) * (productDiscount / 100) * (1 - userDiscount / 100))
}

export const getProductDiscount = (price, productDiscount) => {
   return Math.floor(price * productDiscount / 100)
}

export const getUserDiscount = (price, userDiscount) => {
   return Math.floor(price * userDiscount / 100)
}

export const morphWord = function(num, arr){
   if(isNaN(num) || typeof arr !== 'object') return false
   if(num % 10 === 1 && num % 100 !== 11){
      return arr[0]
   }

   else if(num >= 10 && num < 20){
      return arr[2]
   }
   else if((num % 10 > 1 && num % 10 < 5)){
      return arr[1]
   } 
   else{
      return arr[2]
   }
}