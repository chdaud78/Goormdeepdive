/*const animal = {
  eats: true,
  walk() {
    console.log("걷는다");
  }
}

const rabbit = Object.create(animal);
rabbit.jumps = true;

console.log(rabbit.eats);
rabbit.walk();
console.log(rabbit.jumps);*/

class animal {
  constructor(eat) {
    this.eat = eat;
  }

  eating() {
    console.log(`${this.eat} 먹는다`);
  }
}

animal.prototype.eat = "딸기";
animal.prototype.eating();


class Product {
  static count = 0;
  #secretCode = "xyz";

  constructor(name, price) {
    this.name = name;
    this.price = price;
    Product.count++;
  }

  get priceWithTax() {
    return this.price *1.1;
  }

  set priceWithTax(value) {
    this.price = value / 1.1;
  }

  show() {
    console.log(`${this.name} : ${this.price}원`);
  }

  static total() {
    return Product.count;
  }
}

const p1 = new Product('TV', 1000000);
const p2 = new Product('Phone', 300000);

p1.show();
p2.show();
console.log(p1.price);
console.log(p2.price);
console.log(p1.priceWithTax);
console.log(p2.priceWithTax);

p2.priceWithTax = 550000;
console.log(p2.price);
console.log(Product.total());
console.log(Product.count);
console.log(p1.secretCode);



class Person {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name.toUpperCase(); // 출력 형식 제어
  }

  set name(value) {
    if(value.length < 2) {
      throw new Error("이름은 두 글자 이상이어야 합니다.");
    }
    this._name = value;
  }
}

const p = new Person("chong Myeong Park");
console.log(p.name);
// p.name = "h";
// console.log(p.name);

