const DISPLAY_MAX = 12;
const NUMBER_MAX = 999999999999
let prevVal = '';
let currVal = '';
let op = false;
let equals = false;
let prevOperator = '';
const display = document.querySelector('#result');
const prevDisplay = document.querySelector('#prev-result')
display.textContent = prevVal;

//Logic for basic operators
function operate(firstVal, secondVal, operator){

    //If the secondVal is an empty string that means there was an operator immediately after =
    //We do not want to change the previous Value in this case.
    if (operator == '='){
        if (secondVal !== ''){
            prevVal = currVal;
        }
    }
    firstVal = Number(firstVal);
    secondVal = Number(secondVal);

    switch(operator) {
        case '+':
            prevVal = (firstVal + secondVal).toFixed(3);
            break;
        case 'X':
            prevVal = (firstVal * secondVal).toFixed(3);
            break;
        case '/':
            prevVal = (firstVal / secondVal).toFixed(3);
            break;
        case '-':
            prevVal = (firstVal - secondVal).toFixed(3);
            break;
    }
    currVal = '';
    if( prevVal > NUMBER_MAX) prevVal = NUMBER_MAX;
    display.textContent = (Number(prevVal)).toString();
}

function testOverflow(number){
    if (number.toString().length > DISPLAY_MAX) number = Math.round(number)
    if (number > NUMBER_MAX) number = NUMBER_MAX;
    return (Number(number)).toString();
}

//Special options with if/else statements to see if one was pressed immediately after equals.
function special(exp){
    switch(exp) {
        case '1/x':
            if (currVal === ''){
                prevVal = (1/prevVal).toFixed(3);
                prevVal = testOverflow(prevVal)
                display.textContent = prevVal;
            }else{
                currVal = (1/currVal).toFixed(3);
                currVal = testOverflow(currVal);
                display.textContent = currVal;
            }
            break;
        case 'x^2':
            if (currVal === ''){
                prevVal = prevVal ** 2;
                prevVal = testOverflow(prevVal)
                display.textContent = prevVal;
            }else{
                currVal = currVal ** 2;
                currVal = testOverflow(currVal);
                display.textContent = currVal;
            }
            break;
        case 'sqrt(x)':
            if (currVal === ''){
                prevVal = (Math.sqrt(prevVal)).toFixed(3);
                prevVal = testOverflow(prevVal)
                display.textContent = prevVal;
            }else{
                currVal = (Math.sqrt(currVal)).toFixed(3);
                currVal = testOverflow(currVal);
                display.textContent = currVal;
            }
            break;
        case '%':
            currVal = ((currVal / 100) * (prevVal)).toFixed(3);
            currVal = testOverflow(currVal);
            display.textContent = currVal;
            break;
        case '+/-':
            if (currVal === '') {
                prevVal *= -1;
                display.textContent = prevVal;
            }
            else {currVal *= -1;
                display.textContent = currVal;
            }
            break;
    }
}

//Delete options
function del(delOperator){
    switch(delOperator){
        case 'CE':
            currVal = '';
            display.textContent = 0;
            break;
        case 'C':
            prevVal = '';
            currVal = '';
            op = false;
            equals = false;
            prevOperator = '';
            display.textContent = prevVal;
            break
        case 'Del':
            currVal = currVal.toString();
            currVal = currVal.slice(0, -1);
            if (currVal === '') {
                currVal = '';
                display.textContent = 0
            } else display.textContent = currVal;
            break;
    }
}

//Event listener for number buttons
const numberButtons = document.querySelectorAll('.num')
numberButtons.forEach(ele => {
    ele.addEventListener('click', (e) => {
        //Do not allow numbers larger than the display can fit.
        if(currVal.length < 12) currVal += ele.textContent;
        display.textContent = currVal;
    })
})

//Event listener for operators
const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(ele => {
    ele.addEventListener('click', () => {
        if (op == true) {
            operate(prevVal, currVal, prevOperator)
            prevOperator = ele.textContent;
        }
        else{
            equals = false;
            op = true;
            prevOperator = ele.textContent;
            prevVal = currVal;
            display.textContent = prevVal;
            currVal = '';
        }
    })
})

//Event listener for delete options
const deleteButtons = document.querySelectorAll('.delete');
deleteButtons.forEach(ele => {
    ele.addEventListener('click', () =>
    del(ele.textContent))
})

//Event listener for special options
const specialButtons = document.querySelectorAll('.special');
specialButtons.forEach(ele => {
    ele.addEventListener('click', () =>
    special(ele.textContent))
})