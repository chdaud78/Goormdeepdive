/*function divide(a,b) {
  if(b===0) {
    throw new Error("0으로 나눌 수 없습니다.");
  }
  return a/b
}

try {
  const result = divide(10,0);
  console.log("결과:" ,result);
} catch (err) {
  console.error("에러 타입", err.name);
  console.error("에러 메시지", err.message);
}

function shout(text) {
  if(typeof text !== "string") {
    throw new TypeError("shout 함수에는 문자열만 전달해야 합니다.");
  }

  return text.toUpperCase();
}

console.log(shout("hello"));
console.log(shout(123));

function greet(name) {
  if(typeof name !== "string") {
    throw new TypeError("이름은 문자열 이어야 합니다.");
  }

  return "안녕, " + name;
}

console.log(greet("총명"));
console.log(greet(123));*/

/*const sessionMap = new Map();
const user1 = {id : 1, name : "시온"}
const user2 = {id: 2, name : "지우"};
const loginTime = new Date();
const sessionId = Symbol("session");
const userAgent = navigator.userAgent;

sessionMap.set(user1, "10:00 로그인");
sessionMap.set(user2, "10:05 로그인");
sessionMap.set(loginTime, "전체 세션 시작");
sessionMap.set(sessionId, {browser : "Chrome", os: "Mac"});
sessionMap.set(userAgent, "모바일 접속");

for(let [key,value] of sessionMap.entries()) {
  console.log("키:", key, "-> 값:", value);
}*/

const mySet = new Set();
mySet.add(1);
mySet.add(2);
mySet.add(3);

console.log(mySet);

const rawTags = ['html', 'css', 'javascript', 'css', 'html'];
const uniqueTags = [...new Set(rawTags)];

console.log(uniqueTags);

const arr = [1,2,2,3,3];
const uniqueArr = [...new Set(arr)];
console.log(uniqueArr);
