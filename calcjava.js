const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,


};

let inputDigit = (digit) => {
    const { displayValue, waitingForSecondOperand } = calculator;

    if (waitingForSecondOperand === true){
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
    console.log(calculator);
    
};

  let inputDecimal = () => {
    if (calculator.waitingForSecondOperand === true) return;


    if (!calculator.displayValue.includes('.')) {

        calculator.displayValue += '.'; 
    } 
} ;

let handleOperator = (nextOperator) => {

    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const result = performCalculation[operator](firstOperand, inputValue);

        calculator.displayValue = String(result);
        calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    console.log(calculator);

}

const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
    '=': (firstOperand, secondOperand) => secondOperand

};

let resetCalculator = () => {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    console.log(calculator);

}

const keys = document.querySelector('.board');

let updateDisplay = () => {

    const display = document.querySelector('.output');
    display.value = calculator.displayValue;
}

updateDisplay();

keys.addEventListener('click', (e) => {
    const { target } = e;
    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operator')){
        handleOperator(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('decimal')) {
        
        
         inputDecimal(target.value);
        updateDisplay();
        return; 
      }
    
      if (target.classList.contains('clear')) {
        resetCalculator();
        updateDisplay();
        return;
      }
    
      inputDigit(target.value);
      updateDisplay(); 
})



