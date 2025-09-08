function solution (n, arr) {
  const visitor = new Map()

  for(const id of arr) {
    visitor.set(id, (visitor.get(id) || 0) + 1)
  }
  for(const id of arr) {
    if(visitor.get(id) === 1) return id;
  }

  return "NONE";
}
console.log(solution(7, ["a","b","c","a","b","d","d"]))