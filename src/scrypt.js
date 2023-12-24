import { products, missingProducts } from './data/productsData.js'
import { stocks } from './data/stocksData.js'
import { cartService } from "./services/cart.service.js";
import { Cart } from "./components/Cart.js";
import { stockService } from "./services/stock.service.js";
import { userService } from "./services/user.service.js";
import { user } from './data/userData.js';
import { formService } from './services/form.service.js';
import { favoriteService } from './services/favorite.service.js';

cartService.init(products, missingProducts)
stockService.init(stocks)
userService.init(user)
formService.init()
favoriteService.init()
const cart = new Cart(products)
cart.init()