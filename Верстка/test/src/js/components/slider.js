import Swiper, {Pagination } from 'swiper';

Swiper.use([Pagination]);

const postsSlider = new Swiper('.posts__slider', {

  slidesPerView:1,
  spaceBetween:1,
  
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

})