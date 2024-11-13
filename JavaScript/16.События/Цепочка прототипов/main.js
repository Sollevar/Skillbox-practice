const app = document.getElementById('app');
const title = document.createElement('h1')
const form = document.createElement('form');
const formInput = document.createElement('input');
const formButton = document.createElement('button');


app.classList.add('container', 'pt-3')
title.textContent = 'Цепочка наследования стандартных классов JavaScript';
formInput.type = 'text';
formInput.placeholder = 'Введите класс';
formInput.classList.add('form-control', 'mb-3');
formButton.textContent = 'Показать цепочку прототипов';
formButton.classList.add('btn', 'btn-primary', 'mb-3')
form.append(formInput, formButton)
app.append(title, form);

// HTMLInputElement
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const lastList = document.querySelector('ol');
    if (lastList) lastList.remove();
    const inputData = formInput.value.trim();
    if (inputData in window && typeof (window[inputData] === 'function')) {
        formInput.classList.remove('is-invalid');
        const prototypeList = document.createElement('ol');
        const firstPrototypeItem = document.createElement('li')
        const obj = window[inputData].prototype; // непостредственный прототип
        firstPrototypeItem.textContent = obj.constructor.name;
        prototypeList.append(firstPrototypeItem);
        getChildPrototype(obj);
        function getChildPrototype(object) {
            if (Object.getPrototypeOf(object)) {
                const childProto = Object.getPrototypeOf(object);
                const prototypeItem = document.createElement('li');
                prototypeItem.textContent = childProto.constructor.name;
                prototypeList.append(prototypeItem);
                getChildPrototype(childProto);
            }
            return
        }
        app.append(prototypeList);
    } else {
        formInput.classList.add('is-invalid');
    }
})
