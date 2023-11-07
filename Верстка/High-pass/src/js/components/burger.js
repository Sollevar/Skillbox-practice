let burgerBtn = document.querySelector('.burger');
let burgerNav = document.querySelector('.nav__list');
let burgerPhone = document.querySelector('.header__phone');
let navItems = document.querySelectorAll('.nav__item')

burgerBtn.addEventListener('click', function(){
    burgerNav.classList.toggle('nav-active');
    burgerPhone.classList.toggle('phone-active');
    burgerBtn.classList.toggle('burger-active');
})

navItems.forEach(function(e){
    e.addEventListener('click', function(){
        burgerNav.classList.remove('nav-active');
        burgerPhone.classList.remove('phone-active');
        burgerBtn.classList.remove('burger-active');
    })
})

