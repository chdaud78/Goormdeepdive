function insertionSort(arr) {

  const a = arr.slice();

  for (let i = 1; i < a.length; i++) {
    const key = a[i]; // 현재 삽입할 원소
    let j = i - 1;

    // key보다 큰 원소들을 오른쪽으로 밀기
    while (j >= 0 && a[j] > key) {
      a[j + 1] = a[j];
      j--;
    }

    // 비어진 자리에 key 삽입
    a[j + 1] = key;
  }
  return a;
}