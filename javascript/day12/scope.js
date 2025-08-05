/*
let globalVar = "전역";

function example () {
  let localVar = "지역";
  console.log(globalVar);
  console.log(localVar);
}

console.log(globalVar);
// console.log(localVar);

example();

function Person(name) {
  this.name = name;
}

Person.prototype.sayHi = function () {
  console.log(`안녕 나는 ${this.name}`);
};

const pl = new Person("총명");
pl.sayHi();*/

function outer() {
  let count = 0;
  console.log("확인");
  return function inner() {
    count++;
    console.log("확인2");
    console.log(count);
  }
}

// const counter = outer();
// counter();
// counter();
// counter();
// counter();
// counter();
// counter();

outer();
outer();
outer();
outer();
outer()();
outer()();
outer()();
outer()();