$(document).ready(function() {
  const screenElem = $('#screen-text');

  let currentText = '';
  let currentOperation = '';
  let lastOperation = '';
  let lastValue = 0;
  let totalValue = 0;

  const operationMapper = {
    'add': '+',
    'subtract': '-',
    'divide': '/',
    'multiply': 'x'
  }

  $('[data-number]').click(function() { 
    if (currentOperation === '') {
      currentText += this.getAttribute('data-number');
      lastValue = parseInt(currentText);
    }
    else {
      currentText = this.getAttribute('data-number');
      lastValue = parseInt(currentText);
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
        break;

      case 'delete':
        currentOperation = '';
        lastOperation = '';
        if (currentText.length > 0) {
          currentText = currentText.slice(0, -1);
        }
        lastValue = parseInt(currentText);
        if (!lastValue) {
          lastValue = 0;
        }

        break;

      case 'reset':
        currentText = '';
        currentOperation = '';
        lastOperation = '';
        lastValue = 0;
        totalValue = 0;
        break;

      case 'comma':
        // todo
        break;

      default:
        if (lastOperation === '') {
          currentOperation = actionVal;
          lastOperation = currentOperation;
          if (totalValue === 0) {
            totalValue = lastValue;
          }
          else {
            lastValue = parseInt(currentText);
            runOperation();
          }
        }
        else if (currentOperation !== '') {
          runOperation();
        }
        currentOperation = actionVal;
        lastOperation = currentOperation;
        break;
    }

    logAll();
    renderValue();
  });

  function runOperation() {
    switch (lastOperation) {
      case 'add':
        totalValue += parseInt(lastValue);
        break;

      case 'subtract':
        totalValue -= parseInt(lastValue);
        break;

      case 'multiply':
        totalValue *= parseInt(lastValue);
        break;
        
      case 'divide':
        totalValue /= parseInt(lastValue);
        break;
      default:
        totalValue = parseInt(lastValue);
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