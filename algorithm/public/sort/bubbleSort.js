function bubbleSort(arr) {
  const a = arr.slice();
  for (let i = 0; i < a.length - 1; i++) {
    let swapped = false; // 불필요한 반복을 줄이기 위해 사용 (최적화 포인트)
    for (let j = 0; j < a.length - 1 - i; j++) {
      if (a[j] > a[j + 1]) { // j와 j+1을 비교해서 앞이 크면
        [a[j], a[j + 1]] = [a[j + 1], a[j]]; // 배열구조분해할당으로 서로 교환
        swapped = true;
      }
    }
    if (!swapped) break; // 이미 정렬됨 → 조기 종료
  }
  return a;
}

// 사용 예시
const numbers = [5, 1, 4, 2, 8];

console.log("원본 배열:", numbers);
const sorted = bubbleSort(numbers);
console.log("정렬된 배열:", sorted);
console.log("원본 유지 확인:", numbers);