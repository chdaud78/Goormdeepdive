function selectionSort(arr) {
  const a = arr.slice(); // 원본 배열은 건드리지 않고 복사본 사용

  for (let i = 0; i < a.length; i++) {

	  let min = i; // 현재 구간에서 최소 인덱스 기록

	  // i 이후 구간에서 최솟값 탐색
	  for (let j = i + 1; j < a.length; j++) {
	    if (a[j] < a[min]) min = j; //< 대신 >로 조건만 바꾸면 내림차순도 쉽게 됩니다.
	  }

	  // 찾은 최솟값과 i 위치 교환
    if (min !== i) {
	    [a[i], a[min]] = [a[min], a[i]]
	  }
  }
  return a;
}

// 사용 예시
const numbers = [64, 25, 12, 22, 11];

console.log("원본 배열:", numbers);
const sorted = selectionSort(numbers);
console.log("정렬된 배열:", sorted);
console.log("원본 유지 확인:", numbers);