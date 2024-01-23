parseEmployeesData(`
Атласюк Игорь  Романович, frontend-разработчик
Раитин Данил Игоревич, коллектор
`)

function parseEmployeesData(dataString){
    return dataString
    .split('\n') // разбивает текст по строкам (перенос по сторокам)
    .filter(line => line.trim().length > 0) // убирает пустые строки и строки с пробелами
    .map(line =>{ // преобразует каждую строку
        const [fullName,occupation] = line // через запятую выписаны Фио и должность
            .split(',') // разбиваем строку по запятой
            .map(str => str.trim()) // убираем лишние пробелы перед и после запятой
            .filter(text => text.length > 0); // фильтрует массив строк и оставляет только те строки, которые содержат более одного символа.
        const[surname,name,middleName] = fullName
            .split(' ') // двойной пробел
            .filter(text => text.length > 0);
        return {
            surname,name,middleName,occupation
        }

    })
}

function getPageLinkDomains(){
    // получаем все ссылки на странице (вернет не массив)
    // с помощью Array.from создается массив из массивоподобный структур
    return Array.from(document.getElementsByTagName('a'))
        .map(link => link.href
            // убираем протоколы http:// и https://
            .replace('http://','')
            .replace('https://','')
            // убираем www
            .replace('www.','')
            // делим оставшуюся часть по слэшу, убирая иные части ссылки
            .split('/')
            // забираем 1 элемент массива (домен)
            .shift()
            )
        .reduce((uniqueDomains,domain) => {
            // возвращаем массив без изменений,если в нем уже есть такой домен
            if(uniqueDomains.includes(domain)) return uniqueDomains;
            // иначе добавляем его в массив  и возвращаем новый массив
            return[...uniqueDomains, domain];
        }, []);
}

console.log(getPageLinkDomains());

