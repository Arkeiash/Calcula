const OPERATORS = ["+", "-", "*", "/"];
const POWER = "POWER(", FACTORIAL = "FACTORIAL";
let data = {
    operation: [],
    formula: [],
}


let calculator_buttons = [
    {
        name : "rad",
        symbol : "Rad",
        formula : false,
        type : "key"
    },
    {
        name : "deg",
        symbol : "Deg",
        formula : false,
        type : "key"
    },
    {
        name : "square-root",
        symbol : "√",
        formula : "Math.sqrt",
        type : "math_function"
    },
    {
        name : "square",
        symbol : "x²",
        formula : POWER,
        type : "math_function"
    },
    {
        name : "open-parenthesis",
        symbol : "(",
        formula : "(",
        type : "number"
    },
    {
        name : "close-parenthesis",
        symbol : ")",
        formula : ")",
        type : "number"
    },
    {
        name : "clear",
        symbol : "C",
        formula : false,
        type : "key"
    },
    {
        name : "delete",
        symbol : "⌫",
        formula : false,
        type : "key"
    },
    {
        name : "pi",
        symbol : "π",
        formula : "Math.PI",
        type : "number"
    },
    {
        name : "cos",
        symbol : "cos",
        formula : "this.trigo(Math.cos,",
        type : "trigo_function"
    },{
        name : "sin",
        symbol : "sin",
        formula : "this.trigo(Math.sin,",
        type : "trigo_function"
    },{
        name : "tan",
        symbol : "tan",
        formula : "this.trigo(Math.tan,",
        type : "trigo_function"
    },{
        name : "7",
        symbol : 7,
        formula : 7,
        type : "number"
    },{
        name : "8",
        symbol : 8,
        formula : 8,
        type : "number"
    },{
        name : "9",
        symbol : 9,
        formula : 9,
        type : "number"
    },
    {
        name : "division",
        symbol : "÷",
        formula : "/",
        type : "operator"
    },
    {
        name : "e",
        symbol : "e",
        formula : "Math.E",
        type : "number"
    },
    {
        name : "acos",
        symbol : "acos",
        formula : "this.inv_trigo(Math.acos,",
        type : "trigo_function"
    },{
        name : "asin",
        symbol : "asin",
        formula : "this.inv_trigo(Math.asin,",
        type : "trigo_function"
    },{
        name : "atan",
        symbol : "atan",
        formula : "this.inv_trigo(Math.atan,",
        type : "trigo_function"
    },
    {
        name : "4",
        symbol : 4,
        formula : 4,
        type : "number"
    },{
        name : "5",
        symbol : 5,
        formula : 5,
        type : "number"
    },{
        name : "6",
        symbol : 6,
        formula : 6,
        type : "number"
    },{
        name : "multiplication",
        symbol : "×",
        formula : "*",
        type : "operator"
    },{
        name : "factorial",
        symbol : "×!",
        formula : FACTORIAL,
        type : "math_function"
    },{
        name : "exp",
        symbol : "exp",
        formula : "Math.exp",
        type : "math_function"
    },{
        name : "ln",
        symbol : "ln",
        formula : "Math.log",
        type : "math_function"
    },{
        name : "log",
        symbol : "log",
        formula : "Math.log10",
        type : "math_function"
    },{
        name : "1",
        symbol : 1,
        formula : 1,
        type : "number"
    },{
        name : "2",
        symbol : 2,
        formula : 2,
        type : "number"
    },{
        name : "3",
        symbol : 3,
        formula : 3,
        type : "number"
    },{
        name : "subtraction",
        symbol : "–",
        formula : "-",
        type : "operator"
    },{
        name : "power",
        symbol : "x<span>y</span>",
        formula : POWER,
        type : "math_function"
    },{
        name : "ANS",
        symbol : "ANS",
        formula : "ans",
        type : "number"
    },{
        name : "percent",
        symbol : "%",
        formula : "/100",
        type : "number"
    },{
        name : "comma",
        symbol : ".",
        formula : ".",
        type : "number"
    },{
        name : "0",
        symbol : 0,
        formula : 0,
        type : "number"
    },{
        name : "calculate",
        symbol : "=",
        formula : "=",
        type : "calculate"
    },{
        name : "addition",
        symbol : "+",
        formula : "+",
        type : "operator"
    }
];





