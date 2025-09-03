function mergeSort(arr) {
  if (arr.length <= 1) return arr;        // 원소가 0~1개 → 정렬 불필요

  const mid = Math.floor(arr.length / 2); // 중간 지점
  const left = arr.slice(0, mid);         // 왼쪽 절반
  const right = arr.slice(mid);           // 오른쪽 절반

  // 왼쪽/오른쪽을 각각 재귀 정렬 → 병합
  return merge(mergeSort(left), mergeSort(right));
}

function merge(L, R) {
  const out = [];
  let i = 0, j = 0;

  // 두 배열이 빌 때까지 작은 쪽을 out에 push
  while (i < L.length && j < R.length) {
    out.push(L[i] <= R[j] ? L[i++] : R[j++]);
  }

  // 남은 원소를 뒤에 붙임
  return out.concat(L.slice(i), R.slice(j));
}

// 사용 예시
const numbers = [38, 27, 43, 3, 9, 82, 10];

console.log("원본 배열:", numbers);
const sorted = mergeSort(numbers);
console.log("정렬된 배열:", sorted);
console.log("원본 유지 확인:", numbers);