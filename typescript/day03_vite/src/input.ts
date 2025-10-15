export default function setupInput() {
  // index.ts (바닐라, DOM 타입)
  const inputName = document.querySelector<HTMLInputElement>("#name"); // 제네릭으로 구체화
  const inputEmail = document.querySelector<HTMLInputElement>("#email"); // 제네릭으로 구체화
  const inputPassword = document.querySelector<HTMLInputElement>("#password"); // 제네릭으로 구체화
  const out = document.querySelector<HTMLParagraphElement>("#out");
  type User = {
    name : string;
    email : string;
    password : string;
  }
  const user:User = {
    name : "",
    email : "",
    password : "",
  }
  
  if (!inputName || !out) throw new Error("필요한 요소가 없어요!");

  inputName.addEventListener("input", (e: Event) => {
    // e.target은 EventTarget | null → currentTarget을 쓰면 안전
    const curr = e.currentTarget as HTMLInputElement;
    user.name = curr.value
  });
  inputEmail.addEventListener("input", (e: Event) => {
    // e.target은 EventTarget | null → currentTarget을 쓰면 안전
    const curr = e.currentTarget as HTMLInputElement;
    user.email = curr.value
  });
  inputPassword.addEventListener("input", (e: Event) => {
    // e.target은 EventTarget | null → currentTarget을 쓰면 안전
    const curr = e.currentTarget as HTMLInputElement;
    user.password = curr.value
  });

  const btnRegister = document.querySelector<HTMLButtonElement>("#register");
  btnRegister.addEventListener("click", (e : MouseEvent) => {
    out.textContent = user.name + user.email + user.password
  })

// 클릭 예: 정확한 엘리먼트 타입 주기
  const btn = document.querySelector<HTMLButtonElement>("#clear");
  btn?.addEventListener("click", (e: MouseEvent) => {
    inputName.value = "";
    inputEmail.value = "";
    inputPassword.value = "";
    out.textContent = "";
    // e.clientX / e.clientY 같은 마우스 좌표도 사용 가능 (MouseEvent)
  });
}