class Calculator {
    constructor({onComplete}) {
        this.onComplete = onComplete;
        this.RADIAN = true;
        
    }
    createElement = function() {

        this.calculatorElement = document.createElement("div");
        this.calculatorElement.classList.add("calculator");
        
        this.calcContainerElement = document.createElement("div");
        this.calcContainerElement.classList.add("calc-container");

        this.outputElement = document.createElement("div");
        this.outputElement.classList.add("output");

        this.inputElement = document.createElement("div");
        this.inputElement.classList.add("input");

        this.resultElement = document.createElement("div");
        this.resultElement.classList.add("result");
        this.operationElement = document.createElement("div");
        this.operationElement.classList.add("operation");

        this.operationValueElement = document.createElement("div");
        this.operationValueElement.classList.add("value");        

        this.resultValueElement = document.createElement("div");
        this.resultValueElement.classList.add("value");
    

        this.resultElement.appendChild(this.resultValueElement);
        this.operationElement.appendChild(this.operationValueElement);

        this.outputElement.appendChild(this.operationElement);
        this.outputElement.appendChild(this.resultElement);

        this.calcContainerElement.appendChild(this.outputElement);
        this.calcContainerElement.appendChild(this.inputElement);

        this.calculatorElement.appendChild(this.calcContainerElement);
    }
    createButton = function(name, symbol, container) {
        const button = document.createElement("button");
        button.id=`${name}`;
        button.innerHTML = `${symbol}`;
        container.appendChild(button);
    }
    createRow = function(container) {
        var row = document.createElement("div");
        row.classList.add("row");
        container.appendChild(row);
    }
    createCalculatorButtons = function() {
        const btns_per_row = 8;
        let added_btns = 0;
        calculator_buttons.forEach( button => {
            if(added_btns % btns_per_row == 0) {
                this.createRow(this.inputElement);
            }
            const row = document.querySelector(".row:last-child");
            this.createButton(button.name, button.symbol, row);
            added_btns++;

        })
    }

    factorial = function(number) {
        if(number % 1 != 0) {return gamma(number +1);}
        if(number === 0 || number === 1) {
            return 1;
        }
        let result = 1;
        for(let i = 0; i<= number; i++ ) {
            result *= i;
            if(result === Infinity) {
                return Infinity;
            }
        }
        return result;
    }
    gamma = function(n) {
        var g = 7, // g represents the precision desired, p is the values of p[i] to plug into Lanczos' formula
            p = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
        if (n < 0.5) {
            return Math.PI / Math.sin(n * Math.PI) / this.gamma(1 - n); // Added 'this' to gamma call
        } else {
            n--;
            var x = p[0];
            for (var i = 1; i < g + 2; i++) {
                x += p[i] / (n + i);
            }
            var t = n + g + 0.5;
            return Math.sqrt(2 * Math.PI) * Math.pow(t, (n + 0.5)) * Math.exp(-t) * x;
        }
    }
      close() {
        this.calculatorElement.remove();
        this.onComplete();
      }

      updateOutputOperation = function(operation) {
        this.operationValueElement.innerHTML = operation;
        }
        
        updateOutputResult = function(result) {
        this.resultValueElement.innerHTML = result;
        }
        
        calculator = function(button) {
        if(button.type === "operator") {
        data.operation.push(button.symbol);
        data.formula.push(button.formula);
        } else if(button.type === "number") {
        data.operation.push(button.symbol);
        data.formula.push(button.formula);
            
        }  else if(button.type === "trigo_function") {
            data.operation.push(button.symbol + "(");
            data.formula.push(button.formula);
        } else if(button.type === "math_function") {
            let symbol, formula;

            if(button.name == "factorial") {
                symbol = "!";
                formula = button.formula;

                data.operation.push(symbol);
                data.formula.push(formula);
            } else if(button.name == "power") {
                symbol = "^(";
                formula = button.formula;

                data.operation.push(symbol);
                data.formula.push(formula);
            } else if(button.name == "square") {
                symbol = "^(";
                formula = button.formula;

                data.operation.push(symbol);
                data.formula.push(formula);

                data.operation.push("2)");
                data.formula.push("2)");
            } else if(button.name == "trigo_function") {
                data.operation.push(button.symbol + "(");
                data.formula.push(button.formula);
            } else {
                symbol = button.symbol + "(";
                formula = button.formula + "(";
                data.operation.push(symbol);
                data.formula.push(formula);
            }
        } else if(button.type === "key") {
            if(button.name == "clear") {
                data.operation = [];
                data.formula = [];
                this.updateOutputResult(0);
            } else if (button.name == "delete") {
                data.operation.pop();
                data.formula.pop();
            } else if (button.name == "rad") {
                this.RADIAN = true;
                this.angleToggler();
            } else if (button.name == "deg") {
                this.RADIAN = false;
                this.angleToggler();
            } 
        } else if(button.type === "calculate") {
            //Factorial Fix
            let formula_str = data.formula.join('');
            //Find Powers and Factorials
            let POWER_SEARCH_RESULT = this.search(data.formula, POWER);
            let FACTORIAL_SEARCH_RESULT = this.search(data.formula, FACTORIAL);
            //Find bases and exponents
            const BASES = this.powerBaseGetter(data.formula, POWER_SEARCH_RESULT);
            BASES.forEach(base => {
               let to_replace = base + POWER;
                let replacement = "Math.pow("+base+",";
                formula_str = formula_str.replace(to_replace, replacement);
            });
            const NUMBERS = this.factorialNumberGetter(data.formula, FACTORIAL_SEARCH_RESULT);
            NUMBERS.forEach(factorial => {
                formula_str = formula_str.replace(factorial.toReplace, factorial.replacement);
            })
            console.log(formula_str);
            //Calculate
            let result;
            try{result = eval(formula_str);
               }catch( error ) {
                if(error instanceof SyntaxError) {
                    result = "Syntax Error!";
                    this.updateOutputResult(result);
                    return;
                }
               }
            //Saving Answer
            let ans = result;
            data.operation = [ result ];
            data.formula = [ result ];
            
                this.updateOutputResult(result);
        }
            this.updateOutputOperation(data.operation.join(''));
            console.log(data.formula.join(''));
        }

