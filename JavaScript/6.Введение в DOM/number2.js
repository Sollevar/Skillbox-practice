// Изменение текста с задержкой
let input = document.createElement('input');
document.body.append(input);
let h2 = document.createElement('h2');
let timeOut;
input.addEventListener('input', function(){
    if (timeOut){
        clearTimeout(timeOut);
    }
    timeOut = setTimeout(titlefilling,3000)
    function titlefilling(){
        h2.textContent = input.value;
        document.body.append(h2);
        clearTimeout(timeOut);
    }
})

