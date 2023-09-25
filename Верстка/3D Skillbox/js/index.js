let menu = document.querySelector(".nav__list")
let burger = document.querySelector(".header__burger")
let containerHeader = document.querySelector(".header__container")
let menuLinks = document.querySelectorAll(".nav__item")

burger.addEventListener('click',
function(){
    burger.classList.toggle('burger--active');
    menu.classList.toggle('menu--active');
    containerHeader.classList.toggle('header__container--active')
    document.body.classList.toggle('stop-scroll')
}
)
menuLinks.forEach(function(link) {
    link.addEventListener('click', 
    function(){
        burger.classList.remove('burger--active');
        menu.classList.remove('menu--active');
        containerHeader.classList.remove('header__container--active')
        document.body.classList.remove('stop-scroll')
    }
    ) 
});
