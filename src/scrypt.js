const user = {
   percentOfdiscount: 10,
   card: [
      {
         name: 'mir',
         number: '1234 56•• •••• 1234',
         image: '/src/images/banks/mir.png',
         date: {
            month: 1,
            year: 30,
         }
      },
      {
         name: 'visa',
         number: '1234 56•• •••• 1234',
         image: '/src/images/banks/visa.png',
         date: {
            month: 1,
            year: 30,
         }
      },
      {
         name: 'master',
         number: '1234 56•• •••• 1234',
         image: '/src/images/banks/master.png',
         date: {
            month: 1,
            year: 30,
         }
      },
      {
         name: 'maestro',
         number: '1234 56•• •••• 1234',
         image: '/src/images/banks/maestro.png',
         date: {
            month: 1,
            year: 30,
         }
      },
   ],
   favorites: [],
   addresses: {
      pointAddresses: [
         {
            id: 1,
            place: 'г. Бишкек, микрорайон Джал, улица Ахунбаева Исы, д. 67/1',
            rating: 0,
         },
         {
            id: 2,
            place: 'г. Бишкек, микрорайон Джал, улица Ахунбаева Исы, д. 67/1',
            rating: 4.99,
         },
         {
            id: 3,
            place: 'г. Бишкек, улица Табышалиева, д. 57',
            rating: 4.99,
         },
      ],

      deliveryAddresses: [
         {
            id: 1,
            place: 'Бишкек, улица Табышалиева, 57'
         },
         {
            id: 2,
            place: 'Бишкек, улица Жукеева-Пудовкина, 77/1'
         },
         {
            id: 3,
            place: 'Бишкек, микрорайон Джал, улица Ахунбаева Исы, 67/1'
         }
      ],
      delete(id, arr){
         const index = arr.findIndex(obj => obj.id === id);
         arr.splice(index, 1)
      }
   }
}

let cart = [
   {
      id: 1,
      name: 'Футболка UZcotton мужская',
      size: [56], 
      color: ['белый'],
      count: 1, 
      price: 1051,
      percentOfdiscount: 55,
      images: [
         {
            name: 'tShirt', 
            url: '/src//images/products/tShirt.png'
         },
         {
            name: 'tShirt_0.5x', 
            url: '/src//images/products/tShirt_0.5x.png'
         },
      ], 
      companyName: 'OOO Вайлдберриз',
      stock: ['Коледино WB']
   },
   {
      id: 2,
      name: 'Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe', 
      color: ['прозрачный'],
      count: 200, 
      price: 11500,
      percentOfdiscount: 55,
      images: [
         {
            name: 'case', 
            url: '/src//images/products/case.png'
         },
         {
            name: 'case_0.5x', 
            url: '/src//images/products/case_0.5x.png'
         },
      ], 
      companyName: 'OOO Мегапрофстиль',
      stock: ['Коледино WB']
   },
   {
      id: 3,
      name: 'Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные, Faber-Castell ',
      count: 2, 
      price: 475,
      percentOfdiscount: 50,
      images: [
         {
            name: 'pencil', 
            url: '/src/images/products/pencil.png'
         },
         {
            name: 'pencil_0.5x', 
            url: '/src/images/products/pencil_0.5x.png'
         },
      ], 
      companyName: 'OOO Вайлдберриз',
      stock: ['Коледино WB']
   }
]

const stocks = []

const cartBlock = document.querySelector('.cart__container .cart-block')
const cartMissBlock = document.querySelector('.cart__miss-block .cart-block')
const accordions = document.querySelectorAll('.cart__accord-main')
const accordionsBtns = document.querySelectorAll('.header__arrow')
const popupDelivery = document.querySelector('#popup__delivery')
const popupDeliveryPointFrom = document.querySelector('#popup__delivery .address__point')
const popupDeliveryAddressFrom = document.querySelector('#popup__delivery .address__address')
const popupDeliveryBtn = document.querySelector('#popup__delivery .btn')
const popupPay = document.querySelector('#popup__pay')
const popupPayList = document.querySelector('#popup__pay .popup__subtitle form')
const popupPayBtn = document.querySelector('#popup__pay .btn')
const changeDelivery = document.querySelectorAll('.change__delivery')
const changePay = document.querySelectorAll('.pay__change')

