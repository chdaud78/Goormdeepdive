const input = document.querySelector<HTMLInputElement>("#name");
const out = document.querySelector<HTMLParagraphElement>("#out");

if(!input || !out) throw new Error("필요한 요소가 없어요!");

input.addEventListener("input", (e:Event) => {
  const curr = e.currentTarget as HTMLInputElement;
  out.textContent = `안녕, ${curr.value}`;
});

const btn = document.querySelector<HTMLButtonElement>("#clear");
btn?.addEventListener("click", (e: Event) => {
  input.value = "";
  out.textContent = "";
});