let stars = document.querySelectorAll('.feedback__star');
stars.forEach(function(e){
    e.addEventListener('click', () => {
        e.parentNode.dataset.totalStar = e.dataset.star;
    })
})