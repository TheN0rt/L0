import { View } from "../utils/view.js";
import { Product } from "./Product.js";

export class ProductList{
   constructor(template, root){
      this.products = []
      this.template = template
      this.root = root
      this.view = new View(this.template).getView()
   }

   attach() {
      const clone = this.template.content.cloneNode(true)
      this.root.appendChild(clone);
   }
  
   update(products) {
      this.products = products;
      this.render();
   }
  
   render() {
      this.root.innerHTML = '';
      this.products.forEach((product) => {
         const productComp = new Product(this.template, product);
         productComp.render();
         this.attach()
      });
   }
}
