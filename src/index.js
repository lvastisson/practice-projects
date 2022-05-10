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
    this.adviceBtnElem.classList.add('btn--animation');
    
    if (!this.btnAnimation) {
      this.btnAnimation = setTimeout(() => {
        this.adviceBtnElem.classList.remove('btn--animation');
        this.btnAnimation = null;
      }, 1000);
    }

    const response = await fetch(this.apiURL);
    const data = await response.json();
    
    this.adviceIdElem.innerText = `ADVICE #${data.slip.id}`;
    this.adviceTextElem.innerText = data.slip.advice;
  }
}

window.onload = function() {
  const gen = new AdviceGenerator();
  gen.initialize();
}