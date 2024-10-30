function loadResources(src) {
    // js
    if (src.endsWith('.js')) {
        return import(src);
    }

    // css
    if (src.endsWith('.css')) {
        const link = document.createElement('link');
        link.rel = "stylesheet";
        link.href = src;
        document.head.append(link); // ложим Link в DOM
        return new Promise(resolve => { // дожидаемся загрузки и потом отображаем стили
            link.addEventListener('load', () => {
                resolve();
            });
        });

    }

    //api
    return fetch(src).then(res => res.json()); // делаем запрос, после чего парсим json
}

const appContainer = document.getElementById('app');
function renderPage(moduleName, apiUrl, styleCss) {
    Promise.all([
        moduleName,
        apiUrl,
        styleCss,
    ].map(src => loadResources(src))).then(([pageModule, data]) => {
        appContainer.innerHTML = '';
        appContainer.append(pageModule.render(data));
        removeDefaultLink();
        const observer = new MutationObserver(() => { // наблюдатель за изменением DOM элементов
            removeDefaultLink(); // Вызов функции при изменении DOM
            observer.disconnect(); // Отключаем наблюдатель после выполнения
        });
        observer.observe(appContainer, { childList: true, subtree: true });
    });
}

function removeDefaultLink() {
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            history.pushState(null, '', link.href);
            appContainer.innerHTML = '';
            clearCss();
            handleRouteChange();
        })
    })
}

function handleRouteChange() {
    const searchParams = new URLSearchParams(location.search);
    const filmEpisode = searchParams.get('filmEpisode');
    if (filmEpisode) {
        renderPage('./film-detail.js', `https://swapi.dev/api/films/${filmEpisode}`, 'style.css');
    } else {
        renderPage('./films.js', 'https://swapi.dev/api/films', 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css');
    }
}

function clearCss() {
    const links = document.querySelectorAll('link[rel="stylesheet"]');
    links.forEach(link => link.remove());
}

window.addEventListener('DOMContentLoaded', () => {
    handleRouteChange();
    removeDefaultLink()
    window.addEventListener('popstate', handleRouteChange)
});



