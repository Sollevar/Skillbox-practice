//Анимация главного экрана
gsap.fromTo(".hero__title",
    {   opacity:0,
        y:50,
        ease: "expo.out",
    },
    {
        opacity:1,
        duration:0.7,
        delay:0.3,
        y:0
    }
);

gsap.fromTo(".hero__btn",
    {   opacity:0,
        y:50,
        ease: "expo.out",
    },
    {
        opacity:1,
        duration:0.7,
        delay:0.3,
        y:0
    }
);

gsap.fromTo(".hero__descr",
    {   opacity:0,
        ease: "expo.out",
    },
    {
        opacity:1,
        duration:1,
        delay:0.7,
    }
);

gsap.fromTo(".img-1",
    {   opacity:0,
        ease: "expo.out",
    },
    {
        opacity:1,
        duration:1,
        delay:1,
    }
);

gsap.fromTo(".img-2",
    {   opacity:0,
        ease: "expo.out",
    },
    {
        opacity:1,
        duration:1,
        delay:1.2,
    }
);

gsap.fromTo(".img-3",
    {   opacity:0,
        ease: "expo.out",
    },
    {
        opacity:1,
        duration:1,
        delay:1.4,
    }
);

gsap.fromTo(".photos__author",
    {   opacity:0,
        ease: "expo.out",
    },
    {
        opacity:1,
        duration:1,
        delay:1.6,
    }
);

// Анимация меню

let burger = document.querySelector('.burger');
let menu = document.querySelector('.menu');
let menuClose = document.querySelector('.close');

burger.addEventListener('click', function(){
    menu.classList.add('menu--open');
})

menuClose.addEventListener('click', function(){
    menu.classList.remove('menu--open');
})




var tl = gsap.timeline({paused:true});
tl.fromTo(".menu", {opacity:0, ease: "circ.out"}, {opacity:1,duration:0.3,})
  .fromTo(".menu__top", {opacity:0, y:-100, ease: "circ.out"}, {opacity:1, y:0, duration:0.5,})
  .fromTo(".menu__container", {opacity:0, y:50, ease: "circ.out"}, {opacity:1, y:0, duration:0.5,})
  .fromTo(".menu__nav", {opacity:0, y:20, ease: "circ.out"}, {opacity:1, y:0, duration:0.5,})
  .fromTo(".social", {opacity:0, y:20, ease: "circ.out"}, {opacity:1, y:0, duration:0.5,})
  .fromTo(".menu__right", {opacity:0, y:20, ease: "circ.out"}, {opacity:1, y:0, duration:0.5,}, "-=0.5");
  
  

burger.onclick = function(){
    tl.play();
}

menuClose.onclick = function(){
    tl.reverse();
}
