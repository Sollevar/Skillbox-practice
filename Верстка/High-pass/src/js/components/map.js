import { gsap } from "gsap";
let mainMap = document.querySelector('.map');
function init() {
  var myMap = new ymaps.Map(mainMap, {
    center: [55.76215904013109, 37.62676249999996],
    zoom: 14
  });
  var myPlacemark = new ymaps.Placemark([55.77043274361835, 37.63613176592329], {}, {
    iconLayout: 'default#image',
    iconImageHref: 'images/mapIcon.svg',
    iconImageSize: [12, 12],
    iconImageOffset: [38, 12]
  });

  myMap.controls.remove('geolocationControl'); // удаляем геолокацию
  myMap.controls.remove('searchControl'); // удаляем поиск
  myMap.controls.remove('trafficControl'); // удаляем контроль трафика
  myMap.controls.remove('typeSelector'); // удаляем тип
  myMap.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
  myMap.controls.remove('zoomControl'); // удаляем контрол зуммирования
  myMap.controls.remove('rulerControl'); // удаляем контрол правил
  //  myMap.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)

  myMap.geoObjects.add(myPlacemark);
}

ymaps.ready(init);

let mapBtn = document.querySelector('.map__btn'); 
let mapBtnOpen = document.querySelector('.info-open');

mapBtn.addEventListener('click', function(){
  mapBtnOpen.classList.add('info-active');
})

mapBtnOpen.addEventListener('click', function(){
  mapBtnOpen.classList.remove('info-active');
})

var maptl = gsap.timeline({paused:true});
    maptl.fromTo(".map__info", {opacity:1, y:0, ease: "circ.out",  autoAlpha: 1}, {opacity:0, y:100, duration:0.3, autoAlpha: 0})
    maptl.fromTo(".info-open", {opacity:0, y:100, ease: "circ.out"}, {opacity:1, y:0, duration:0.3,})

    mapBtn.onclick = function(){
      maptl.play();
    }

    mapBtnOpen.onclick = function(){
      maptl.reverse();
    }



