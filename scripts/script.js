let prevVal = '';
let currVal = '';
const display = document.querySelector('#result');
display.textContent = prevVal;

function operate(firstVal, secondVal, operator){
    console.log(firstVal);
    console.log(secondVal);
    switch(operator) {
        case '+':
            prevVal = firstVal + secondVal;
            currVal = '';
            display.textContent = prevVal;
    }
}

const numberButtons = document.querySelectorAll('.num')
numberButtons.forEach(ele => {
    ele.addEventListener('click', (e) => {
        currVal += ele.textContent;
        console.log(prevVal);
        console.log(currVal)
        display.textContent = currVal;
    })
})

const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(ele => {
    ele.addEventListener('click', () => operate(Number(prevVal), Number(currVal), ele.textContent))
})