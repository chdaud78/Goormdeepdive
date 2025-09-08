function solution (n, word) {
  const wordMap = new Map()

  for(let i = 0 ; i < n ; i++) {
    const key = word[i].split("").sort().join("")
    if(!wordMap.has(key)) wordMap.set(key, []);
    wordMap.get(key).push(word[i])
  }

  for(const [k, arr] of wordMap) {
    arr.sort()
  }
  const result = [...wordMap.entries()]
  console.log(result)
}

console.log(solution(5, ["eat", "tea", "tan", "ate", "nat"]))