const addToCart = () => {
   for(let obj of cart){
      const fullPrice = Math.floor(obj.price * obj.count)
      const currentPrice = Math.floor(fullPrice - (fullPrice * obj.percentOfdiscount / 100 - fullPrice * user.percentOfdiscount / 100))
      const textBlock = document.createElement('div')
      textBlock.classList.add('cart__item')
      textBlock.setAttribute('data-type', obj.id)
      textBlock.innerHTML = `
         <div class="cart__item-left">
            <div class="cart__item-checkbox">
               <input type="checkbox" name="cart__checkbox-${obj.id}" class="checkbox">
               <div class="cart__item-img">
                  <img src="${obj.images[0].url}" alt="product">
               </div>
            </div>
            <div class="cart__item-info info">
               <p class="info__name">
                  ${obj.name}
               </p>
               <div class="info__color-block">
                  ${obj?.color ? `<span>Цвет: ${obj.color}</span>` : ''}
                  ${obj?.size ? `<span>Размер: ${obj.size}</span>` : ''}
               </div>
               <div class="info__footer">
                  <p class="info__stock">
                     ${obj.stock}
                  </p>
                  <p class="info__company-name">
                     ${obj.companyName}
                     <span class="info__company-name-info">
                        i
                     </span>
                  </p>
               </div>
            </div>
         </div>
         <div class="cart__item-right">
            <div class="cart__item-additive-action">
               <div class="cart__item-counter counter">
                  <span class="counter__minus">-</span>
                  <span class="counter__count">${obj.count}</span>
                  <span class="counter__plus">+</span>
               </div>
               <div class="cart__item-attention">
                  Осталось 2 шт.
               </div>
               <div class="cart__item-icons icons">
                  <div class="icons__item favorite">
                     <img src="./src/images/icons/favorite.svg" alt="favorite">
                  </div>
                  <div class="icons__item delete">
                     <img src="./src/images/icons/delete.svg" alt="delete">
                  </div>
               </div>
            </div>
            <div class="cart__item-price price">
               <div class="price__current">
                  <span class="price__current-number">
                     ${currentPrice.toLocaleString()}
                  </span>
                  <span>com</span>
               </div>
               <div class="price__previous gray">
                  <span class="price__previous-number">
                     ${fullPrice.toLocaleString()}
                  </span>
                  <span>com</span>
               </div>
            </div>
         </div>
      `
      cartBlock.appendChild(textBlock)
   }
}

addToCart()

for(let obj of cart){
   const textBlock = document.createElement('div')
   textBlock.classList.add('cart__item')
   textBlock.setAttribute('data-type', obj.id)
   textBlock.innerHTML = `
   <div class="cart__item-left">
      <div class="cart__item-img">
         <img src="${obj.images[0].url}" alt="product">
      </div>
      <div class="cart__item-info info">
         <p class="info__name">
            ${obj.name}
         </p>
         <div class="info__color-block">
            ${obj?.color ? `<span>Цвет: ${obj.color}</span>` : ''}
            ${obj?.size ? `<span>Размер: ${obj.size}</span>` : ''}
         </div>
      </div>
   </div>
   <div class="cart__item-right">
      <div class="cart__item-additive-action">
         <div class="cart__item-icons icons">
               <div class="icons__item favorite">
                  <img src="./src/images/icons/favorite.svg" alt="favorite">
               </div>
               <div class="icons__item delete">
                  <img src="./src/images/icons/delete.svg" alt="delete">
               </div>
            </div>
         </div>
      </div>
   </div>
   `
   cartMissBlock.appendChild(textBlock)
}

for(let el of user.card){
   const cart = document.createElement('label')
   cart.setAttribute('for', `${el.name}__bank`)
   cart.innerHTML = `
      <input type="radio" name="bank" id="${el.name}__bank" value="${el.name}">
      <div class="custom__radio"></div>
      <div class="popup__card">
         <img src="${el.image}" alt="bank">
         <span class="card__number">${el.number}</span>
      </div>
   `
   popupPayList.append(cart)
}

