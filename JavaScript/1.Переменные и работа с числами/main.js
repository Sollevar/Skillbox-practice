//Задача 1. Площадь прямоугольника
let x1 = 8;
let y1 = 1;
let x2 = 5;
let y2 = 1;
let width = Math.abs(x2 - x1);
let height = Math.abs(y2 - y1);
console.log('Площадь равна:', width * height);

// Задача 2. Сравнение дробной части чисел
let a = 13.890123;
let b = 2.891564;
let n1 = 3;

let aDrob = Math.floor(
    (a % 1) * Math.pow(10, n1)
);

let bDrob = Math.floor(
    (b % 1) * Math.pow(10, n1)
);

console.log('Дробь числа а :', aDrob);
console.log('Дробь числа b :', bDrob);

console.log('a > b', aDrob > bDrob);
console.log('a < b', aDrob < bDrob);
console.log('a >= b', aDrob >= bDrob);
console.log('a <= b', aDrob <= bDrob);
console.log('a=b', aDrob === bDrob);
console.log('a не равно b', aDrob !== bDrob);

// Задача 3. Сравнение чисел из рандомного генератора
let n = 5;
let m = 100;
let range = Math.abs(m - n);
let randomNumber1 = Math.round(Math.random() * range);
let randomNumber2 = Math.round(Math.random() * range);
let min = Math.min(n,m);
console.log('Первое число',min+randomNumber1);
console.log('Второе число',min+randomNumber2);
console.log('Первое число > Второе число', randomNumber1 > randomNumber2);
console.log('Первое число < Второе число', randomNumber1 < randomNumber2);
console.log('Первое число >= Второе число', randomNumber1 >= randomNumber2);
console.log('Первое число <= Второе число', randomNumber1 <= randomNumber2);
console.log('Первое число = Второе число', randomNumber1 === randomNumber2);
console.log('Первое число не равно Второму числу', randomNumber1 !== randomNumber2);