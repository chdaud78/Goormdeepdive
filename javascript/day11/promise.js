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

delayTask("1. 커피 주문 받기")
  .then(() => {
    return delayTask("2.원두 갈기");
  })
  .then(() => {
    return delayTask("3. 물 끓이기");
  })
  .then(() => {
    return delayTask("4. 커피 내리기");
  })
  .then(() => {
    return delayTask("5. 손님에게 커피 제공");
  })
  .then(() => {
    console.log("커피 제공 완료");
  })
  .catch((err) => {
    console.error("어딘가에서 에러 발생", err);
  });