const payRadiobtns = document.querySelectorAll('#popup__pay input[type = "radio"]')
payRadiobtns[0].checked = true

const favoriteBtn = document.querySelectorAll('.favorite')
const cartItems = document.querySelectorAll('.cart__item')
const deleteCartItemBtn = document.querySelectorAll('.cart__item .delete')

const currentPriceBlock = document.querySelectorAll('.price__current-number')
const previousPriceBlock = document.querySelectorAll('.price__previous-number')
const counterMinus = document.querySelectorAll('.counter .counter__minus')
const counterPlus = document.querySelectorAll('.counter .counter__plus')
const counter = document.querySelectorAll('.counter .counter__count')

const checkboxAllItem = document.querySelector('#cart-checkbox__all')
const cartCheckboxes = document.querySelectorAll('.cart-block .cart__item input[type="checkbox"]')

const setSum = () => {
   let sum = cart.reduce((acc, el, index) => {
      if(cartCheckboxes[index].checked){
         acc = acc + Math.floor(el.count * el.price)
      }

      return acc
   }, 0)
   sum = Math.floor(sum)
   document.querySelector('.summary__info ul:last-child li:first-child span').innerText = sum.toLocaleString()
   return sum
}

const setSummaryCount = () => {
   const count = cart.reduce((acc, el, index) => {
      if(cartCheckboxes[index].checked){
         acc = acc + el.count
      }

      return acc
   }, 0)
   document.querySelector('.summary__info ul:first-child li:first-child span').innerText = count
}

// Исправить 
// В итоговом цена другая

const setDiscount = () => {
   const discount = cart.reduce((acc, el, index) => {
      if(cartCheckboxes[index].checked){
         const fullPrice = Math.floor(el.count * el.price)
         const discountPrice = Math.ceil((fullPrice * el.percentOfdiscount / 100 - fullPrice * user.percentOfdiscount / 100))
         acc = Math.floor(acc - discountPrice)
      }
      return acc
   }, 0)

   document.querySelector('.summary__info ul:last-child li:nth-child(2) span').innerText = discount.toLocaleString()
   return discount
}

const setSumWithDiscount = () => {
   const sum = setSum()
   const discount = setDiscount()
   const summary = sum + discount
   document.querySelector('#total__price').innerText = summary.toLocaleString()
}

checkboxAllItem.addEventListener('change', () => {
   if(checkboxAllItem.checked == true){
      cartCheckboxes.forEach((el) => el.checked = true)
      setSummaryCount()
      setSumWithDiscount()
   } else{
      cartCheckboxes.forEach((el) => el.checked = false)
      setSummaryCount()
      setSumWithDiscount()
   }
})

const isAllCheckboxTrue = () => {
   let allCheck = true
   for(let i = 0; i < cartCheckboxes.length; i++){
      if(!cartCheckboxes[i].checked){
         allCheck = false
         break
      }
   }
   return allCheck
}

cartCheckboxes.forEach((el) => {
   el.addEventListener('change', () => {
      setSummaryCount()
      setSumWithDiscount()
      if(isAllCheckboxTrue()){
         checkboxAllItem.checked = true
      } else{
         checkboxAllItem.checked = false
      }

      console.log(isAllCheckboxTrue())
   })
})

counterMinus.forEach((el, index) => {
   el.addEventListener('click', () => {
      let id = cartItems[index].getAttribute('data-type')
      const indexOfItem = cart.findIndex((el) => id == el.id)

      if(cart[indexOfItem].count > 1){
         cart[indexOfItem].count = cart[indexOfItem].count - 1
         const fullPrice = Math.floor(cart[indexOfItem].price * cart[indexOfItem].count)
         const currentPrice = Math.floor((fullPrice - (fullPrice * cart[indexOfItem].percentOfdiscount / 100 - fullPrice * user.percentOfdiscount / 100)))
         counter[index].innerText = cart[indexOfItem].count.toLocaleString()
         currentPriceBlock[index].innerText = currentPrice.toLocaleString()
         previousPriceBlock[index].innerText = fullPrice.toLocaleString()
         // setSum()
         setSummaryCount()
         // setDiscount()
         setSumWithDiscount()
      }
   })
})

