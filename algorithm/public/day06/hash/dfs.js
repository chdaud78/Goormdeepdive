function dfsRecursive(graph, node, visited = new Set()) {
  if (visited.has(node)) return;
  console.log(node); // 방문
  visited.add(node);

  for (let neighbor of graph[node]) {
    dfsRecursive(graph, neighbor, visited);
  }
}

// 그래프 예시 (인접 리스트)
const graph = {
  A: ["B", "C"],
  B: ["D", "E"],
  C: ["F"],
  D: [],
  E: [],
  F: []
};

dfsRecursive(graph, "A");
// 출력: A B D E C F

function dfsStack(graph, start) {
  const visited = new Set();
  const stack = [start];

  while (stack.length) {
    const node = stack.pop();
    if (!visited.has(node)) {
      console.log(node); // 방문
      visited.add(node);
      for (let neighbor of graph[node].reverse()) {
        if (!visited.has(neighbor)) stack.push(neighbor);
      }
    }
  }
}

dfsStack(graph, "A");
// 출력: A B D E C F