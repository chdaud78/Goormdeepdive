// push
const fruits = ["사과", "바나나"];
fruits.push("포도"); // 끝에 추가
console.log(fruits); // ["사과", "바나나", "포도"]

// pop
const fruits = ["사과", "바나나", "포도"];
const removed = fruits.pop(); // "포도"
console.log(removed); // "포도"
console.log(fruits); // ["사과", "바나나"]

// unshift
const nums = [2, 3];
nums.unshift(1); // 앞에 추가
console.log(nums); // [1, 2, 3]

// shift
const nums = [1, 2, 3];
const first = nums.shift(); // "1"
console.log(first); // 1
console.log(nums); // [2, 3]

// foreach
const colors = ["빨강", "파랑", "노랑"];
colors.forEach((color, index) => {
  console.log(`${index + 1}번째 색: ${color}`);
});

// map
const nums = [1, 2, 3];
const doubled = nums.map(n => n * 2);
console.log(doubled); // [2, 4, 6]

// filter
const nums = [1, 2, 3, 4];
const even = nums.filter(n => n % 2 === 0);
console.log(even); // [2, 4]

// reduce
const nums = [1, 2, 3, 4];
const total = nums.reduce((acc, cur) => acc + cur, 0);
console.log(total); // 10

// includes
const pets = ["고양이", "강아지"];
console.log(pets.includes("고양이")); // true
console.log(pets.includes("햄스터")); // false

// find
const users = [
  { name: "시온", age: 18 },
  { name: "준형", age: 22 },
];

const teen = users.find(u => u.age < 20);
console.log(teen); // { name: "시온", age: 18 }

// some
const scores = [60, 80, 45];
const hasFail = scores.some(score => score < 50);
console.log(hasFail); // true

// every
const scores = [85, 90, 88];
const allPass = scores.every(score => score >= 80);
console.log(allPass); // true

// sort
const nums = [3, 1, 4, 2, 10];
nums.sort(); // 문자열 기준 정렬!
console.log(nums); // [1, 10, 2, 3, 4] ????

// reverse
const arr = [1, 2, 3];
arr.reverse();
console.log(arr); // [3, 2, 1]

// slice
const animals = ["고양이", "강아지", "햄스터", "토끼"];
const some = animals.slice(1, 3);
console.log(some); // ["강아지", "햄스터"]
console.log(animals); // 원본 유지

// splice
const nums = [1, 2, 3, 4];
nums.splice(1, 2, 99); // index 1부터 2개 삭제 후 99 삽입
console.log(nums); // [1, 99, 4]

// join
const words = ["나는", "자바스크립트를", "배운다"];
const sentence = words.join(" ");
console.log(sentence); // "나는 자바스크립트를 배운다"

// flat
const nested = [1, [2, [3, 4]]];
console.log(nested.flat(2)); // [1, 2, 3, 4]

// at
const nums = [10, 20, 30, 40];
console.log(nums.at(-1)); // 40 (마지막 요소)

// reduce
const nums = [1, 2, 3];
const sum = nums.reduce((acc, cur) => acc + cur, 0);
console.log(sum); // 6