counterPlus.forEach((el, index) => {
   el.addEventListener('click', () => {
      let id = cartItems[index].getAttribute('data-type')
      const indexOfItem = cart.findIndex((el) => id == el.id)

      cart[indexOfItem].count = cart[indexOfItem].count + 1
      const fullPrice = Math.floor(cart[indexOfItem].price * cart[indexOfItem].count)
      const currentPrice = Math.floor((fullPrice - (fullPrice * cart[indexOfItem].percentOfdiscount / 100 - fullPrice * user.percentOfdiscount / 100)))
      counter[index].innerText = cart[indexOfItem].count.toLocaleString()
      currentPriceBlock[index].innerText = currentPrice.toLocaleString()
      previousPriceBlock[index].innerText = fullPrice.toLocaleString()
      // setSum()
      setSummaryCount()
      // setDiscount()
      setSumWithDiscount()

   })
})

accordionsBtns.forEach((btn, index) => {
   btn.addEventListener('click', () => {
      accordions[index].classList.toggle('active')
      btn.classList.toggle('active')
   })
})

const openPopup = (popup) => {
   popup.classList.add('active')
}

changeDelivery.forEach((el) => {
   el.addEventListener('click', () => {
      openPopup(popupDelivery)
   })
})

changePay.forEach((el) => {
   el.addEventListener('click', () => {
      openPopup(popupPay)
   })
})

let currentCard;

popupPayList.addEventListener('change', (e) => {
   e.target.checked = true
   currentCard = user.card.find((el) => el.name === e.target.value)
})

popupPayBtn.addEventListener('click', () => {
   // e.preventDefault()
   popupPay.classList.remove('active')
   const cardInCart = document.querySelectorAll('.pay__card')
   cardInCart.forEach((el) => {
      el.children[0].src = currentCard.image
      el.children[1].innerHTML = currentCard.number
      if(el.children.length >= 3){
         el.children[2].children[0].innerHTML = currentCard.date.month < 10 ? '0' + currentCard.date.month : currentCard.date.month 
         el.children[2].children[1].innerHTML = currentCard.date.year
      }
   })
})

for(let el of user.addresses.pointAddresses){
   const div = document.createElement('div')
   div.setAttribute('data-type', el.id)
   div.classList.add('point-block')
   div.innerHTML = `
   <label for="point__${el.id}">
      <input type="radio" name="delivery__point" id="point__${el.id}" value="${el.id}">
      <div class="custom__radio"></div>
      <div class="popup__point">
         <div class="popup__address">
            <p class="popup__address-p">
               ${el.place}
            </p>
            <p>
               <span class="rating">${el.rating ? el?.rating : ''}</span>
               <span class="gray">Пункт выдачи</span>
            </p>
         </div>
      </div>
   </label>
   <div class="icons__item delete">
      <img src="./src/images/icons/delete.svg" alt="delete">
   </div>
         `
         popupDeliveryPointFrom.appendChild(div)
      }
      
for(let el of user.addresses.deliveryAddresses){
   const div = document.createElement('div')
   div.setAttribute('data-type', el.id)
   div.classList.add('address-block')
   div.innerHTML = `
   <label for="address__${el.id}">
      <input type="radio" name="delivery__point" id="address__${el.id}" value="${el.id}">
      <div class="custom__radio"></div>
      <div class="popup__point">
         <div class="popup__address">
            <p class="popup__address-p">
               ${el.place}
            </p>
         </div>
      </div>
   </label>
   <div class="icons__item delete">
      <img src="./src/images/icons/delete.svg" alt="delete">
   </div>
   `
   popupDeliveryAddressFrom.appendChild(div)
}

const pointRadio = document.querySelectorAll('.address__point input[type="radio"]')
const addressRadio = document.querySelectorAll('.address__address input[type="radio"]')
pointRadio[0].checked = true
addressRadio[0].checked = true

