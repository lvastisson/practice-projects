class AdviceGenerator {
  constructor() {
    this.apiURL = 'https://api.adviceslip.com/advice';
  }

  initialize() {
    this.adviceIdElem = document.getElementById('advice-id');
    this.adviceTextElem = document.getElementById('advice-text');

    // this.getAdvice();

    this.bindEvents();
  }

  bindEvents() {
    document.getElementById('advice-btn').addEventListener('click', (e) => {
      e.preventDefault();

      this.getAdvice();
    });
  }

  async getAdvice() {
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