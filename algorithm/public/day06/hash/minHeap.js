class MinHeap {
  constructor() {
    this.heap = [];
  }

  getParent(i) { return Math.floor((i - 1) / 2); }
  getLeft(i) { return 2 * i + 1; }
  getRight(i) { return 2 * i + 2; }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp(this.heap.length - 1);
  }

  heapifyUp(i) {
    let parent = this.getParent(i);
    while (i > 0 && this.heap[parent] > this.heap[i]) {
      [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
      i = parent;
      parent = this.getParent(i);
    }
  }

  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    return root;
  }

  heapifyDown(i) {
    let smallest = i;
    const left = this.getLeft(i);
    const right = this.getRight(i);

    if (left < this.heap.length && this.heap[left] < this.heap[smallest]) smallest = left;
    if (right < this.heap.length && this.heap[right] < this.heap[smallest]) smallest = right;

    if (smallest !== i) {
      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      this.heapifyDown(smallest);
    }
  }
}

// 사용 예시
const h = new MinHeap();
h.insert(50);
h.insert(30);
h.insert(40);
h.insert(10);
h.insert(20);

console.log("힙 내부:", h.heap);
console.log("최소값 꺼내기:", h.extractMin()); // 10
console.log("최소값 꺼내기:", h.extractMin()); // 20