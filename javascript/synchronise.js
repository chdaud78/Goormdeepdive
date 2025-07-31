// 동기 비동기

/*
console.log("1. 커피 주문");

console.log("2. 커피 받음");
console.log("3. 커피 결제");

console.log("1. 커피 주문");
setTimeout(() => {
  console.log("2. 커피 다 됐어요! (진동벨 울림)");
}, 5000);

console.log("3. 커피 결제");
*/

// 콜백 함수
/*function makeCoffee(callback) {
  console.log("1. 커피 주문 완료 (제조 중...)");

  setTimeout(() => {
    console.log("2. 커피 완료");
    callback();
  }, 3000)
}

makeCoffee(() => {
  console.log("3. 커피 받으러 갑니다.");
});*/

// promise

/*
function makeCoffee2() {
  return new Promise((resolve) => {
    console.log("1. 커피 주문 완료 (제조 중...)");
    setTimeout(() => {
      console.log("2. 커피 완료");
      resolve();
    }, 3000);
  })
}

makeCoffee2().then(() => {
  console.log("3. 커피 받으러 갑니다.");
})*/

// async await
function makeCoffee3() {
  return new Promise((resolve) => {
    console.log("1. 커피 주문 완료 (제조 중...)");
    setTimeout(() => {
      console.log("2. 커피 완료");
      resolve();
    }, 3000)
  })
}

async function receiveCoffee () {
  await makeCoffee3();
  console.log("3. 커피 받으러 갑니다.");
}

receiveCoffee();