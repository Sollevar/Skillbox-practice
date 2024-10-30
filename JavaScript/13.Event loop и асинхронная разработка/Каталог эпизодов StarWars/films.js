export function render(data) {
    const container = document.createElement('div');
    container.classList.add('container', 'd-flex', 'justify-content-between', 'flex-wrap', 'py-4');
    const films = data.results;
    let filmEpisode = 0;
    for (const film of films) {
        filmEpisode += 1;
        const card = document.createElement('div');
        const cardBody = document.createElement('div');
        const cardTitle = document.createElement('h5');
        const filmNumber = document.createElement('span');
        const detailLink = document.createElement('a');

        card.classList.add('card');
        card.style.width = '18%';
        card.style.marginBottom = '30px';
        cardBody.classList.add('card-body');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = film.title;
        filmNumber.style.color = 'blue';
        filmNumber.textContent = `Номер эпизода: ${filmEpisode}`;
        detailLink.classList.add('btn', 'btn-primary');
        detailLink.textContent = 'Подробнее';
        detailLink.href = `?filmEpisode=${filmEpisode}`;
        cardBody.append(filmNumber, cardTitle, detailLink)
        card.append(cardBody);
        container.append(card);
    }

    return container;
}