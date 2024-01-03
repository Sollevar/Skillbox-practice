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

    return {
      form,
      input,
      button,
    };
  }

  // создаем и возвращаем список элементов
  function createTodoList() {
    let list = document.createElement("ul");
    list.classList.add("list-group");
    return list;
  }

  function createTodoItem(name) {
    let item = document.createElement("li");
    let buttonGroup = document.createElement("div");
    let doneButton = document.createElement("button");
    let deleteButton = document.createElement("button");

    item.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );
    item.textContent = name;
    buttonGroup.classList.add("btn-group", "btn-group-sm");
    doneButton.classList.add("btn", "btn-success");
    doneButton.textContent = "Готово";
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.textContent = "Удалить";

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    // приложения нужен доступ к самому элементу и кнопкам, чтобы обрабатывать события нажатия
    return {
      item,
      doneButton,
      deleteButton,
    };
  }

  // массив дел
  let todoArray = [];

  function createTodoApp(container, title = "Cписок дел", listName) {
    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    todoItemForm.input.addEventListener("input", function () {
      if (todoItemForm.input.value === "") {
        todoItemForm.button.disabled = true;
      } else {
        todoItemForm.button.disabled = false;
      }
    });

    // передаем значения из localStorage
    let localData = localStorage.getItem(listName);
    let dataArray;
    // если localStorage не пуст то, отрисовываем его значение
    if (localData) {
      dataArray = JSON.parse(localData);
      for (let i = 0; i < dataArray.length; ++i) {
        let dataObject = dataArray[i];
        let data = Object.entries(dataObject);
        for (let [key, value] of data) {
          if (key === "name") {
            let dataItem = createTodoItem(value);
            todoList.append(dataItem.item);
          } 
        }
      }
    }

    todoItemForm.form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!todoItemForm.input.value) {
        return;
      }

      let todoItem = createTodoItem(todoItemForm.input.value);
      // Функция для хранения в localStorage
      function saveTodoList(array) {
        localStorage.setItem(listName, JSON.stringify(array));
      }

      // Создание обьектов в массиве
      let itemObject = {};
      itemObject.id = idGenerator(todoArray);
      // генерация id
      function idGenerator(array) {
        if (array.length === 0) {
          return 1;
        } else {
          let max = -1;
          for (let arrayItem of array) {
            let arrayObject = Object.entries(arrayItem);
            for (let [key, value] of arrayObject) {
              if (key === "id" && value > max) {
                max = value;
              }
            }
          }
          return max + 1;
        }
      }
      itemObject.name = todoItemForm.input.value;
      itemObject.done = false;

      todoItem.doneButton.addEventListener("click", function () {
        todoItem.item.classList.toggle("list-group-item-success");
        // меняем значение done
        if (itemObject.done === false) {
          itemObject.done = true;
          saveTodoList(todoArray);
        } else {
          itemObject.done = false;
          saveTodoList(todoArray);
        }
      });

      todoItem.deleteButton.addEventListener("click", function () {
        if (confirm("Вы уверены?")) {
          todoItem.item.remove();
          // ищем обьект в массиве с таким  же индексом и удаляем из массива
          for (let i = 0; i < todoArray.length; ++i) {
            let objectOfArray = todoArray[i];
            let arrayObject = Object.entries(objectOfArray);
            for (let [key, value] of arrayObject) {
              if (key === "id" && value === itemObject.id) {
                todoArray.splice(i, 1);
                saveTodoList(todoArray);
              }
            }
          }
        }
      });

      todoList.append(todoItem.item);

      todoItemForm.input.value = "";
      todoArray.push(itemObject);
      saveTodoList(todoArray);
    });
  }

  window.createTodoApp = createTodoApp;
})();
