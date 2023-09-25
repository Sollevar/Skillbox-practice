const element = document.querySelector('#selectCustom');
const choices = new Choices(element, {
  searchEnabled: false,
  allowHTML: true,
  itemSelectText: '',
});
// yandex map
ymaps.ready(init);
function init() {
  // Создание карты.
  var myMap = new ymaps.Map("map", {
    // Координаты центра карты.
    // Порядок по умолчанию: «широта, долгота».
    // Чтобы не определять координаты центра карты вручную,
    // воспользуйтесь инструментом Определение координат.
    center: [48.5112, 2.2055],
    // Уровень масштабирования. Допустимые значения:
    // от 0 (весь мир) до 19.
    zoom: 9
  });
  var myPlacemark = new ymaps.Placemark([48.8534100, 2.3488000], {}, {
    iconLayout: 'default#image',
    iconImageHref: 'Images/mapIcon.svg',
    iconImageSize: [28, 40],
    iconImageOffset: [-3, -42]
  });

  // Размещение геообъекта на карте.
  myMap.geoObjects.add(myPlacemark);
}

//feedback
var selector = document.querySelector("input[type='tel']");
var im = new Inputmask("+7(999)-999-99-99");
im.mask(selector);
const validator = new JustValidate(document.querySelector('.feedback'));

validator
  .addField(document.querySelector('#basic_name'), [
    {
      rule: 'required',
      value:true,
      errorMessage: 'Вы не ввели имя',
    },
    {
      rule: 'minLength',
      value: 3,
    },
    {
      rule: 'maxLength',
      value: 20,
    },
  ])
  .addField(document.querySelector('#basic_email'), [
    {
      rule: 'required',
      value:true,
      errorMessage: 'Вы не ввели e-mail',
    },
    {
      rule: 'email',
    },
  ])
  .addField(document.querySelector('#basic_phone'), [
    {
      rule: 'required',
      value:true,
      errorMessage: 'Вы не ввели телефон',
    },
    {
      rule: 'number',
    },
    {
      rule:'function',
      validator:  function(){
        const phone = selector.inputmask.unmaskedvalue();
        return phone.length === 10;
      },
    },
  ])
