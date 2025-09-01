function Double (n) {
  let k =1 ;
  for(let i = 1 ; i <= n ; i++) {
    k*=2
  }
  return k
}

console.log(Double(4))

function OddDouble (n) {
  const odd = 2*n -1;
  return odd*odd
}

console.log(OddDouble(4))

function fibo (n) {
  let a= 1, b= 1, answer= 0;
  for(let i = 3 ; i <= n ; i++) {
    answer = a+b;
    a=b;
    b= answer;
  }
  return answer
}

console.log(fibo(6))

function xsub(n) {
  let answer = 10;
  for(let i = 2 ; i <= n ;i++) {
    let diff = (i-1) * 2;
    i%2 === 0 ? answer -=diff : answer+=diff
  }
  return answer
}

console.log(xsub(5))

function mulAdd(n) {
  let answer = 0;
    answer += n*(n+1) + n
  return answer
}

console.log(mulAdd(5))