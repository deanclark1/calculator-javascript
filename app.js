let runningTotal = 0;
let buffer = "0";
let previousOperator = null;

const screen = document.querySelector('.results-output');

document
    .querySelector('.calculator-buttons')
    .addEventListener("click", function(e){
        buttonClick(e.target.innerText);
    })


function buttonClick(value) {
    if(isNaN(parseInt(value))){
        handleSymbol(value);
    } else{
        handleNumber(value);
    }
    rerender(); // write buffer to the screen or results output
}

function handleNumber(value) {
    if(buffer === "0") {
        buffer = value;
    } else {
        buffer += value
    }
    
}

function handleSymbol (value) {
    //switch statement

    switch (value) {
        case 'C':
            buffer = '0'
            runningTotal = 0;
            previousOperator = null;
            break;
        case '=':
            if(previousOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = " " + runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if(buffer.length === 1 ) {
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            } 
            break;
        default:
            handleMath(value);
            break;

    }
}

function handleMath(value) {
    const intBuffer = parseInt(buffer); //representation of whats on the screen now.
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    previousOperator = value;

    buffer = "0";
}

function flushOperation(intBuffer) {
    console.log('flush operation')
    if(previousOperator === "+" ) {
        runningTotal += intBuffer;
    } else if(previousOperator === "-" ) {
        runningTotal -= intBuffer;
    } else if(previousOperator === "×" ) {
        runningTotal *= intBuffer;
    } else {
        runningTotal /= intBuffer;
    } 
}


function rerender() {
    screen.innerText = buffer;
}
