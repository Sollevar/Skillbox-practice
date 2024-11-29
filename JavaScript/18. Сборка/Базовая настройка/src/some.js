import mainImg from './assets/images/background.jpg'; // будет содержаться путь до картинки
import './styles/style.scss';
const main = document.createElement('main');
const container = document.createElement('div');
const button = document.createElement('button');
const mainImage = document.createElement('img');
mainImage.src = mainImg;
mainImage.alt = 'Основное изображение';
button.classList.add('btn');
button.textContent = 'Привет друг!';
button.addEventListener('click', () => {
    alert('Привет');
});
container.classList.add('body__container')
container.append(mainImage, button);
main.append(container);
export default main;