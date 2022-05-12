$(document).ready(function() {
  const screenElem = $('#screen-text');
  const bodyElem = $(document.body);

  let currentText = '';
  let currentOperation = '';
  let lastOperation = '';
  let equalPressed = false;
  let lastValue = 0;
  let totalValue = 0;

  let themeId = 0;

  const operationMapper = {
    'add': '+',
    'subtract': '-',
    'divide': '/',
    'multiply': 'x'
  }

  $('.toggle-slider').click(toggleTheme);
  $('.toggle-slider').keyup(function(e){
    if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
      toggleTheme();
    }
  });

  function toggleTheme() {
    bodyElem.removeClass('theme1 theme2 theme3');

    themeId++;

    if (themeId > 2) {
      themeId = 0;
    }

    switch (themeId) {
      case 0:
        bodyElem.addClass('theme1');
        break;
      case 1:
        bodyElem.addClass('theme2');
        break;
      case 2:
        bodyElem.addClass('theme3');
        break;
    }
  }

  $('[data-number]').click(function() {
    if (equalPressed) {
      resetVariables();
    }
    if (currentOperation === '') {
      currentText += this.getAttribute('data-number');
      lastValue = parseFloat(currentText);
    }
    else {
      currentText = this.getAttribute('data-number');
      lastValue = parseFloat(currentText);
      currentOperation = '';
    }

    logAll();
    renderValue();
  });
  
  $('[data-action]').click(function() {
    const actionVal = this.getAttribute('data-action');

    logAll();

    switch (actionVal) {
      case 'equals':
        logAll();
        runOperation();
        currentOperation = '';
        currentText = totalValue.toString();
        equalPressed = true;
        break;

      case 'delete':
        if (equalPressed) {
          resetVariables();
          break;
        }
        if (currentText.length > 0) {
          currentText = currentText.slice(0, -1);
        }
        lastValue = parseFloat(currentText);
        if (!lastValue) {
          lastValue = 0;
        }

        break;

      case 'reset':
        resetVariables();
        break;

      case 'comma':
        if (!currentText.includes('.')) {
          currentText += '.';
          lastValue = parseFloat(currentText);
        }
        break;

      default:
        if (!equalPressed) {
          runOperation();
        }
        equalPressed = false;
        currentOperation = actionVal;
        lastOperation = currentOperation;
        break;
    }

    logAll();
    renderValue();
  });

  function resetVariables() {
    currentText = '';
    currentOperation = '';
    lastOperation = '';
    lastValue = 0;
    totalValue = 0;
    equalPressed = false;
  }
  
  function runOperation() {
    switch (lastOperation) {
      case 'add':
        totalValue += parseFloat(lastValue);
        break;

      case 'subtract':
        totalValue -= parseFloat(lastValue);
        break;

      case 'multiply':
        totalValue *= parseFloat(lastValue);
        break;
        
      case 'divide':
        totalValue /= parseFloat(lastValue);
        break;
      default:
        totalValue = parseFloat(lastValue);
        break;
    }

    logAll();
  }

  function logAll() {
    console.log(currentText, currentOperation, lastOperation, lastValue, totalValue);
  }

  function renderValue() {
    let stringValue = currentText ? currentText.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0';

    if (currentOperation) {
      stringValue += ` ${operationMapper[currentOperation]}`;
    }

    screenElem.text(stringValue);
  }
});