function Toast(message, {type = 'success', duration = 3000, position = 'top-right'} ={}) {
  this.message = message;
  this.type = type;
  this.duration = duration;
  this.position = position;

  this._creat();
}

Toast.ICONS = {
  success: '✅',
  error: '❌',
  warning: '⚠️',
  info: 'ℹ️',
}

Toast.prototype._creat = function () {
  let container = document.querySelector(`.toast-container.${this.position}`);

  if(!container) {
    container = document.createElement('div');
    container.classList.add('toast-container', this.position);
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.classList.add('toast', this.type);

  const icon = Toast.ICONS[this.type];
  toast.innerHTML = `<span class="icon">${icon}</span> ${this.message}`;

  let closeBtn = document.createElement('span');
  closeBtn.classList.add('close');
  closeBtn.innerText = 'x';
  closeBtn.addEventListener('click', () => this._remove(toast));
  toast.appendChild(closeBtn);

  container.appendChild(toast);

  setTimeout(() => toast.classList.add('show'));

  setTimeout(() => this._remove(toast), this.duration);
}

Toast.prototype._remove = function (element) {
  if(!element) return;
  element.classList.remove('show');

  setTimeout(() => {
    element.remove();
  }, 300)
}