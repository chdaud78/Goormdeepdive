let _token = localStorage.getItem('token') || ''

const listeners = new Set()

function notify(value) {
  for (const fn of listeners) {
    try {
      fn(value)
    } catch (e) {
      console.error('[token subscriber error]', e)
    }
  }
}

export const token = {
  set: (t) => {
    _token = t || ''
    if (t) {
      localStorage.setItem('token', t)
    } else {
      localStorage.removeItem('token')
    }
  },
  clear: () => {
    _token = ''
    localStorage.removeItem('token')
  },
  get: () => _token,
  subscribe: (fn) => {
    listeners.add(fn)
    return () => listeners.delete(fn)
  },
}
