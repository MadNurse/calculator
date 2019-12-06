const keyTypes = {
  NUMBER: 'number',
  OPERATOR: 'operator',
  BACKSPACE: 'backspace',
  ACTION: 'action',
  EQUALS: 'equals',
};

const state = {
  numbers: [],
  result: 0,
  currentOperator: null,
  previousKeyType: keyTypes.NUMBER,
}

let currentKey = {
  value: null,
  type: null,
};

const nodeTypes = {
  NUMBER: 'number',
  OPERATOR: 'operator',
}

const nodes = {
  numbers: [],
  currentOperator: null,
  result: 0,
}

getCurrentKeyType = (keyValue) => {
  let keyType;
  switch (keyValue) {
    case '1':
      keyType = keyTypes.NUMBER;
      break;
    case '2':
      keyType = keyTypes.NUMBER;
      break;
    case '3':
      keyType = keyTypes.NUMBER;
      break;
    case '4':
      keyType = keyTypes.NUMBER;
      break;
    case '5':
      keyType = keyTypes.NUMBER;
      break;
    case '6':
      keyType = keyTypes.NUMBER;
      break;
    case '7':
      keyType = keyTypes.NUMBER;
      break;
    case '8':
      keyType = keyTypes.NUMBER;
      break;
    case '9':
      keyType = keyTypes.NUMBER;
      break;
    case '0':
      keyType = keyTypes.NUMBER;
      break;
    case '.':
      keyType = keyTypes.NUMBER;
      break;
    case '÷':
      keyType = keyTypes.OPERATOR;
      break;
    case '×':
      keyType = keyTypes.OPERATOR;
      break;
    case '+':
      keyType = keyTypes.OPERATOR;
      break;
    case '-':
      keyType = keyTypes.OPERATOR;
      break;
    case '%':
      keyType = keyTypes.OPERATOR;
      break;
    case '⁺/-':
      keyType = keyTypes.OPERATOR;
      break;
    case '=':
      keyType = keyTypes.EQUALS;
      break;
    case 'C':
      keyType = keyTypes.ACTION;
      break;
    case '⌫':
      keyType = keyTypes.ACTION;
      break;
    default:
      break;
  }
  return keyType;
}

createNode = (node) => {
  let operations = document.querySelector('.operations');
  let element = document.createElement('span');
  element.classList.add(node);
  operations.appendChild(element);
  return element;
}

generateResult = (operator) => {
  let currentNumber = state.numbers[state.numbers.length - 1];

  if (state.numbers.length > 1) {
    switch (operator) {
      case '+':
        state.result = parseFloat(state.result) + parseFloat(currentNumber);
        break;
      case '-':
        state.result = parseFloat(state.result) - parseFloat(currentNumber);
        break;
      case '÷':
        state.result = parseFloat(state.result) / parseFloat(currentNumber);
        break;
      case '×':
        state.result = parseFloat(state.result) * parseFloat(currentNumber);
        break;
      default:
        state.result = '...';
        break;
    }
  } else {
    state.result = currentNumber;
  }

  changeResultText();
}

changeResultText = () => {
  const { result } = state;
  let resultText = result.toString();
  let resultNode = document.querySelector('.result');

  if (result.toString().length > 9) {
    let resultExponent = result.toString().substring(0, 9);
    let exponentLength = result.toString().length - resultExponent.length;
    resultText = resultExponent + "e+" + exponentLength;
  }

  resultNode.innerText = resultText;
  console.log(resultText);
}

numberKeyPressed = () => {
  if (!state.numbers.length && !nodes.numbers.length) {
    state.numbers.push(0);
    nodes.numbers.push(createNode(nodeTypes.NUMBER));
  }

  let currentIndex = state.numbers.length - 1;

  if (state.numbers[currentIndex] === 0) {
    if (currentKey.value !== '0') {
      state.numbers[currentIndex] = currentKey.value;
    }
  } else {
    state.numbers[currentIndex] = state.numbers[currentIndex] + '' + currentKey.value;
  }
  
  nodes.numbers[currentIndex].innerText = state.numbers[currentIndex];
}

operatorKeyPressed = () => {
  if (state.previousKeyType !== keyTypes.OPERATOR) {
    generateResult(state.currentOperator);

    nodes.currentOperator = createNode(nodeTypes.OPERATOR);
    state.numbers.push(0);
    nodes.numbers.push(createNode(nodeTypes.NUMBER));
  }

  state.currentOperator = currentKey.value;
  nodes.currentOperator.innerText = currentKey.value;
}

equalsKeyPressed = () => {
  let currentIndex = state.numbers.length - 1;
  generateResult(state.currentOperator);

  setDefault();

  let operationsNode = document.querySelector('.operations');
  operationsNode.innerHTML = '';
  
  console.log(state.result, state.numbers[currentIndex], state.currentOperator);
}

actionKeyPressed = () => {
  switch (currentKey.value) {
    case 'C':
      clearKeyPressed();
      break;
    case '⌫':
      backspaceKeyPressed();
      break;
    default:
      break;
  }
}

backspaceKeyPressed = () => {
  if (state.previousKeyType === keyTypes.OPERATOR) {
    return;
  }

  let currentIndex = state.numbers.length - 1;
  let lastNumber = state.numbers[currentIndex];
  let resultWithoutLastChar;

  if (!lastNumber) {
    return;
  }

  if (lastNumber.toString().length == 1) {
    resultWithoutLastChar = '0';
  } else {
    resultWithoutLastChar = lastNumber.toString().substring(0, lastNumber.toString().length - 1);
  }

  state.numbers[currentIndex] = parseFloat(resultWithoutLastChar);
  nodes.numbers[currentIndex].innerText = resultWithoutLastChar;

  console.log(`backspace pressed ${lastNumber} => ${resultWithoutLastChar}`);
}

setDefault = () => {
  state.numbers = [];
  state.result = 0;
  state.currentOperator = null;
  state.previousKeyType = keyTypes.NUMBER;

  currentKey.type = null;
  currentKey.value = null;

  nodes.numbers = [];
  nodes.currentOperator = null;
  nodes.result = 0;
}

clearKeyPressed = () => {
  setDefault();

  let resultNode = document.querySelector('.result');
  resultNode.innerText = '0';

  let operationsNode = document.querySelector('.operations');
  operationsNode.innerHTML = '';
}

keyPressed = (key) => {
  currentKey.value = key.target.innerText
  currentKey.type = getCurrentKeyType(currentKey.value);

  if (currentKey.type === keyTypes.NUMBER) {
    numberKeyPressed();
  } else if (currentKey.type === keyTypes.OPERATOR) {
    operatorKeyPressed();
  } else if (currentKey.type === keyTypes.EQUALS) {
    equalsKeyPressed();
  } else if (currentKey.type === keyTypes.ACTION) {
    actionKeyPressed();
  }

  state.previousKeyType = getCurrentKeyType(currentKey.value);
  console.log(currentKey);
}

let keys = document.querySelectorAll('.key');
keys.forEach(element => {
  element.addEventListener('click', keyPressed);
});

