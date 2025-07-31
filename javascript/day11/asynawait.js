function delayTask(task, fail=false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(fail) {
        reject(`${task} 실패`);
      } else {
        console.log(`${task} 성공`);
        resolve();
      }
    }, 1000);
  });
}

async function makeCoffee() {
  await delayTask("1. 커피 주문 받기");

  try {
    await delayTask("2.원두 갈기", true);
  } catch (err) {
    console.warn("원두 갈기 문제 발생:", err);
  }
  await delayTask("3. 물 끓이기");
  await delayTask("4. 커피 내리기");
  await delayTask("5. 손님에게 커피 제공");

  console.log("커피 제공 완료");
}

makeCoffee();