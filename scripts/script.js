let prevVal = '';
let currVal = '';
const display = document.querySelector('#result');
display.textContent = prevVal;

function operate(firstVal, secondVal, operator){
    return
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
    ele.addEventListener('click', () => operate(prevVal, currVal, ele.textContent))
})