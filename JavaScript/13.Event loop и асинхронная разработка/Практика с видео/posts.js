export function render(data){
    const cardsContainer = document.createElement('div');
    cardsContainer.classList.add('container','d-flex','justify-content-between','flex-wrap','py-4');
    for (const post of data) {
        const card = document.createElement('div');
        const cardbody = document.createElement('div');
        const cardTitle = document.createElement('h5');
        const cardDescr = document.createElement('p');
        const cardLink = document.createElement('a');

        card.style.width = '18%';
        card.style.marginBottom = '30px';
        card.classList.add('card');
        cardbody.classList.add('card-body');
        cardTitle.classList.add('card-title');
        cardDescr.classList.add('card-text')
        cardLink.classList.add('card-link');
        cardTitle.textContent = post.title;
        cardDescr.textContent = post.body;
        cardLink.textContent = 'Подробнее';
        cardLink.href = `?PostId=${post.id}`
        cardbody.append(cardTitle,cardDescr,cardLink);
        card.append(cardbody);
        cardsContainer.append(card);
    }
    return cardsContainer;
}