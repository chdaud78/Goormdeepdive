let fruit = "apple";

switch(fruit) {
  case "apple":
    console.log("사과입니다.");
    break;
  case "banana":
    console.log("바나나입니다.");
    break;
  default:
    console.log("알 수 없는 과일입니다.");
}

// 호이스팅 O
sayHello();

function sayHello() {
  console.log("안녕하세요");
}

// 호이스팅 X
// sayBye();

const sayBye = function () {
  console.log("안녕히계세요");
};

sayBye();

// 화살표 함수
const goodnight = () => {
  console.log("잘자요");
}

goodnight();

// 매개변수, 인자, 반환값 예제
function add(a,b) {
  return a+b;
}

const result = add(3,4);

function greet(name = "게스트") {
  console.log(`안녕하세요 ${name}님`);
}

greet();
greet("총명");

//함수는 값이다. 변수에 저장, 다른 함수에 전달, 리턴도가능

function multiply(x) {
  return x*2;
}

function applyFn(fn,value) {
  return fn(value);
}

console.log(applyFn(multiply, 5));

// 계산기
function calculate(a,b,operation) {
  if(operation === '+') return a+b;
  else if (operation === '-') return a-b;
  else if (operation === '*') return a*b;
  else if (operation === '/') return a/b;
  else if (operation === '%') return a%b;
  else return "지원하지 않는 연산자 입니다.";
}

console.log(calculate(10,5,"*"));