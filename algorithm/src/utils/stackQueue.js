// ============================================================
// clone
// ------------------------------------------------------------
// 요구사항:
// - 깊은 복제. 가능하면 structuredClone, 아니면 JSON 복제 fallback
// - 원시값(number/string/boolean/null/undefined)은 그대로 반환
// - 함수/순환참조는 고려 대상 아님(실습 범위 밖)
// ============================================================
export const clone = (v) => {
  // TODO: structuredClone 사용 가능 여부 확인 후 시도
  // 힌트 1) typeof v === 'object' && v !== null 일 때만 복제 필요
  // 힌트 2) structuredClone 실패(없는 환경) 시 JSON.parse(JSON.stringify(v)) fallback
  // 예시(힌트):
  // try { return structuredClone(v); } catch {}
  // return (typeof v === 'object' && v !== null)
  //   ? JSON.parse(JSON.stringify(v))
  //   : v;

  if(typeof v !== 'object' || v === null) return v

  try {
    return structuredClone(v);
  } catch {
    return JSON.parse(JSON.stringify(v))
  }

  // return ...;
};



// ============================================================
// Stack (LIFO) — Undo/Redo용
// ------------------------------------------------------------
// 요구사항:
// - 내부는 배열 this.a 하나(top은 배열 끝)
// - push(x) 시 clone(x)로 스냅샷 저장(외부 변경 차단)
// - capacity 초과 시 "가장 오래된" 항목부터 제거(앞에서 제거)
// - pop/peek/clear/size 동작, 평균 O(1)
// ============================================================
export class Stack {
  constructor(capacity = 50) {
    // TODO: 내부 배열 초기화, 용량 저장
    this.a = [];
    this.capacity = capacity;
  }

  push(x) {
    // TODO:
    // 1) const snap = clone(x)
    // 2) this.a.push(snap)
    // 3) if (this.a.length > this.capacity) → this.a.shift()
    const snap = clone(x)
    this.a.push(snap)
    if(this.a.length > this.capacity) this.a.shift()
  }

  pop() {
    // TODO: 비었으면 null, 아니면 this.a.pop() 결과 반환
    // 힌트: (this.a.pop() ?? null)
    return this.a.pop() ?? null
  }

  peek() {
    // TODO: 비었으면 null, 아니면 마지막 요소 반환(제거 X)
    // 힌트: this.a.length ? this.a[this.a.length - 1] : null
    return this.a.length ? this.a[this.a.length - 1] : null
  }

  clear() {
    // TODO: 스택 비우기
    // 힌트: this.a.length = 0;
    this.a.length = 0;
  }

  get size() {
    // TODO: 현재 길이 반환
    return this.a.length
  }
}



// ============================================================
// AsyncQueue — 비동기 작업 "직렬 실행" 큐(FIFO)
// ------------------------------------------------------------
// 요구사항:
// - enqueue(fn): 작업 등록, 문자열 jobId 반환
// - 항상 1개 작업만 실행(running=true 동안 중복 드레인 금지)
// - 이벤트 콜백(onEvent)으로 상태 통지:
//   event: "enqueued" | "start" | "process" | "success" | "error" | "idle"
//   payload: { ts, event, jobId?, error?, queued, running }
// - 실패해도 다음 작업은 계속 처리
// ============================================================
export class AsyncQueue {
  constructor(onEvent) {
    // TODO: q=[], running=false, onEvent 저장
    this.q = [];
    this.running = false;
    this.onEvent = onEvent;
  }

  enqueue(fn) {
    // TODO:
    // 1) jobId 생성
    //    힌트: globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2)
    // 2) this.q.push({ id, fn })
    // 3) this.#emit('enqueued', id)
    // 4) if (!this.running) this.#drain()
    // 5) jobId 반환
    const job = {
      id : globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2),
      fn
    }
    this.q.push(job)
    this.#emit("enqueue", job.id)
    if(!this.running) this.#drain()
    return job.id
  }

  async #drain() {
    if (this.running) return;
    this.running = true;

    while (this.q.length) {
      const job = this.q.shift();

      this.#emit("start", job.id);
      try {
        this.#emit("process", job.id);
        await job.fn();
        this.#emit("success", job.id);
      } catch (error) {
        this.#emit("error", job.id, error);
      }
    }

    this.running = false;
    this.#emit("idle");
  }

  #emit(event, jobId, error) {
    this.onEvent?.({
      ts: Date.now(),
      event, jobId, error,
      queued: this.q.length,
      running: this.running,
    });
  }
}