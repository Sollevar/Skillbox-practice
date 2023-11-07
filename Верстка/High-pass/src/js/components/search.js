import { gsap } from "gsap";
let searchBtn = document.querySelector('.search-btn');
let searchClose = document.querySelector('.search__close');
let search = document.querySelector('.search');

searchBtn.addEventListener('click', function(){
    search.classList.add('search-active');
})

searchClose.addEventListener('click', function(){
    search.classList.remove('search-active');
})

var tl = gsap.timeline({paused:true});
    tl.fromTo(".search", {opacity:0, y:-100, ease: "circ.out", duration:0.3}, {opacity:1, y:0, duration:0.3,})

    searchBtn.onclick = function(){
        tl.play();
    }
    
    searchClose.onclick = function(){
        tl.reverse();
    }