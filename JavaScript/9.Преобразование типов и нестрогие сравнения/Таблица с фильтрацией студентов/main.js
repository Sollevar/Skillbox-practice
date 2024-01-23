const studentsList = [
  // месяц -1 так как с 0 по 11
  {
    surname: "Атласюк",
    name: "Игорь",
    lastname: "Романович",
    dateOfBirth: new Date(2002, 9, 17),
    startYear: 2020,
    faculty: "ИВТ",
  },

  {
    surname: "Раитин",
    name: "Данила",
    lastname: "Игоревич",
    dateOfBirth: new Date(2002, 3, 27),
    startYear: 2016,
    faculty: "Юриспруденция",
  },

  {
    surname: "Борисов",
    name: "Никита",
    lastname: "Викторович",
    dateOfBirth: new Date(2002, 4, 4),
    startYear: 2015,
    faculty: "Спорт",
  },

  {
    surname: "Иванов",
    name: "Иван",
    lastname: "Иванович",
    dateOfBirth: new Date(1998, 5, 7),
    startYear: 1940,
    faculty: "Менеджмент",
  },

  {
    surname: "Смирнов",
    name: "Сидор",
    lastname: "Михайлович",
    dateOfBirth: new Date(1999, 0, 12),
    startYear: 2015,
    faculty: "ИВТ",
  },
];

let sortObject = "fio"; // по какому обьекту будет осуществляться сортировка
let sortDir = false; // переключатель возрастания / убывания

const table = document.querySelector(".table");
const tHead = document.createElement("thead");
const tBody = document.createElement("tbody");

const tHeadTr = document.createElement("tr");
const tHeadTdFIO = document.createElement("th");
const tHeadTdBirth = document.createElement("th");
const tHeadTdstartYear = document.createElement("th");
const tHeadTdFaculty = document.createElement("th");

tHeadTdFIO.textContent = "ФИО";
tHeadTdBirth.textContent = "Дата рождения";
tHeadTdstartYear.textContent = "Дата начала обучения";
tHeadTdFaculty.textContent = "Факультет";

tHeadTr.append(tHeadTdFIO, tHeadTdBirth, tHeadTdstartYear, tHeadTdFaculty);
tHead.append(tHeadTr);

function createStudent(user) {
  const userTr = document.createElement("tr");
  const userFIO = document.createElement("td");
  const userBirth = document.createElement("td");
  const userstartYear = document.createElement("td");
  const userFaculty = document.createElement("td");

  userFIO.textContent = user.fio;
  userBirth.textContent = user.dateOfBirth;
  userstartYear.textContent = user.startYear;
  userFaculty.textContent = user.faculty;
  userTr.append(userFIO, userBirth, userstartYear, userFaculty);
  return userTr;
}

// Фильтрация
const filterForm = document.getElementById("form-filter");
const filterFio = document.getElementById("filter-fio");
const filterFaculty = document.getElementById("filter-faculty"); 
const filterAge = document.getElementById("filter-age");
const filterStart = document.getElementById("filter-start");

filterForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

filterFio.addEventListener("input", () => {
  render(studentsList);
});

filterFaculty.addEventListener("input", () => {
  render(studentsList);
});

filterAge.addEventListener("input", () => {
  render(studentsList);
});

filterStart.addEventListener("input", () => {
  render(studentsList);
});