        getTrigVars = function() {
            this.rad_btn = document.getElementById("rad");
            this.deg_btn = document.getElementById("deg");
            this.rad_btn.classList.add("active-angle");
        }
        angleToggler = function() {
            this.rad_btn.classList.toggle("active-angle");
            this.deg_btn.classList.toggle("active-angle");
        }

        trigo = function(callback, angle) {
            if(!this.RADIAN) {
                angle = angle * Math.PI/180
            }
            return callback(angle);
        }
        inv_trigo = function(callback, value) {
        let angle = callback(value);
        if (!this.RADIAN) {
            angle = angle * 180 / Math.PI; // Fixed angle conversion to degrees
        }
        return angle;
    }


       search = function(array, keyword) {
        let search_result = [];
        array.forEach((element, index) => {
            if (element === keyword) { // Fixed comparison
                search_result.push(index);
            }
        });
        return search_result;
    }

        powerBaseGetter = function(formula, POWER_SEARCH_RESULT) {
        let power_bases = [];
        POWER_SEARCH_RESULT.forEach(power_index => {
            let base = [];
            let parentheses_count = 0;
            let previous_index = power_index - 1;
            while (previous_index >= 0) {
                if (formula[previous_index] === "(") { parentheses_count--; } // Fixed comparison
                if (formula[previous_index] === ")") { parentheses_count++; } // Fixed comparison

                let is_operator = false;
                OPERATORS.forEach(OPERATOR => {
                    if (formula[previous_index] === OPERATOR) { is_operator = true; } // Fixed comparison
                });
                let is_power = formula[previous_index] === POWER; // Fixed comparison
                if ((is_operator && parentheses_count === 0) || is_power) break;

                base.unshift(formula[previous_index]);
                previous_index--;
            }
            power_bases.push(base.join('')); // Fixed variable name to 'base'
        });
        return power_bases;
    }

        factorialNumberGetter = function(formula, FACTORIAL_SEARCH_RESULT) {
            let numbers = [];
            let factorial_sequence = 0;
            FACTORIAL_SEARCH_RESULT.forEach(factorial_index => {
                let number = [];
                let next_index = factorial_index +1;
                let next_input = formula[next_index];
                if(next_input == FACTORIAL) {
                    factorial_sequence += 1;
                    return
                }
                let first_factorial_index = factorial_index - factorial_sequence;
                let previous_index = first_factorial_index - 1;
                let parentheses_count = 0;
                while(previous_index >= 0) {
                    if(formula[previous_index] = "(") {parentheses_count --;}
                    if(formula[previous_index] = ")") {parentheses_count ++;}
                    
                    let is_operator = false;
                    OPERATORS.forEach(OPERATOR => {
                        if(formula[previous_index] = OPERATOR) {is_operator = true}
                    })
                    if(is_operator && parentheses_count === 0) break;

                    number.unshift(formula[previous_index]);
                    previous_index --;               
                }
                let number_str = number.join('');
                const factorial = "factorial(", close_parentheses = ")";
                let times = factorial_sequence + 1;
                let toReplace = number_str + FACTORIAL.repeat(times);
                let replacement = factorial.repeat(times) + number_str + close_parentheses.repeat(times);

                numbers.push({
                    toReplace: toReplace,
                    replacement: replacement,
                });
                factorial_sequence = 0;
            });
            return numbers;
        }
        
        addTheEventListeners = function() {
            console.log("Listeners Called");
            this.inputElement.addEventListener("click", event => {
                const target_btn = event.target;
                console.log(target_btn.id);
                calculator_buttons.forEach(button => {
                    if(button.name == target_btn.id) {
                        this.calculator(button);
                        
                    }
                })
            })
        }

      async init(container) {
        this.createElement();
        container.appendChild(this.calculatorElement);
        this.createCalculatorButtons();
        this.addTheEventListeners();
        this.getTrigVars();

        utils.wait(200);
        this.esc = new KeyPressListener("KeyC", () => {
          this.close();
        })
      }
      


    
}

