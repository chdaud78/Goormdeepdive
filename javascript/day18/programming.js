const products = [{id: 1, price: 1000}, {id: 2, price: 20000}];

function applyDiscountInPlace(list, rate) {
  for(const p of list) {
    p.price = Math.round(p.price * (1-rate));
  }
}

applyDiscountInPlace(products, 0.1);
console.log(products);

const products2 = [{id: 1, price: 1000}, {id: 2, price: 20000}];

function applyDiscount(list,rate) {
  return list.map(p => ({...p, price: Math.round(p.price * (1-rate))}));
}

const discounted = applyDiscount(products2, 0.1);
console.log(products2);
console.log(discounted);