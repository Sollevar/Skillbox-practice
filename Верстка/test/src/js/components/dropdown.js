const optionMenu = document.querySelector(".books"),
       selectBtn = optionMenu.querySelector(".book-current"),
       options = optionMenu.querySelectorAll(".book-item"),
       sBtn_text = optionMenu.querySelector(".book__select");

selectBtn.addEventListener("click", () => optionMenu.classList.toggle("books-active"));       

options.forEach(option => {
    option.addEventListener("click", ()=>{
        let selectedOption = option.querySelector(".book-name").innerText;
        sBtn_text.innerText = selectedOption;
        optionMenu.classList.remove("books-active");
    });
});