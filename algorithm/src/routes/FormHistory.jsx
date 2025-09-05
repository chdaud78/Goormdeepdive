import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {AsyncQueue, clone, Stack} from "../utils/stackQueue.js";

const initialForm = {
  fullName: "Kim Jiyoon",
  email: "jiyoon@example.com",
  bio: "Hello! I love React.",
  newsletter: true,
};

/**
 * 가짜 서버 저장: 400~900ms 랜덤 지연 + 10% 실패
 * 실무에선 UI에서 제공하는 saveDoc(snapshot)을 사용하도록 대체 가능.
 */
const fakeSave = async (doc) => {
  const delay = 400 + Math.random() * 500;
  await new Promise((r) => setTimeout(r, delay));
  if (Math.random() < 0.1) throw new Error("Network error");
  localStorage.setItem("serverDoc", JSON.stringify(doc));
  return { ok: true };
};

export default function FormHistoryLab() {
  /** 폼 상태 */
  const [form, setForm] = useState(initialForm);

  /** 🔁 이력 스택(Undo/Redo) — top은 끝 요소 */
  const backRef = useRef(new Stack(80)); // TODO: capacity 변경 가능
  const fwdRef = useRef(new Stack(80));

  /** 📜 큐 이벤트 로그 */
  const [logs, setLogs] = useState([]);

  /** 🧵 직렬 저장 큐 인스턴스 */
  const queueRef = useRef(null);
  if (!queueRef.current) {
    // TODO(필수): AsyncQueue 생성 + onEvent 로거 작성
    // 힌트: onEvent 콜백은 아래 모양의 문자열 한 줄을 logs 앞쪽에 추가
    // `${new Date(snap.ts).toLocaleTimeString()}  [${snap.event}] #<jobId> <errorMsg?>  q=<queued><running?>`
    queueRef.current = new AsyncQueue((snap) => {
      setLogs((L) => [
        // TODO: 보기 좋은 문자열로 포맷팅
        // 힌트: jobId는 6글자만 써도 충분 → snap.jobId?.slice(0,6)
        `${new Date(snap.ts).toLocaleTimeString()}  [${snap.event}]`
        + (snap.jobId ? ` #${snap.jobId.slice(0,6)}` : "")
        + (snap.error ? ` ${snap.error}` : "")
        + `  q=${snap.queued}${snap.running ? " (run)" : ""}`,
        ...L
      ].slice(0, 80)); // 최대 80줄 유지
    });
  }

  /** 자동 저장 on/off */
  const [autoSave, setAutoSave] = useState(true);

  /**
   * Undo/Redo 중에 발생하는 setForm 변경은
   * 다시 이력에 push하지 않기 위한 플래그
   */
  const isProgrammatic = useRef(false);

  /**
   * 변경 적용(이력 기록 + autosave 큐 enqueue)
   * @param {Partial<typeof form>} patch 바뀐 필드만
   */
  const applyChange = useCallback((patch) => {
    // TODO(필수): setForm(prev => next) 패턴으로 구현
    // 1) prev를 보관 → next = { ...prev, ...patch }
    // 2) 프로그램적 변경이 아니라면(backRef에 prev push, fwdRef clear)
    // 3) autoSave===true → snapshot = clone(next) → queueRef.current.enqueue(() => fakeSave(snapshot))
    // 4) next 반환
    setForm((prev) => {
      const next = { ...prev, ...patch }
      if(!isProgrammatic.current) {
        backRef.current.push(prev)
        fwdRef.current.clear()
      }
      if(autoSave) {
        const snapshot = clone(next)
        queueRef.current.enqueue(() => fakeSave(snapshot))
      }
      return next
    })
  }, [autoSave]);

  /** Undo — backRef에서 pop, 현재는 fwdRef로 push */
  const undo = () => {
    // TODO(필수):
    // 1) const prev = backRef.current.pop(); 없으면 return
    // 2) fwdRef.current.push(form)
    // 3) isProgrammatic.current = true; setForm(prev); isProgrammatic.current = false;
    const prev = backRef.current.pop()
    if(!prev) return
    fwdRef.current.push(form)
    isProgrammatic.current = true
    setForm(prev)
    isProgrammatic.current = false
  };

  /** Redo — fwdRef에서 pop, 현재는 backRef로 push */
  const redo = () => {
    // TODO(필수): undo 반대 방향
    const next = fwdRef.current.pop()
    if(!next) return
    backRef.current.push(form)
    isProgrammatic.current = true
    setForm(next)
    isProgrammatic.current = false
  };

  /** 현재 스냅샷을 즉시 저장 큐에 넣기 */
  const saveNow = () => {
    // TODO(필수): const snapshot = clone(form); queueRef.current.enqueue(() => fakeSave(snapshot))
    const snapshot = clone(form)
    queueRef.current.enqueue(() => fakeSave(snapshot))
  };

  /** 단축키: Ctrl/Cmd+Z (Undo), Ctrl/Cmd+Shift+Z (Redo), Ctrl/Cmd+S (Save) */
  useEffect(() => {
    // TODO: Z → Undo/Redo, S → Save Now
    // 힌트: e.preventDefault()로 브라우저 기본 동작(저장/되돌리기) 막기
    const onKey= (e) => {
      const ctrl = e.ctrlKey || e.metaKey
      if(!ctrl) return
      if(e.key.toLowerCase() === 'z') {
        e.preventDefault()
        if(e.shiftKey) redo()
        else undo()
      }

      if(e.key.toLowerCase() === 's') {
        e.preventDefault()
        saveNow()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [form]); // 힌트: form이 바뀔 때 최신 undo/redo 대상 보장

  /** 마지막 서버 저장본 표시 (logs 변할 때마다 갱신) */
  const serverDoc = useMemo(() => {
    // TODO(선택): 저장이 완료될 때 localStorage 'serverDoc'에 기록됨
    // 힌트: 실패(error) 시에는 바뀌지 않음
    const s = localStorage.getItem("serverDoc")
    return s ? JSON.parse(s) : null
  }, [logs]);

  return (
    <section className="mx-auto my-6 w-full max-w-[980px] space-y-6">
      <header className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">📝 폼 이력(스택) + 직렬 저장(큐) 실습</h2>
        <div className="flex items-center gap-2">
          <label className="text-sm inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={autoSave}
              onChange={(e) => setAutoSave(e.target.checked)}
            />
            자동 저장(큐)
          </label>
          <button
            onClick={saveNow}
            className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
            title="현재 스냅샷을 즉시 저장 큐에 넣기 (Ctrl/Cmd+S)"
          >
            Save Now
          </button>
        </div>
      </header>

      {/* 폼 */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h3 className="mb-2 font-medium">Form</h3>

          <label className="block text-sm mb-2">
            이름
            <input
              className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
              value={form.fullName}
              onChange={(e) => applyChange({ fullName: e.target.value })}
              placeholder="Your name"
            />
          </label>

          <label className="block text-sm mb-2">
            이메일
            <input
              className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
              value={form.email}
              onChange={(e) => applyChange({ email: e.target.value })}
              placeholder="you@example.com"
            />
          </label>

          <label className="block text-sm mb-2">
            소개
            <textarea
              rows={5}
              className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
              value={form.bio}
              onChange={(e) => applyChange({ bio: e.target.value })}
              placeholder="Introduce yourself"
            />
          </label>

          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.newsletter}
              onChange={(e) => applyChange({ newsletter: e.target.checked })}
            />
            뉴스레터 구독
          </label>

          <div className="mt-3 flex gap-2">
            <button
              onClick={undo}
              disabled={!backRef.current.size}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm hover:bg-gray-50 disabled:opacity-50"
              title="Undo (Ctrl/Cmd+Z)"
            >
              Undo
            </button>
            <button
              onClick={redo}
              disabled={!fwdRef.current.size}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm hover:bg-gray-50 disabled:opacity-50"
              title="Redo (Ctrl/Cmd+Shift+Z)"
            >
              Redo
            </button>
            <span className="ml-auto text-xs text-gray-500">
              back: {backRef.current.size} · forward: {fwdRef.current.size}
            </span>
          </div>
        </div>

        {/* 서버 상태 & 큐 로그 */}
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h3 className="mb-2 font-medium">Server Snapshot (last saved)</h3>
          <pre className="rounded border bg-gray-50 p-3 text-xs overflow-auto h-40">
{JSON.stringify(serverDoc, null, 2) || "—"}
          </pre>

          <h3 className="mt-4 mb-2 font-medium">Queue Events</h3>
          <div className="rounded border bg-gray-50 p-3 text-xs h-48 overflow-auto">
            {logs.map((l, i) => <div key={i}>{l}</div>)}
          </div>

          <p className="mt-2 text-xs text-gray-500">
            * Autosave가 켜져 있으면 변경 때마다 저장 작업이 <strong>큐에 직렬로</strong> 들어가서 순서대로 처리됩니다.
            네트워크 에러가 뜨면 큐에서 <strong>error</strong> 로그로 확인할 수 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
}