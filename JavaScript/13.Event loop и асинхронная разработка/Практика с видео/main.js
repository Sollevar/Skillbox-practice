const cssPromises = {};

function loadResources(src) {
    //js
    if (src.endsWith('.js')) {
        return import(src);
    }
    //css
    if (src.endsWith('.css')) {
        if (!cssPromises[src]) {
            const link = document.createElement('link');
            link.rel = "stylesheet";
            link.href = src;
            cssPromises[src] = new Promise(resolve => {
                link.addEventListener('load', () => {
                    resolve();
                })
            });
            document.head.append(link);
        }

        return cssPromises[src];
    }

    //api
    return fetch(src).then(res => res.json());
}

const appContainer = document.getElementById('app');
const searchParams = new URLSearchParams(location.search);
const postId = searchParams.get('PostId')
function renderPage(moduleName,apiUrl,styleCss){
    Promise.all([
        moduleName,
        apiUrl,
        styleCss,
    ].map(src => loadResources(src))).then(([pageModule,data]) => {
        appContainer.innerHTML = '';
        appContainer.append(pageModule.render(data));
    });
}
if (postId) {
    renderPage('./post-detail.js',`https://gorest.co.in/public/v2/posts/${postId}`,'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css')
} else {
    renderPage('./posts.js','https://gorest.co.in/public/v2/posts','https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css')
}



