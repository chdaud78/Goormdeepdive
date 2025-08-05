class Toast {
  static ICONS = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️',
  };

  constructor(message, { type = 'info', duration = 3000, position = 'top-right' } = {}) {
    this.message = message;
    this.type = type;
    this.duration = duration;
    this.position = position;

    this._creat();
  }

  _creat() {
    let container = document.querySelector(`.toast-container.${this.position}`);

    /* 컨테이너 생성 */
    if(!container) {
      container = document.createElement('div');
      container.classList.add('toast-container', this.position);
      document.body.appendChild(container)
    }

    /* 토스트 만들기 */
    const toast = document.createElement('div');
    toast.classList.add('toast', this.type);

    // 내부
    const icon = Toast.ICONS[this.type];
    toast.innerHTML = `<span class="icon">${icon}</span> <span class="message">${this.message}</span>`;

    // 닫기 버튼
    const closeBtn = document.createElement('span');
    closeBtn.classList.add('close');
    closeBtn.innerText = 'x';
    closeBtn.addEventListener('click', () => this._remove(toast));
    toast.appendChild(closeBtn);

    container.appendChild(toast);

    // 애니메이션
    setTimeout(() => toast.classList.add('show'));

    // 시간 지나면 지우기
    setTimeout(() => this._remove(toast), this.duration);
  }

  _remove(element) {
    if(!element) return;
    element.classList.remove('show');

    setTimeout(() => {
      element.remove();
    }, 300)
  }
}