const pointBlock = document.querySelectorAll('.address__point .point-block')
const addressBlock = document.querySelectorAll('.address__address .address-block')
const deletePointBtn = document.querySelectorAll('.address__point .delete')
const deleteAddressBtn = document.querySelectorAll('.address__address .delete')

favoriteBtn.forEach((el, index) => {
   el.addEventListener('click', () => {
      el.classList.toggle('active')
      let id = cartItems[index].getAttribute('data-type')
      const item = cart.find((el) => +id === el.id)
      if(user.favorites.includes(item)){
         user.favorites = user.favorites.filter((el) => item.id !== el.id)
      } else{
         user.favorites.push(item)
      }
      // console.log(cartItems[index].getAttribute('data-type'))
   })
})

const deleteItem = (block, arr) => {
   let id = block.getAttribute('data-type')
   const itemIndex = arr.findIndex((el) => id == el.id)
   arr.splice(itemIndex, 1)
   block.remove()
   console.log(arr)
}

const deleteAddress = (block, arr) => {
   let id = block.getAttribute('data-type')
   user.addresses.delete(+id, arr)
   block.remove()
}

deleteCartItemBtn.forEach((el, index) => {
   el.addEventListener('click', (e) => {
      e.preventDefault()
      deleteItem(cartItems[index], cart)
      setSumWithDiscount()
      setSummaryCount()
   })
})

// Исправить вёрстку. Убрать из лейблов картинку удаления, обернуть в блок
var currentAddress = user.addresses.deliveryAddresses[0];
var currentPoint = user.addresses.pointAddresses[0];

deleteAddressBtn.forEach((el, index) => {
   el.addEventListener('click', (e) => {
      e.preventDefault()
      deleteAddress(addressBlock[index], user.addresses.deliveryAddresses)
      const addressRadio = document.querySelectorAll('.address__address input[type="radio"]')
      addressRadio[0].checked = true
      currentAddress = user.addresses.deliveryAddresses[0];
   })
})

deletePointBtn.forEach((el, index) => {
   el.addEventListener('click', (e) => {
      e.preventDefault()
      deleteAddress(pointBlock[index], user.addresses.pointAddresses)
      const pointRadio = document.querySelectorAll('.address__point input[type="radio"]')
      pointRadio[0].checked = true
      currentPoint = user.addresses.pointAddresses[0];
   })
})

const popupDeliverySelection = document.querySelector('.popup__delivery-selection')
popupDeliverySelection.addEventListener('click', (e) => {
   if(e.target == popupDeliverySelection.children[0] || popupDeliverySelection.children[0].contains(e.target)){
      popupDeliverySelection.children[0].classList.add('active')
      popupDeliverySelection.children[1].classList.remove('active')
      popupDeliveryPointFrom.classList.add('active')
      popupDeliveryAddressFrom.classList.remove('active')
   } else {
      popupDeliverySelection.children[0].classList.remove('active')
      popupDeliverySelection.children[1].classList.add('active')
      popupDeliveryAddressFrom.classList.add('active')
      popupDeliveryPointFrom.classList.remove('active')
   }
})


popupDeliveryAddressFrom.addEventListener('change', (e) => {
   e.target.checked = true
   currentAddress = user.addresses.deliveryAddresses.find((el) => el.id == e.target.value)
})

popupDeliveryPointFrom.addEventListener('change', (e) => {
   e.target.checked = true
   currentPoint = user.addresses.pointAddresses.find((el) => el.id == e.target.value)
})

