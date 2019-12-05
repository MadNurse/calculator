
const keyTypes = {
  NUMBER: 'number',
  OPERATOR: 'operator',
  BACKSPACE: 'backspace',
  ACTION: 'action',
  EQUALS: 'equals',
};

const state = {
  numbers: [],
  result: null,
  currentOperator: null,
  lastKeyType: keyTypes.NUMBER,
}

let currentKey = {
  value: null,
  type: null,
};

const nodeTypes = {
  NUMBER: 'number',
  OPERATOR: 'operator',
  RESULT: 'result',
}

const nodes = {
  numbers: [],
  currentOperator: null,
  result: null,
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
    case 'AC':
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
  let element;

  if (node === nodeTypes.NUMBER || node === nodeTypes.OPERATOR) {
    let operations = document.querySelector('.operations');
    element = document.createElement('span');
    element.classList.add(node);
    operations.appendChild(element);
    return element;
  }
}

keyPressed = (key) => {
  currentKey.value = key.target.innerText
  currentKey.type = getCurrentKeyType(currentKey.value);

  if (currentKey.type === keyTypes.NUMBER) {
    if (!state.numbers.length && !nodes.numbers.length) {
      state.numbers.push(0);
      nodes.numbers.push(createNode(nodeTypes.NUMBER));
    }

    state.lastKeyType = keyTypes.NUMBER;
    let lenght = state.numbers.length;

    if (state.numbers[lenght - 1] === 0) {
      if (currentKey.value === 0) {
        console.log('hata');
        
      }
      state.numbers[lenght - 1] = currentKey.value;
    } else {
      state.numbers[lenght - 1] = state.numbers[lenght - 1] + '' + currentKey.value;
    }
    
    nodes.numbers[lenght - 1].innerText = state.numbers[lenght - 1];
  }

  if (currentKey.type === keyTypes.OPERATOR) {
    if (state.lastKeyType === keyTypes.NUMBER) {
      state.currentOperator = currentKey.value;
      nodes.currentOperator = createNode(nodeTypes.OPERATOR);

      state.numbers.push(0);
      nodes.numbers.push(createNode(nodeTypes.NUMBER));
    }
    nodes.currentOperator.innerText = currentKey.value;
    state.lastKeyType = keyTypes.OPERATOR;
  }

  if (currentKey.type === keyTypes.EQUALS) {
    state.result = 123;
  }

  console.log(currentKey);
}

let keys = document.querySelectorAll('.key');
keys.forEach(element => {
  element.addEventListener('click', keyPressed);
});

