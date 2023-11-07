import JustValidate from 'just-validate';
const validator = new JustValidate('.feedback__form');
validator
  .addField(document.querySelector('.input-name'), [
    {
      rule: 'required',
      value:true,
      errorMessage: 'Вы не ввели имя',
    },
  ])
  .addField(document.querySelector('.input-email'), [
    {
      rule: 'required',
      value:true,
      errorMessage: 'Вы не ввели e-mail',
    },
    {
      rule: 'email',
    },
  ])
