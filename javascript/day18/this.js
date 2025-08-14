/*
function greet(greeting, name) {
  console.log(`${greeting}, ${name}!  나는 ${this.role}입니다.`);
}

const user = {role: "관리자"};

greet.call(user, "안녕하세요", "총명");
// 안녕하세요, 총명!  나는 관리자입니다.
greet.apply(user, ["반가워요", "총명"]);
// 반가워요, 총명!  나는 관리자입니다.
const boundGreet = greet.bind(user, "환영합니다");
boundGreet("총명");
// 환영합니다, 총명!  나는 관리자입니다.



const user2 = {
  name: "총명",
  greet() {
    console.log(`안녕 나는 ${this.name}이야`);
  }
}

user2.greet();

const sayHello = user2.greet;
const sayhello2 = user2.greet.bind(user2);
sayHello();
sayhello2();*/

function counter() {
  let count = 0;
  return function() {
    count++;
    console.log(count);
  };
}
const c= counter();
c();
c();