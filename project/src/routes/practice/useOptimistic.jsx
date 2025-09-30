// src/routes/practice/FromAddOptimisticTest
import { useOptimistic, useState, useRef, startTransition } from 'react'
import { deliverMessage } from 'lib/actions.js'

// 메시지 스레드를 표현하는 프레젠테이션 + 폼 컴포넌트
function Thread({ messages, sendMessageAction }) {
  // 폼 엘리먼트에 접근하기 위한 ref (reset 등을 위해 사용)
  const formRef = useRef()

  // <form action={formAction}> 형태로 사용할 핸들러(HTML Form Actions 패턴)
  function formAction(formData) {
    // 1) 낙관적 업데이트: 사용자가 보낸 메시지를 'sending: true'로 즉시 UI에 반영
    addOptimisticMessage(formData.get('message'))
    // 2) 폼 입력칸 초기화
    formRef.current.reset()
    // 3) 실제 비동기 전송은 전환 우선순위로 처리(UX 부드럽게)
    startTransition(async () => {
      // 서버(혹은 가짜 API)로 실제 전송
      await sendMessageAction(formData)
    })
  }

  // useOptimistic 훅:
  // - 첫 번째 인수: 현재 실제 상태(messages)
  // - 두 번째 인수: 낙관적 업데이트를 적용하는 리듀서 (state, newMessage) => nextState
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage) => [
      {
        text: newMessage,
        sending: true,
      },
      ...state,
    ]
  )

  return (
    <>
      <form action={formAction} ref={formRef}>
        <input type="text" name="message" placeholder="Hello!" />
        <button type="submit">Send</button>
      </form>
      {optimisticMessages.map((message, index) => (
        <div key={index}>
          {message.text}
          {!!message.sending && <small> (보내는 중...)</small>}
        </div>
      ))}
    </>
  )
}

export default function FromAddOptimisticTest() {
  // 실제 서버에서 내려온(혹은 저장된) 메시지 초기값
  // sending은 서버에서 이미 완료된 아이템은 false로 둠
  const [messages, setMessages] = useState([{ text: 'Hello there!', sending: false, key: 1 }])

  // 실제 전송 로직: 폼에서 전달된 formData를 받아 API 호출 → 성공 시 실제 상태 갱신
  async function sendMessageAction(formData) {
    // 1) 서버(혹은 가짜 API)에 메시지 전송 → 응답으로 전송된 텍스트를 받음
    const sentMessage = await deliverMessage(formData.get('message'))
    // 2) 실제 상태 갱신을 '전환'으로 처리 (낙관적 UI가 자연스럽게 실제 데이터로 합류)
    startTransition(() => {
      // 실제 messages에 서버 결과를 prepend(상단 추가)
      setMessages((messages) => [{ text: sentMessage }, ...messages])
    })
  }
  // Thread에 실제 messages와 전송 액션을 내려 프레젠테이션/인터랙션 위임
  return <Thread messages={messages} sendMessageAction={sendMessageAction} />
}
