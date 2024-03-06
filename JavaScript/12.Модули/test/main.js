let {text} = await import('./local.js');
let {text2} = await import('./api.js')
async function createButton(){
    let button = document.createElement('button');
    button.textContent = 'Переключатель хранилищ';
    button.isLocal = true;
    document.body.append(button);
    button.addEventListener('click', () => {
        if (button.isLocal === true) {
            button.textContent = text2;
            button.isLocal = false;
        } else{
            button.textContent = text;
            button.isLocal = true;
        }
    })
}

createButton()
