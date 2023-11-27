// Задание 1. Сгенерировать массив длинной count, со случайными числами от n до m

let count = 42;
let n = -3;
let m = -10;
let array = [];
for (let i = 0; i < count; ++i) {
  array.push(Math.round(Math.random() * Math.abs(m - n)) + Math.min(m, n));
}

console.log(array);

// Задание 2. С помощью цикла создавать перевернутый вариант произвольной строки

let word = "Привет, мир!";
let reverseWord = "";
for (let i = 1; i < word.length + 1; ++i) {
  reverseWord += word[word.length - i];
}

console.log(reverseWord);

// Задание 3. true - мина, 1 взрыв танк поврежден, 2 взрыв танк уничтожен

let roadMines = [false, false, false, false, false, false, false, false, false, false];
crash = 0;
for (i = 0; i < roadMines.length; ++i) {
  position = 1;
  if (roadMines[i] === false) {
    console.log(`танк передвинулся на ${position + i}`);
  } else if (roadMines[i] === true && crash === 0) {
    console.log("танк поврежден");
    console.log(`танк передвинулся на ${position + i}`);
    crash += 1;
  } else {
    console.log(`танк передвинулся на ${position + i}`);
    console.log("танк уничтожен");
    break;
  }
}

// Задание 4. Календарь
let calendar = [];
let week = [
  "понедельник",
  "вторник",
  "среда",
  "четверг",
  "пятница",
  "суббота",
  "воскресенье"
];
 
let day = "вторник";
let indexWeek = week.indexOf(day);
 
for (let i = 1; i < 32; i++) {
  calendar.push(i);
}

for (let elem of calendar) {
  const y = (indexWeek + elem - 1) % 7;
  console.log(`${elem} января, ${week[y]}`);
}