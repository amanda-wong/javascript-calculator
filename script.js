
var lastNumber = 0;
    
    function constructEquation(e){
        var numRegEx = /\w+\.?\w*/g;
        var displayWindow = document.getElementById('display').innerText;
        var buttonValue = e.target.innerText;
        var lastChar = displayWindow.charAt(displayWindow.length - 1);
        var clickedNumber = e.target.classList.contains('number');
        var clickedOperator = e.target.classList.contains('operator');
        var clickedDecimal = e.target.classList.contains('decimal');
        

        if(displayWindow === '0') {
            _handleFirstButtonClick();
        } else if(lastChar === '.') {
            _handleIfLastCharIsDecimal();
        } else if(new RegExp(/\w/).test(lastChar)) {
            _handleIfLastCharIsNumber();
        } else if(new RegExp(/[*/\-+]/).test(lastChar)) {
            _handleIfLastCharIsOperator();
        }

        function _handleIfLastCharIsNumber() {
            if (clickedNumber || clickedOperator || (clickedDecimal && lastNumber.indexOf('.') < 0)) {
                _appendValueToEquation();
            }
        }

        function _handleIfLastCharIsOperator() {
            if(clickedNumber) {
                _appendValueToEquation();
            } else if (clickedOperator) {
                document.getElementById('display').innerText = displayWindow.substring(0, displayWindow.length - 1) + buttonValue;
            }
        }

        function _handleIfLastCharIsDecimal() {
            if(clickedNumber) {
                _appendValueToEquation();
            }
        }

        function _handleFirstButtonClick() {
            if(clickedNumber && buttonValue != '0') {
                _replaceEquationWithValue();
                
            } else if (clickedDecimal || clickedOperator) {
                _appendValueToEquation();
            }
        }

        function _appendValueToEquation() {
            if(new RegExp(/[\w.]/).test(buttonValue)) {
                lastNumber += buttonValue
            } else if (new RegExp(/[*/\-+]/).test(buttonValue)) {
                lastNumber = '';
            }

            document.getElementById('display').innerText += buttonValue;
        }
        
        function _replaceEquationWithValue() {
            lastNumber = buttonValue;
            document.getElementById('display').innerText = buttonValue;
            console.log('last number', lastNumber);
        }        
    }

    function calculate() {
        var displayWindow = document.getElementById('display').innerText;
        document.getElementById('display').innerText = eval(displayWindow);
        lastNumber = eval(displayWindow);
    }

    function clearCalculator() {
        document.getElementById('display').innerText = 0;
        lastNumber = '0';
    }
  

window.onload = function(){
                    
    var button = document.getElementsByClassName('button');
                
    for(var i = 0; i < button.length; i++) {
        button[i].addEventListener('click', constructEquation)
    }

    document.querySelector('.clear').addEventListener('click', clearCalculator); 
    document.querySelector('.equal').addEventListener('click', calculate); 

}
