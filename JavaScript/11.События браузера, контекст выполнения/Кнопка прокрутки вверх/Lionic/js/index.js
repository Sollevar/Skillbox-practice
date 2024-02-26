let burger = document.querySelector('.burger');
let menu = document.querySelector('.header__nav');
let menuLinks = document.querySelectorAll('.nav__link')

burger.addEventListener('click',
    function () {
        burger.classList.toggle('burger--active');
        menu.classList.toggle('header__nav--active');
        document.body.classList.toggle('stop-scroll');
    })

menuLinks.forEach(function (element) {
    element.addEventListener('click', function () {
        burger.classList.remove('burger--active');
        menu.classList.remove('header__nav--active');
        document.body.classList.remove('stop-scroll');
    })
})

const btnMore = document.querySelector('.articles__more');
const articlesItem = document.querySelectorAll('.articles__item');

btnMore.addEventListener('click', function() {
    articlesItem.forEach(function(el) {el.classList.add('articles__item--visible')});
    btnMore.closest('.articles__center').classList.add('articles__center--hidden');
});

// Задание из практики по Js 
// нужно создать кнопку плавной прокрутки к верху страницы
const scrollButton = document.querySelector('.scroll-top');
window.addEventListener('scroll', () => {
    let topOffset = window.scrollY; // получаем отступ сверху
    if(topOffset >= 100){
        scrollButton.style.display = 'block';
    } else{
        scrollButton.style.display = 'none';
    }

},{passive:true});

scrollButton.addEventListener('click', ()=>{
    window.scrollTo({top:0,behavior:'smooth'});
})