function render(arrData) {
  tBody.innerHTML = "";
  // создаем новый массив, чтобы не затрагивать текущий (не менять его)
  let newStudentsList = arrData.map((obj) => ({ ...obj }));
  for (const user of newStudentsList) {
    // создаем фио
    user.fio = user.surname + " " + user.name + " " + user.lastname;
    // Получаем корректную дату
    let day = user.dateOfBirth.getDate();
    let month = user.dateOfBirth.getMonth() + 1;
    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }
    let currentYear = new Date();
    let age = currentYear.getFullYear() - user.dateOfBirth.getFullYear();
    let currentMonth = currentYear.getMonth() - month;
    if (
      currentMonth < 0 ||
      (currentMonth === 0 && currentYear.getDate() < day)
    ) {
      age--;
    }
    user.dateOfBirth =
      day +
      "." +
      month +
      "." +
      user.dateOfBirth.getFullYear() +
      " " +
      `(${age})`;
    user.age = age; // нужно для сортировки по дате рождения
    user.start = user.startYear; // нужно для сортировки по году начала обучения
    user.startYear = user.startYear + "-" + (user.startYear + 4);
  }

  // Сортировка по алфавитному порядку
  newStudentsList = newStudentsList.sort((a, b) => {
    let sort = a[sortObject] > b[sortObject]; // убывание
    if (sortDir === true) sort = a[sortObject] < b[sortObject]; // возрастание
    if (sort) return -1;
  });

  // Фильтрация

  // по фио
  if (filterFio.value.trim() !== "") {
    newStudentsList = newStudentsList.filter((user) => {
      if (user.fio.includes(filterFio.value.trim())) return true;
    });
  }

  // по факультету
  if (filterFaculty.value.trim() !== "") {
    newStudentsList = newStudentsList.filter((user) => {
      if (user.faculty.includes(filterFaculty.value.trim())) return true;
    });
  }

  // по Возрасту 
  if (filterAge.value.trim() !== "") {
    newStudentsList = newStudentsList.filter((user) => {
      if (user.age === parseInt(filterAge.value)) return true;
    });
  }

  if (filterStart.value.trim() !== "") {
    newStudentsList = newStudentsList.filter((user) => {
      if (user.start === parseInt(filterStart.value)) return true;
    });
  }

  // Отрисовка
  for (const user of newStudentsList) {
    const newUserTr = createStudent(user);
    tBody.append(newUserTr);
  }

  table.append(tHead, tBody);
}

render(studentsList);

const form = document.querySelector(".form");
const surnameInput = document.getElementById("input-surname");
const nameInput = document.getElementById("input-name");
const lastnameInput = document.getElementById("input-lastname");
const birthInput = document.getElementById("input-bitrh");
const startYearInput = document.getElementById("input-start");
const facultyInput = document.getElementById("input-faculty");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (surnameInput.value.trim() === "") {
    // trim потому что пробел считается как символ !!!
    alert("Вы не ввели фамилию!");
    return;
  }

  if (nameInput.value.trim() === "") {
    // trim потому что пробел считается как символ !!!
    alert("Вы не ввели имя!");
    return;
  }

  if (lastnameInput.value.trim() === "") {
    // trim потому что пробел считается как символ !!!
    alert("Вы не ввели отчество!");
    return;
  }

  if (birthInput.value === "") {
    alert("Вы не ввели дату рождения!");
    return;
  }

  if (startYearInput.value === "") {
    alert("Вы не ввели дату начала обучения!");
    return;
  }

  if (facultyInput.value.trim() === "") {
    alert("Вы не ввели факультет!");
    return;
  }

  studentsList.push({
    surname: surnameInput.value.trim(),
    name: nameInput.value.trim(),
    lastname: lastnameInput.value.trim(),
    dateOfBirth: birthInput.valueAsDate, // чтобы корректно работал обьект Date
    startYear: startYearInput.valueAsNumber, // чтобы корректно работать с мат.действиями
    faculty: facultyInput.value.trim(),
  });
  render(studentsList);
});

// Cортировка
const sortFioButton = document.getElementById("sort-fio");
const sortFacultyButton = document.getElementById("sort-faculty");
const sortBirthButton = document.getElementById("sort-birth");
const sortStartButton = document.getElementById("sort-start");

sortFioButton.addEventListener("click", () => {
  sortObject = "fio";
  sortDir = !sortDir;
  render(studentsList);
});

sortFacultyButton.addEventListener("click", () => {
  sortObject = "faculty";
  sortDir = !sortDir;
  render(studentsList);
});

sortBirthButton.addEventListener("click", () => {
  sortObject = "age";
  sortDir = !sortDir;
  render(studentsList);
});

sortStartButton.addEventListener("click", () => {
  sortObject = "startYear";
  sortDir = !sortDir;
  render(studentsList);
});

