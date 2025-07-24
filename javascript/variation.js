const name = "총총";
let age = "1234";
let job = "노잡"

console.log(`안녕하세요. 제 이름은 ${name}이고, 나이는 ${age}입니다. 직업은 ${job}입니다.`)

const person = {name: "총명"};

// person = {name: "수정됨"};

person.name = "수정됨";

person.age = 20;

delete person.name;

console.log(person);

console.log(typeof "Hello");        //string
console.log(typeof 123);            //number
console.log(typeof true);           //boolean
console.log(typeof undefined);      //undefined
console.log(typeof null);           //object (버그)
console.log(typeof Symbol());       //symbol
console.log(typeof {});             //object
console.log(typeof []);             //object
console.log(typeof function (){});  //function