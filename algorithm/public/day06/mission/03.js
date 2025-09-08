function solution (n, arr) {
  const setArr = new Set()
  const stack = []

  for(let i = n-1; i >= 0; i--) {
    const id = arr[i]
    if(!setArr.has(id)) {
      setArr.add(id);
      stack.push(id);
    }
  }
  return stack.reverse().join(" ")
}

console.log(solution(8, ["a", "b", "a", "c", "d","b", "e","a"]))