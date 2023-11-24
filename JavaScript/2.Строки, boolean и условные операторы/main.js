// Задача №1. Проверка надежности пароля. Надежный: если хотябы 4 символа и один из которых - или _

let password = '_zxd';
if (password.length >= 4 && password.includes("-") || password.includes('_')){
  console.log("Пароль надежный");
} else {
  console.log("Пароль не надежный");
}

// Задача №2. Даны имя и фамилия. Нужно чтобы 1 буквы были в верхнем регистре а последующие в нижнем регистре

let userName = 'иГорЬ';
let userSurname= 'АТЛасЮк';

let firstName =  (userName.substring(0,1)).toUpperCase();
let withoutFirstName = (userName.substring(1)).toLowerCase();
let fullName = `${firstName}${withoutFirstName}`;
console.log(fullName);

let firstSurename =  (userSurname.substring(0,1)).toUpperCase();
let withoutFirstSurename = (userSurname.substring(1)).toLowerCase();
let fullSurename = `${firstSurename}${withoutFirstSurename}`
console.log(fullSurename);

console.log(userName === fullName ? `Имя не было преобразовано`:`Имя было преобразовано`);
console.log(userSurname === fullSurename ? `Фамилия не была преобразовано`:`Фамилия была преобразовано`);

// Задача №3. Проверка числа на четность 

let number = 100;

if(number % 2 === 1){
  console.log(number + ` - нечетное число`)
} else{
  console.log(number + ` - четное число`)
}


