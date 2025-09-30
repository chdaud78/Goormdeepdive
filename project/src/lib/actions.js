export async function deliverMessage(message) {
  // 비동기 API를 흉내내는 유틸 함수 (1초 지연 후 메시지를 그대로 반환)
  await new Promise((res) => setTimeout(res, 1000)) // 1초 대기(네트워크 지연 시뮬레이션)
  return message // 서버가 처리한 결과를 반환한다고 가정(여기선 입력을 그대로 반환)
}
