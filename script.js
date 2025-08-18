let num1 = ['0'];
let op = "";
let num2 = ['0'];
let mode = 0;
let ans = [];
let dec1 = 0;
let dec2 = 0;
let screen = document.querySelector('#display');
screen.textContent = '';

function add(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

function mult(a, b) {
    return a * b;
}

function div(a, b) {
    return a / b;
}

function input(e) {
    switch (e.target.id) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
        case '.':
            inputNum(e.target.id);
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            op = e.target.id;
            screen.textContent += '' + op + '';
            mode = 1;
            break;
        case '=':
            equal();
            break;
        case 'clr':
            reset();
            break;
    }
}

function inputChar (val) {
    val = val.toString();
    if (val === '.') {
    }
}

function inputNum(val) {
    val = val.toString();
    if (mode === 0) {
        if (num1[0] === '0') num1[0] = val;
        else num1.push(val);
        console.log('num1 = ' + num1);
    }
    else {
        if (num2[0] === '0') num2[0] = val;
        else num2.push(val);
        console.log('num2 = ' + num2);
    }
    screen.textContent += val;
}

function reset() {
    console.log('clr');
    num1 = ['0'];
    num2 = ['0'];
    op = '';
    mode = 0;
    screen.textContent = '';
}

function equal() {
    let numAns;
    switch (op) {
        case '+':
            numAns = add(arr2Num(num1), arr2Num(num2));
            break;
        case '-':
            numAns = sub(arr2Num(num1), arr2Num(num2));
            break;
        case '*':
            numAns = mult(arr2Num(num1), arr2Num(num2));
            break;
        case '/':
            numAns = div(arr2Num(num1), arr2Num(num2));
    }
    let arrAns = num2Arr(Math.round(numAns*100000)/100000);
    screen.textContent = '';
    for(let i of arrAns) screen.textContent += i;
    num1 = arrAns;
    mode = 2;
}

function arr2Num(arr) {
    let mult = 10;
    let sum = 0;
    let neg = 0;
    for (let i of arr) {
        if (i === '-') neg = 1;
        else if (i === '.') mult = .1;
        else if (mult === 10) {
            sum = Math.round((sum*mult + Number(i))*100000)/100000;
        } else {
            sum = Math.round((sum + Number(i)*mult)*100000)/100000;
            mult *= .1;
        }
    }
    if (neg) sum *= -1;
    console.log(sum);
    return sum;
}

function num2Arr(num) {
    let str = num.toString();
    return str.split('');
}

let react = document.querySelector('#buttons');
react.addEventListener('click', input);