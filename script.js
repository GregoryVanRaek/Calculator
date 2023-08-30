// Arithmetic function
function sum(a,b){return a+b;};
function subtract(a,b){return a-b;};
function multiply(a,b){return a*b;};
function divide(a,b){return a/b;};

// Operation
function operate(firstNumber, operator, secondNumber)
{
    switch(operator)
    {
        case '+' : return sum(firstNumber, secondNumber);break;
        case '-' : return subtract(firstNumber, secondNumber);break;
        case '*' : return multiply(firstNumber, secondNumber);break;
        case '/' : return divide(firstNumber, secondNumber);break;
    }
}

// Display choosed button
function calcul()
{
    const numberButtons = document.querySelectorAll('button.number');
    const operatorButtons = document.querySelectorAll('button.operator');
    const specialButtons = document.querySelectorAll('button.special');
    const resButton = document.querySelector('button.result');
    let current = document.querySelector('#calcul');
    let history = document.querySelector('#history');
    let operators = ['+', '-', '*', '/'];
    let operatorChoosed = "";
    let first = "", second = "", result = 0;

    numberButtons.forEach((button) => {
        button.addEventListener("click", () => {
            if(current.textContent.length < 12)
            {
                current.textContent += button.value;
                if (operatorChoosed === "") {
                    first += button.value;
                } else {
                    second += button.value;
                }
            }
        })}
    )
    operatorButtons.forEach((operator) => {
        operator.addEventListener('click', () => {
            if (operatorChoosed !== "") 
            {
                if(operatorChoosed === '/' && (first == 0 || second == 0 || result == 0))
                {
                    alert("Impossible to divide by 0.");
                    current.textContent = "";
                    history.textContent = "";
                    first = 0;
                    second = 0;
                    result = 0;
                    operatorChoosed = "";
                }
                else
                {
                result = operate(parseFloat(first), operatorChoosed, parseFloat(second));
                first = result;
                second = "";
                }
            }
            if(first == 0 && second == 0 && result == 0)
                operatorChoosed = "";
            else
                operatorChoosed = operator.value;
            
            history.textContent += current.textContent + " " + operatorChoosed + " ";
            current.textContent = "";
        })
    })

    specialButtons.forEach((special) => 
    {
        special.addEventListener("click", () => 
        {
            // Display or clear 
            if(special.value !== "clear" && special.value !== "undo" && special.value !== "unary")
                current.textContent += special.value;
            else
            {
                if(special.value === "clear")
                {
                    current.textContent = "";
                    history.textContent = "";
                    first = 0;
                    second = 0;
                    result = 0;
                    operatorChoosed = "";
                }
                else if(special.value === "undo")
                {
                    if (current.textContent !== "") {
                        current.textContent = current.textContent.slice(0, -1);
                    } else if (operatorChoosed !== "") {
                        operatorChoosed = "";
                        history.textContent = history.textContent.slice(0, -2);
                    } else if (second !== "") {
                        second = second.slice(0, -1);
                    } else if (first !== "") {
                        first = first.slice(0, -1);
                    }
                }
                else if (special.value === "unary")
                {
                    if (current.textContent !== "") 
                    {
                        const currentValue = parseFloat(current.textContent);
                        current.textContent = (-currentValue).toString();
                        if (operatorChoosed === "") 
                            first = (-currentValue).toString();
                        else 
                            second = (-currentValue).toString();
                    }
                }
            }
        })
    })

    resButton.addEventListener("click", () => {
        if (operatorChoosed !== "" && second !== "") {
            if(operatorChoosed === '/' && (first == 0 || second == 0))
            {
                alert("Impossible to divide by 0.");
                current.textContent = "";
                history.textContent = "";
                first = 0;
                second = 0;
                result = 0;
                operatorChoosed = "";
            }
            else
            {
                result = operate(parseFloat(first), operatorChoosed, parseFloat(second));
                history.textContent = first + " " + operatorChoosed + " " + second + " =";
                if(result > 999999999999)
                    current.textContent = "Result too long"
                else
                    current.textContent = result;
                first = result;
                second = "";
                operatorChoosed = "";
            }

        }
    })
}

calcul();