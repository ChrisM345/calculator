let prevVal = '';
let currVal = '';
let op = false;
let equals = false;
let prevOperator = '';
const display = document.querySelector('#result');
display.textContent = prevVal;

function operate(firstVal, secondVal, operator){
    console.log(firstVal);
    console.log(secondVal);

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

function special(exp){

    switch(exp) {
        case '1/x':
            if (currVal === ''){
                prevVal = 1/prevVal;
                display.textContent = prevVal;
            }else{
                currVal = 1/currVal;
                display.textContent = currVal;
            }
            break;
        case 'x^2':
            if (currVal === ''){
                prevVal = prevVal ** 2;
                display.textContent = prevVal;
            }else{
                currVal = currVal ** 2;
                display.textContent = currVal;
            }
            break;
        case 'sqrt(x)':
            if (currVal === ''){
                prevVal = Math.sqrt(prevVal);
                display.textContent = prevVal;
            }else{
                currVal = Math.sqrt(currVal);
                display.textContent = currVal;
            }
            break;
        case '%':
            currVal = (currVal / 100) * (prevVal);
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
    //display.textContent = currVal;
}

function del(delOperator){
    console.log(delOperator)
    console.log(currVal);
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

const numberButtons = document.querySelectorAll('.num')
numberButtons.forEach(ele => {
    ele.addEventListener('click', (e) => {
        if (equals == true){
            //op = false;
        }
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

const deleteButtons = document.querySelectorAll('.delete');
deleteButtons.forEach(ele => {
    ele.addEventListener('click', () =>
    del(ele.textContent))
})

const specialButtons = document.querySelectorAll('.special');
specialButtons.forEach(ele => {
    ele.addEventListener('click', () =>
    special(ele.textContent))
})