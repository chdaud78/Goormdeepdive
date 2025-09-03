function quickSort(arr) {
  const a = arr.slice();

  // 내부에 qs(lo, hi)라는 재귀 함수 정의 후 즉시 실행 (IIFE).
  (function qs(lo, hi) {
    if (lo >= hi) return; // 원소 1개 이하 → 정렬 완료
    const p = partition(a, lo, hi); // 분할
    qs(lo, p - 1); // 왼쪽 구간 정렬
    qs(p + 1, hi); // 오른쪽 구간 정렬
  })(0, a.length - 1);
  return a;
}

// partition 함수로 배열을 두 구간으로 나눈 뒤, 좌우를 재귀 정렬.
function partition(a, lo, hi) {
  const pivot = a[hi]; // pivot = a[hi]: 구간의 마지막 값을 피벗으로 삼음
  let i = lo; // i: pivot보다 작은 값들을 모아둘 위치

  // 루프: lo ~ hi-1까지 순회하면서 pivot보다 작은 값 발견 → i 위치로 swap, i++
  for (let j = lo; j < hi; j++) {
    if (a[j] < pivot) {
      [a[i], a[j]] = [a[j], a[i]];
      i++;
    }
  }

  // 루프 끝난 뒤 a[i]와 pivot을 교환 → pivot이 제 위치로 이동
  [a[i], a[hi]] = [a[hi], a[i]];
  return i; // pivot의 최종 인덱스 반환
}

// 사용 예시
const numbers = [9, 3, 7, 1, 6, 2, 8];

console.log("원본 배열:", numbers);
const sorted = quickSort(numbers);
console.log("정렬된 배열:", sorted);
console.log("원본 유지 확인:", numbers);