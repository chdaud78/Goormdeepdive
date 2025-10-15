import './style.css'
import setupInput from './input.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <input id="email" type="text" placeholder="이메일 입력">
    <input id="name" placeholder="이름 입력" />
    <input id="password" type="password" placeholder="비밀번호 입력">
    <button id="clear">초기화</button>
    <button id="register">회원가입</button>
    <p id="out"></p>
  </div>
`

setupInput()
