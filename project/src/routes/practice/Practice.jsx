/*export default function Practice() {
  const [n, setN] = useState(0)

  useEffect(() => {
    console.log('effect run', n)
    setN(n + 1)
  })

  useEffect(() => {
    setN(v => v+1)
  },[])

  useEffect(() => {
    if (n < 10) setN(n+1)
  },[n])

  return <div>{n}</div>
}*/

import { memo, useCallback, useState } from 'react'

const Child = memo(function Child({ onClick }) {
  console.log('Child 랜더링')
  return <button onClick={onClick}>자식 버튼</button>
})

export default function Practice() {
  /*const [items, setItems] = useState([1, 2, 3])

  useEffect(() => {
    // setItems([...items])
    const next = items.slice().sort()

    const same = next.length === items.length && next.every((v, i) => v === items[i])
    if (!same) {
      setItems(next)
    }
  }, [items])

  return <pre>{JSON.stringify(items)}</pre>*/

  const [count, setCount] = useState(0)
  const handleClick = useCallback(() => {
    console.log('Child 버튼 클릭')
  }, [])

  console.log('Parent 랜더링')

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>부모 카운트 증가</button>
      <Child onClick={handleClick} />
    </div>
  )
}
