export function render(data){
    console.log(data)
    const cardsContainer = document.createElement('div');
    const card = document.createElement('div');
    const cardbody = document.createElement('div');
    const cardTitle = document.createElement('h5');
    const cardDescr = document.createElement('p');
    const cardLink = document.createElement('a');

    card.style.width = '100%';
    card.style.marginBottom = '30px';
    card.classList.add('card');
    cardbody.classList.add('card-body');
    cardTitle.classList.add('card-title');
    cardDescr.classList.add('card-text')
    cardLink.classList.add('card-link');
    cardTitle.textContent = data.title;
    cardDescr.textContent = data.body;
    cardLink.textContent = 'Назад';
    const urlBack = location.origin;
    cardLink.href = `${urlBack}`;
    cardbody.append(cardTitle,cardDescr,cardLink);
    card.append(cardbody);
    cardsContainer.append(card);

    return cardsContainer;
}