"use strict";
const input = document.querySelector("#name");
const out = document.querySelector("#out");
if (!input || !out)
    throw new Error("필요한 요소가 없어요!");
input.addEventListener("input", (e) => {
    const curr = e.currentTarget;
    out.textContent = `안녕, ${curr.value}`;
});
const btn = document.querySelector("#clear");
btn?.addEventListener("click", (e) => {
    input.value = "";
    out.textContent = "";
});
