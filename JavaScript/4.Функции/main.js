// Задание 1. Фильтрация email - адресов
let blackList = ['sollevar@mail.ru','biik@mail.ru'];
let list = ['sollevar@mail.ru','atlasuk@mail.ru','biik@mail.ru','skillbox@gmail.com','belousov@gmail.com'];
let whiteList = [];

function emailfilter(emails,unresolved){

    for(let email in emails){
        allowed = emails[email];
        if (unresolved.includes(allowed) === false){
            whiteList.push(allowed);
        }
    }

    console.log('Валидные email адреса:');
    console.log(whiteList);

}

emailfilter(list,blackList);

// Задание 2. Скидки при условии

function calculate(basket, basketItems, promo = null) {
    let price = basket; {
        if (promo === "ДАРИМ300") {
            price = price > 300 ? price - 300 : 0;
        }
        if (basketItems >= 10) {
            price = price - price * 0.05;
        }
        if (price > 50000) {
            price = price - ((price - 50000) * 0.2);
        }
        if (promo === "СКИДКА15" && price >= 20000) {
            price = price - price * 0.15;
        }
    }
    return price;
}
console.log(calculate(100000, 10, 'ДАРИМ300'));



