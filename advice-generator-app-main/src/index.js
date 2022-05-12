class AdviceGenerator {
  constructor() {
    this.apiURL = 'https://api.adviceslip.com/advice';
  }

  initialize() {
    this.adviceIdElem = document.getElementById('advice-id');
    this.adviceTextElem = document.getElementById('advice-text');
    this.adviceBtnElem = document.getElementById('advice-btn');
    // this.getAdvice();

    this.bindEvents();
  }

  bindEvents() {
    this.adviceBtnElem.addEventListener('click', (e) => {
      e.preventDefault();

      this.getAdvice();
    });
  }

  async getAdvice() {
    const response = await fetch(this.apiURL);
    const data = await response.json();

    this.adviceBtnElem.classList.add('btn--animation');
    this.adviceBtnElem.parentElement.classList.add('advice--slide');
    
    if (!this.animation) {
      this.animation = setTimeout(() => {
        this.adviceBtnElem.classList.remove('btn--animation');
        this.adviceBtnElem.parentElement.classList.remove('advice--slide');
        this.animation = null;
      }, 1200);

      setTimeout(() => {
        this.adviceIdElem.innerText = `ADVICE #${data.slip.id}`;
        this.adviceTextElem.innerText = data.slip.advice;
      }, 600);
    }
  }
}

window.onload = function() {
  const gen = new AdviceGenerator();
  gen.initialize();
}