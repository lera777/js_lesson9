//1
console.log(getBigName(userName)); //UNDEFINED , т.к. на моммент вызова этой функции еще небыло присвоено значение в userName, переменная var всплывает, но со значением UNDEFINED
function getBigName(name){
    name = name + '';
    return name.toUpperCase();
}
var userName = 'Ivan';

//2
function test() {
    var name = 'Vasiliy';
    return getBigName2(userName);
}

function getBigName2(name){
    name = name + '';
    return name.toUpperCase();
}

var userName = 'Ivan';
console.log(test()); // IVAN : функция test() возвращает результат функции getBigName2(name), а т.к. в этой функции name не определен, то берется значение из global LE

//3
var food = 'cucumber';
 (function(){
     var food = 'bread';
     getFood();  // cucumber,  т.к. в getFood() не присвоено значение переменной food, то берется значение из global LE
 })();

 function getFood(){
     console.log(food);
 }

//1
 var dollar,
    getDollar;

(function(){
    var dollar = 0;
    getDollar = function(){
        return dollar;
    }
}());

dollar = 30;
console.log(getDollar()); // 0, т.к. функция getDollar() сначала ищет значение dollar внутри себя и не обнаружив его, берет значение из внешней функции через замыкание

//2
var greet = 'Hello';
(function(){
    var text = 'World';
    console.log(greet + text); // HelloWorld, т.к. переменная text определена в функции и greet в global LE
}());
//console.log(greet + text); // Uncaught ReferenceError: text is not defined, т.к. в global LE переменная text не объявлена

//3
function minus(x){
    x = typeof x !== 'number'? 0 : x;
    return function(y) {
        y = typeof y !== 'number'? 0 : y;
        return x == 0? y : y == 0? x : x - y;
    }
}
console.log(minus(10)(6));
console.log(minus(5)(6));
console.log(minus(10)());
console.log(minus()(6));
console.log(minus()());

//4
function MultiplyMaker(x){
    let y = x;
    function mult(z){ 
        y *= z; 
        return y;
    }
    return mult;
}
const multiply = MultiplyMaker(2);
console.log(multiply(2));
console.log(multiply(1));
console.log(multiply(3));
console.log(multiply(10));

//5
const ModeString = (function(){
    let string;

    function setString(str){
        string = !str ? '' : typeof(str) == 'number'? String(str) : str;
    } 

    function getString(){
        return string;
    }

    function getStringLength(){
        return string.length;
    }

    function reverseString(){
        return string.split('').reverse().join('');
    }

    return {
        setString,
        getString,
        getStringLength,
        reverseString
    }
}());
ModeString.setString('abcde');
console.log(ModeString.getString());
console.log(ModeString.getStringLength());
console.log(ModeString.reverseString());

//6 
const Calc =(function(){
    let num;
    function verificationNum(number){
        if(typeof number !== "number")  {
            console.log('Please provide number!');
            return;
    }
}

    function setValue(value){
        verificationNum(value);
        num = value;
        return this;
    }

    function add(addendum){
        verificationNum(addendum);
        num += addendum;
        return this;
    }

    function multiply(multiplier){
        verificationNum(multiplier);
        num *= multiplier;
        return this;
    }

    function divide(divider){
        verificationNum(divider);
        if(divider === 0) return new Error('divisor should not be 0');
        num /= divider;
        return this;
    }

    function exp(e){
        verificationNum(e);
        num = Math.pow(num,e);
        return this;
    }

    function getRes(){
        num = (Math.round(num * 100) / 100);
        return num;
    }

    return {
        setValue,
        add,
        multiply,
        divide,
        exp,
        getRes
    }
}());

Calc.setValue(10);
Calc.add(5);
Calc.multiply(2);
console.log(Calc.getRes());

console.log(Calc.setValue(10).exp(2).getRes());

console.log(Calc.setValue(11.234445).exp(2).getRes()); // Math.round

Calc.setValue(10);
console.log(Calc.divide(0)); // Error division by 0
Calc.divide(5);
console.log(Calc.getRes());

Calc.add('abc'); // Error