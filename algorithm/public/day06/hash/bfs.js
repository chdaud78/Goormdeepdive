function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];

  while (queue.length) {
    const node = queue.shift(); // 큐에서 꺼내기
    if (!visited.has(node)) {
      console.log(node); // 방문
      visited.add(node);
      for (let neighbor of graph[node]) {
        if (!visited.has(neighbor)) {
          queue.push(neighbor); // 큐에 추가
        }
      }
    }
  }
}

// 그래프 예시
const graph = {
  A: ["B", "C"],
  B: ["D", "E"],
  C: ["F"],
  D: [],
  E: [],
  F: []
};

bfs(graph, "A"); // A B C D E F