//Slider
const swiper = new Swiper('.swiper', {
  slidesPerView: 1,
  slidesPerGroup: 1,
  loop:true,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable:true,
  },

})
// Tabs
let tabsLink = document.querySelectorAll('.how__link');
let tabsTitle = document.querySelectorAll('.how__wrapper-title');
let tabsDescr = document.querySelectorAll('.how__wrapper-descr');
let tabsImg = document.querySelectorAll('.how__img');

tabsLink.forEach(function(element){
  element.addEventListener('click', function(e){
    const path = e.currentTarget.dataset.path;
    tabsLink.forEach(function(btn){
      btn.classList.remove('how__link--active')
    });
    e.currentTarget.classList.add('how__link--active');

    console.log(path);

    tabsTitle.forEach(function(el){el.classList.remove('how__wrapper--active')});
    let a = document.querySelectorAll(`[data-target="${path}"]`);
    a.forEach(function(el){
      el.classList.add('how__wrapper--active');
    })

    tabsDescr.forEach(function(el){el.classList.remove('how__descr--active')});
    document.querySelector(`[data-element="${path}"]`).classList.add('how__descr--active');

    tabsImg.forEach(function(el){el.classList.remove('how__img--active')});
    document.querySelector(`[data-img="${path}"]`).classList.add('how__img--active');


  })
})
// Accordion
new Accordion('.accordion-list', {
	elementClass: 'accordion',
	triggerClass: 'accordion__control',
	panelClass: 'accordion__content',
	activeClass: 'accordion--active'
});
// Burger
let burger = document.querySelector('.header__burger');
let menu = document.querySelector('.header__nav');
let menuLinks = document.querySelectorAll('.nav__item');

burger.addEventListener('click',
function(){
  burger.classList.toggle('burger--active');
  menu.classList.toggle('header__nav--active');
  document.body.classList.toggle('stop__scroll');
 }
)

menuLinks.forEach(function(link){
  link.addEventListener('click', function() {
  burger.classList.remove('burger--active');
  menu.classList.remove('header__nav--active');
  document.body.classList.remove('stop__scroll');
  });
})
// Search
let searchForm = document.querySelector('.search__form');
let searchLink = document.querySelector('.nav__search-link');
let searchClose = document.querySelector('.search__close');

searchLink.addEventListener('click', function(){
  searchForm.classList.add('search__form--active');
  searchLink.classList.add('nav__search--active');
})

searchClose.addEventListener('click', function(){
  searchForm.classList.remove('search__form--active');
  searchLink.classList.remove('nav__search--active');
})

