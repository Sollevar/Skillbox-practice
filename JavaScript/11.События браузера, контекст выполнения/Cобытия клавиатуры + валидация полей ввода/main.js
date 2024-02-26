const inputName = document.getElementById("name");
const inputSurname = document.getElementById("surname");
const inputLastname = document.getElementById("lastname");
const form = document.querySelector('.form');

// const validСharacters = "йцукенгшщзхъфывапролджэячсмитьбю -"; // кирилица + дефис + пробел
// function controlInput() {
//   let correctValue;
//   for (const character of validСharacters) {
//     if (event.key.toLowerCase().includes(character)) {
//       correctValue = event.target.value + event.key;
//       this.value = correctValue; // выбирается input в который ввоядтся символы
//     } else {
//       event.preventDefault();
//     }
//   }
// }

const validReg = /[а-яё -]/i;

function regularControll(event) {
  let correctValue;
  if (event.key.match(validReg)) {
    correctValue = event.target.value;
    this.value = correctValue; // выбирается input в который ввоядтся символы
  } else {
    event.preventDefault();
  }
  return correctValue;
}

function validator() {
  let incorrectString = this.value;
  let correctString = "";
  for (const symbol of incorrectString) {
    if (symbol.match(validReg)) {
      correctString += symbol;
    }
  }
  correctString = correctString.replace(/^[\s\-]+/g, "");
  correctString = correctString.replace(/[\s\-]+$/g, "");
  correctString = correctString.replace(/\s{2,}/g, " ");
  correctString = correctString.replace(/\-{2,}/g, "-");
  function capitalizeFirstLetterInWord(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }
  correctString = capitalizeFirstLetterInWord(correctString);
  this.value = correctString; // вывод после валидации
}

inputName.addEventListener("keypress", regularControll);
inputSurname.addEventListener("keypress", regularControll);
inputLastname.addEventListener("keypress", regularControll);

inputName.addEventListener("blur", validator);
inputSurname.addEventListener("blur", validator);
inputLastname.addEventListener("blur", validator);

const list = document.createElement('ol');

function createFioListItems(){
  const container = document.querySelector('.container');
  const listItem = document.createElement('li');
  const fio = document.createElement('p');
  fio.textContent = `${inputSurname.value} ${inputName.value} ${inputLastname.value}`;

  list.classList.add('list');
  fio.classList.add('list__descr');
  listItem.classList.add('list__item');

  listItem.append(fio);
  list.append(listItem);
  container.append(list);

  inputName.value = '';
  inputSurname.value = '';
  inputLastname.value = '';
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  createFioListItems();
})

