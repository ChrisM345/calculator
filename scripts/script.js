let prevVal = '';
let currVal = '';
let op = false;
let prevOperator = '';
const display = document.querySelector('#result');
display.textContent = prevVal;

function operate(firstVal, secondVal, operator){
    console.log(firstVal);
    console.log(secondVal);
    switch(operator) {
        case '+':
            prevVal = firstVal + secondVal;
            break;
        case 'X':
            prevVal = firstVal * secondVal;
            break;
        case '/':
            prevVal = firstVal / secondVal;
            break;
        case '-':
            prevVal = firstVal - secondVal;
            break;
    }
    currVal = '';
    display.textContent = prevVal;
}

const numberButtons = document.querySelectorAll('.num')
numberButtons.forEach(ele => {
    ele.addEventListener('click', (e) => {
        currVal += ele.textContent;
        //console.log(prevVal);
        //console.log(currVal)
        display.textContent = currVal;
    })
})

const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(ele => {
    ele.addEventListener('click', () => {
        if (op == true) {
            operate(Number(prevVal), Number(currVal), prevOperator)
            prevOperator = ele.textContent;
        }
        else{
            op = true;
            prevOperator = ele.textContent;
            prevVal = currVal;
            display.textContent = prevVal;
            currVal = '';
        }
    })
})