(function () {
  // создаем и возвращаем заголовок приложения
  function createAppTitle(title) {
    let appTitle = document.createElement("h2");
    appTitle.textContent = title;
    return appTitle;
  }

  // создаем и возвращаем форму для создания дел
  function createTodoItemForm() {
    let form = document.createElement("form");
    let input = document.createElement("input");
    let buttonWrapper = document.createElement("div");
    let button = document.createElement("button");

    form.classList.add("input-group", "mb-3");
    input.classList.add("form-control");
    input.placeholder = "Введите название нового дела";
    buttonWrapper.classList.add("input-group-append");
    button.classList.add("btn", "btn-primary");
    button.textContent = "Добавить дело";
    button.disabled = true;

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return { form, input, button };
  }

  // создаем и возвращаем список элементов
  function createTodoList() {
    let list = document.createElement("ul");
    list.classList.add("list-group");
    return list;
  }

  function createTodoItem(name, done = false) {
    let item = document.createElement("li");
    let buttonGroup = document.createElement("div");
    let doneButton = document.createElement("button");
    let deleteButton = document.createElement("button");

    item.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
    item.textContent = name;
    if (done) {
      item.classList.add("list-group-item-success");
    }

    buttonGroup.classList.add("btn-group", "btn-group-sm");
    doneButton.classList.add("btn", "btn-success");
    doneButton.textContent = "Готово";
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.textContent = "Удалить";

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    return { item, doneButton, deleteButton };
  }

  function createTodoApp(container, title = "Cписок дел", listName) {
    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();
    let todoArray = JSON.parse(localStorage.getItem(listName)) || [];

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    // Функция для сохранения списка дел в localStorage
    function saveTodoList() {
      localStorage.setItem(listName, JSON.stringify(todoArray));
    }

    // Функция для добавления элемента и привязки событий
    function addTodoItemToDOM(itemObject) {
      let todoItem = createTodoItem(itemObject.name, itemObject.done);

      // Обработка кнопки "Готово"
      todoItem.doneButton.addEventListener("click", function () {
        todoItem.item.classList.toggle("list-group-item-success");
        itemObject.done = !itemObject.done;
        saveTodoList();
      });

      // Обработка кнопки "Удалить"
      todoItem.deleteButton.addEventListener("click", function () {
        if (confirm("Вы уверены?")) {
          todoItem.item.remove();
          todoArray = todoArray.filter(obj => obj.id !== itemObject.id); // Удаление из массива
          saveTodoList();
        }
      });

      todoList.append(todoItem.item);
    }

    // Восстанавливаем дела из localStorage
    todoArray.forEach(addTodoItemToDOM);

    // Валидация формы
    todoItemForm.input.addEventListener("input", function () {
      todoItemForm.button.disabled = !todoItemForm.input.value.trim();
    });

    // Обработка отправки формы
    todoItemForm.form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!todoItemForm.input.value.trim()) return;

      let newItemObject = {
        id: Date.now(), // Уникальный ID на основе времени
        name: todoItemForm.input.value.trim(),
        done: false,
      };

      todoArray.push(newItemObject); // Добавляем в массив
      addTodoItemToDOM(newItemObject); // Добавляем на страницу
      saveTodoList(); // Сохраняем в localStorage

      todoItemForm.input.value = "";
      todoItemForm.button.disabled = true;
    });
  }

  window.createTodoApp = createTodoApp;
})();
