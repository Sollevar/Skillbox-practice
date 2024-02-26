// Задача : создать выпадающий блок по нажатию кнопки, блок должен закрываться при нажатии в любом месте за его пределами (нельзя использовать stopPropagation)
const dropButton = document.querySelector(".drop-btn");
const dropBlock = document.querySelector(".block");

dropButton.addEventListener("click", function (event) {
  if (dropBlock.style.display === "block") {
    dropBlock.style.display = "none";
    console.log(event.active);
    return;
  }
  dropBlock.style.display = "block";
});

window.addEventListener("click", function (event) {
  let block = event.target.closest('.block'); // ищет родителя элемента block
  if (!block){
    dropBlock.style.display = "none";
  }
}, {capture:true});
