var name = "Jacki"
var age = 4
var favourite_color = "Yellow"
var sum = add(1, multiply(2, substract(4, 3)))
print("The sum is ", sum)
function print(...args) {
    console.log(...args);
}

function add(x, y) {
    return x + y;
}

function multiply(x, y) {
    return x * y;
}

function substract(x, y) {
    return x - y;
}

function divide(x, y) {
    return x / y;
}