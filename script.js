let num1 = [];
let op = "";
let num2 = [];
let mode = 0;
let ans = [];
let dec1 = 0;
let dec2 = 0;
let numDigits1 = 0;
let numDigits2 = 0;
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

function modeZero (input) {
    switch (input) {
        case ".":
            if (!dec1 && numDigits1 < 6) {
                num1.push(input);
                screen.textContent += input;
                dec1 = 1;
            };
            break;
        case "-":
            if (num1.length === 0){
                num1.push(input);
                screen.textContent += input;
            } else {
                op = input;
                screen.textContent += input;
                mode = 1;
            };
            break;
        case "+":
        case "*":
        case "/":
            if (num1.length > 0) {
                op = input;
                screen.textContent += input;
                mode = 1;
            };
            break;
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            if (num1[0] === '0' || (num1[0] === '-' && num1[1] === '0')) {
                num1.pop();
                screen.textContent = screen.textContent.slice(0,-1);
                numDigits1--;
            }
            if (numDigits1 < 6) {
                num1.push(input);
                screen.textContent += input;
                numDigits1++;
            }
            break;
        case "clr":
        case "Delete":
            reset();
            break;
        case "bs":
        case "Backspace":
            if (num1.length !== 0){
                let bs = num1.pop();
                screen.textContent = screen.textContent.slice(0,-1);
                if (bs !== '-' && bs !== '.') numDigits1--;
            }
            break;
    }
}

function modeOne (input) {
    console.log(input);
    switch (input) {
        case ".":
            if (!dec2 && numDigits2 < 6) {
                num2.push(input);
                screen.textContent += input;
                dec2 = 1;
            };
            break;
        case "-":
            if (num2.length === 0){
                num2.push(input);
                screen.textContent += input;
            } else {
                equal();
                op = input;
                screen.textContent += input;
                mode = 1;
                num2 = [];
                dec2 = 0;
                numDigits2 = 0;
            };
            break;
        case "+":
        case "*":
        case "/":
            if (num2.length > 0) {
                equal();
                op = input;
                screen.textContent += input;
                mode = 1;
                num2 = [];
                dec2 = 0;
                numDigits2 = 0;
            };
            break;
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            if (num2[0] === '0' || (num2[0] === '-' && num2[1] === '0')) {
                num2.pop();
                screen.textContent = screen.textContent.slice(0,-1);
                numDigits2--;
            }
            if (numDigits2 < 6) {
                num2.push(input);
                screen.textContent += input;
                numDigits2++;
            }
            break;
        case "=":
        case "Enter":
            equal();
            break;
        case "clr":
        case "Delete":
            reset();
            break;
        case "bs":
        case "Backspace":
            if (num2.length !== 0){
                let bs = num2.pop();
                screen.textContent = screen.textContent.slice(0,-1);
                if (bs !== '-' && bs !== '.') numDigits2--;
            }
            break;
    }
}

function modeTwo (input) {
    switch (input) {
        case "+":
        case "-":
        case "*":
        case "/":
            mode = 1;
            num2 = [];
            dec2 = 0;
            numDigits2 = 0;
            op = input;
            screen.textContent += input;
            break;
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            mode =0;
            reset();
            modeZero(input);
            break;
        case "=":
        case "Enter":
            equal();
            break;
        case "clr":
        case "Delete":
            reset();
            break;
    }
}

function input (e) {
    switch (mode) {
        case 0:
            modeZero(e.target.id);
            break;
        case 1:
            modeOne(e.target.id);
            break;
        case 2:
            modeTwo(e.target.id);
            break;
        case 3:
            if (e.target.id === 'clr') reset();
            break;
    }
}

function keyInput (e) {
    switch (mode) {
        case 0:
            modeZero(e.key);
            break;
        case 1:
            modeOne(e.key);
            break;
        case 2:
            modeTwo(e.key);
            break;
        case 3:
            if (e.key === 'Delete') reset();
            break;
    }
}

function reset() {
    num1 = [];
    num2 = [];
    op = '';
    mode = 0;
    dec1 = 0;
    dec2 = 0;
    numDigits1 = 0;
    numDigits2 = 0;
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
    if (numAns > 999999) {
        mode = 3;
        screen.textContent = "OVERFLOW";
    } else {
        let arrAns = num2Arr(numAns);
        screen.textContent = '';
        for(let i of arrAns) screen.textContent += i;
        num1 = arrAns;
        mode = 2;
    }
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
    return sum;
}

function num2Arr(num) {
    let str = num.toString();
    str = str.split('');
    let count = 0;
    let digitCount = 0;
    while (digitCount < 6 && count < str.length) {
        if (str[count] !== '.' && str[count] !== '-') digitCount++;
        count++;
    }
    str.length = count;
    return str;
}

let react = document.querySelector('#buttons');
react.addEventListener('click', input);
document.addEventListener('keydown', keyInput);