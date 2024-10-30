export function render(data) {
    const container = document.createElement('div');
    const wrapper = document.createElement('div');
    const wrapperPlanets = document.createElement('div');
    const wrapperSpecies = document.createElement('div');

    const filmTitle = document.createElement('h1');
    const filmId = document.createElement('span');
    const btnBackToFilms = document.createElement('a');
    const filmInfo = document.createElement('p');

    const planetsTitle = document.createElement('h2');
    const planetsList = document.createElement('ul');

    const speciesTitle = document.createElement('h2');
    const speciesList = document.createElement('ul');

    container.classList.add('container');
    wrapper.classList.add('wrapper');
    filmTitle.classList.add('title');
    filmId.classList.add('number');
    filmInfo.classList.add('descr');
    btnBackToFilms.classList.add('back-link');
    planetsList.classList.add('list');
    speciesList.classList.add('list');

    function getData(dataUrls) { // делает запрос на каждый url и ждем ответ от всех
        return Promise.all(
            dataUrls.map(url => fetch(url).then(res => res.json()))
        )
    }

    const planetsPromise = getData(data.planets);
    const speciesPromise = getData(data.species);

    Promise.all([planetsPromise,speciesPromise]) // дожидаемся отрисовки planet и specie
                .then(([planets,species]) => {
                    // отрисовываем здесь, чтобы небыло пустых значений, пока подгружаются данные planet и specie
                    filmTitle.textContent = data.title;
                    filmId.textContent = data.episode_id;
                    btnBackToFilms.href = '/';
                    btnBackToFilms.textContent = 'Вернуться в каталог эпизодов';
                    filmInfo.textContent = data.opening_crawl;
                    planetsTitle.textContent = 'Список планет в эпизоде:';
                    speciesTitle.textContent = 'Список рас в эпизоде:';

                    planets.forEach(planet => {
                        const planetItem = document.createElement('li');
                        planetItem.classList.add('list-item');
                        const planetName = document.createElement('span');
                        planetName.textContent = planet.name;
                        planetItem.append(planetName);
                        planetsList.append(planetItem);
                    });

                    species.forEach(specie => {
                        const specieItem = document.createElement('li');
                        specieItem.classList.add('list-item');
                        const specieName = document.createElement('span');
                        specieName.textContent = specie.name;
                        specieItem.append(specieName);
                        speciesList.append(specieItem);
                    });

                    wrapperPlanets.append(planetsTitle, planetsList);
                    wrapperSpecies.append(speciesTitle, speciesList);
                    wrapper.append(wrapperPlanets, wrapperSpecies);
                    container.append(filmTitle, filmId, filmInfo, wrapper,btnBackToFilms);
                });

    return container;
}