popupDeliveryBtn.addEventListener('click', () => {
   if(popupDeliveryAddressFrom.classList.contains('active')){
      console.log(currentAddress)
      document.querySelector('.subtitle__left').children[0].innerText = 'Пункт доставки'
      document.querySelector('.subtitle__right #delivery__point').children[0].innerText = currentAddress.place
      document.querySelector('.subtitle__right #delivery__point').children[1].innerHTML = `
      <span class="rating"></span>
      <span>Ежедневно с 10 до 21</span>`
      document.querySelector('.subtitle__right #delivery__point').children[1].style.opacity = '0'
      document.querySelector('.summary .cart__delivery-title h2').innerText = "Доставка по адресу"
      document.querySelector('.summary .summary__delivery-container .delivery__address').innerText = currentAddress.place

   } else if(popupDeliveryPointFrom.classList.contains('active')){
      document.querySelector('.subtitle__left').children[0].innerText = 'Пункт выдачи'
      document.querySelector('.subtitle__right #delivery__point').children[0].innerText = currentPoint.place
      document.querySelector('.subtitle__right #delivery__point').children[1].innerHTML = `
      <span class="rating">${currentPoint.rating ? currentPoint.rating : ''}</span>
      <span>Ежедневно с 10 до 21</span>
      `
      document.querySelector('.subtitle__right #delivery__point').children[1].style.opacity = '1'
      document.querySelector('.summary .cart__delivery-title h2').innerText = "Доставка в пункт выдачи"
      document.querySelector('.summary .summary__delivery-container .delivery__address').innerText = currentPoint.place
   }
   popupDelivery.classList.remove('active')
})

const typesOfInput = ['name', 'surname', 'email', 'phone', 'inn']

const checkValidation = (input, type) => {
   const value = input.value
   let validate;
   let errorText;

   switch(type){
      case 'name':
         validate = /^[a-zA-Z\-]+$/;
         errorText = 'Проверьте имя'
         break
      case 'surname':
         validate = /^[a-zA-Z\-]+$/;
         errorText = 'Проверьте фамилию'
         break
      case 'email':
         validate = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
         errorText = 'Проверьте адрес электронной почты'
         break
      case 'phone':
         validate = /^\+\d \d{3} \d{3} \d{2} \d{2}$/;
         errorText = 'Формат +9 999 999 99 99'
         break
      case 'inn':
         validate = /[0-9]{14}/
         errorText = 'Проверьте ИНН'
         break
      default:
         break
   }

   if(!validate.test(value)) {
      if(type == 'inn'){
         input.parentElement.parentElement.children[3].classList.add('active')
         input.parentElement.parentElement.children[2].style.display = 'none'
         input.parentElement.parentElement.children[3].innerText = errorText
      } else{
         input.parentElement.parentElement.children[2].innerText = errorText
         input.parentElement.parentElement.children[2].classList.add('active')
      }
      input.classList.add('error')
      input.parentElement.classList.add('error')
   } else{
      if(type == 'inn'){
         input.parentElement.parentElement.children[3].classList.remove('active')
         input.parentElement.parentElement.children[2].style.display = 'block'
         // input.parentElement.parentElement.children[3].innerText = 'Для таможенного оформления'
      } else{
         input.parentElement.parentElement.children[2].classList.remove('active')
      }
      input.classList.remove('error')
      input.parentElement.classList.remove('error')
   }
}

const checkEmptyValidation = (input, index) => {
   input.classList.add('error')
   input.parentElement.classList.add('error')
   let errorText;

   switch(index){
      case 0:
         errorText = 'Укажите имя'
         break
      case 1:
         errorText = 'Укажите фамилию'
         break
      case 2:
         errorText = 'Укажите почту'
         break
      case 3:
         errorText = 'Укажите номер телефона'
         break
      case 4:
         errorText = 'Укажите ИНН'
         break
      }
      
   if(index === inputsFrom.length - 1){
      input.parentElement.parentElement.children[3].classList.add('active')
      input.parentElement.parentElement.children[2].style.display = 'none'
      input.parentElement.parentElement.children[3].innerText = errorText
   } else{
      input.parentElement.parentElement.children[2].innerText = errorText
      input.parentElement.parentElement.children[2].classList.add('active')
   }
}

const inputsFrom = document.querySelectorAll('.form__input input[type="text"]')

inputsFrom.forEach((input, index) => {
   input.addEventListener('blur', () => {
      if(input.value.length > 0){
         checkValidation(input, typesOfInput[index])
      } else{
         checkEmptyValidation(input, index)
      }
   })

   input.addEventListener('input', () => {
      if(input.value.length > 0){
         input.parentElement.parentElement.children[0].style.opacity = 1
      } else{
         input.parentElement.parentElement.children[0].style.opacity = 0
      }
   })
})

// console.log(deletePointBtn, addressBlock)
setSummaryCount()
setSumWithDiscount()