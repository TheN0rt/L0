class StockService{
   init(stocks){
      this.stocks = stocks
   }

   getStockCounter = (id) => {
      return this.stocks.reduce((acc, stock) => {
         return acc += stock.storage.reduce((acc, storage) => {
            return acc += storage.id === id ? storage.count : 0 
         } , 0)
      }, 0) 
   }
}

export const stockService = new StockService()