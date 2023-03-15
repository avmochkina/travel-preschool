const burger = document.querySelector('.header__burger');
const menu = document.querySelector('.header__mobile-menu');
const menuItems = document.querySelectorAll('.header__menu-item_mobile');
const closeBurger = document.querySelector('.header__mobile-menu-close');
const popupButton = document.querySelectorAll('.popup__button');
const popup = document.querySelector('.popup');
const popupBox = document.querySelector('.popup__box');
const popupForms = popupBox.querySelectorAll('form');
const slider = document.querySelector('.destinations__list-wrapper');
const sliderList = slider.querySelector('.destinations__list');
const allSlides = document.querySelectorAll('.destinations__item');
const paginator = document.querySelector('.destinations__dots');
const allDots = document.querySelectorAll('.destinations__dots-item')
const activeDot = paginator.querySelector(`.destinations__dots-item_active`);
const USA = document.querySelector('#usa');
const japan = document.querySelector('#japan');
const spain = document.querySelector('#spain');
const buttonLeft = document.querySelector('.destinations__arrows-prev');
const buttonRight = document.querySelector('.destinations__arrows-next');


/*Burger-menu*/
burger.addEventListener('click', () => {
    menu.classList.add('opened');
    if (!menu.classList.contains('init')) {   
        menu.classList.add('init')
    }
    
    document.body.classList.add('shadow');
});

const closeBurgerMenu = () => {
    menu.classList.remove('opened');
    document.body.classList.remove('shadow');
} 

closeBurger.addEventListener('click', closeBurgerMenu)
 
menuItems.forEach((link) => {
    link.addEventListener("click", closeBurgerMenu);
}); 

document.body.addEventListener('click', (e) => {
    if(e.target.classList.contains('shadow') && menu.classList.contains('opened')) {
        menu.classList.remove('opened');
        document.body.classList.remove('shadow');
    } 
})

/*Pop-up*/
popupButton.forEach((i) => {
    i.addEventListener('click', () => {
        popup.classList.add('opened');
    })
});

popupForms.forEach((i) => {
    i.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(i);
        const res = [];

        for ([key, value] of formData) {
            res.push(`${key} : ${value}`);
        }

        alert(res.join('\n'))

        popup.classList.remove('opened');
        popupBox.classList.remove('_reg');
        
    })

})

popup.querySelectorAll('.form-toggle').forEach((i) => {
    i.addEventListener('click', (e) => {
        e.preventDefault();
        popupBox.classList.toggle('_reg');
    });
})


/*Slider*/
let activeSlide = slider.querySelector('.destinations__item.active');

const calcMove = (i) => {
    console.log(activeSlide.dataset.slide )
    if(+activeSlide.dataset.slide === 2) {
        sliderList.classList.add('move-right');
    }else if(+activeSlide.dataset.slide === 0) {
        sliderList.classList.add('move-left');
    }else if(+activeSlide.dataset.slide === 1) {
        sliderList.classList.remove('move-right');
        sliderList.classList.remove('move-left');
    }

}

function initSlider() {
    activeSlide = slider.querySelector('.destinations__item.active');
    calcMove(activeSlide.dataset.slide)
}

const goToSlide = (i) => {
    allSlides.forEach((slide) => {
        slide.classList.remove('active')
    })

    slider.querySelector(`.destinations__item[data-slide="${i}"]`).classList.add('active');

    allDots.forEach((dot) => {
        dot.classList.remove('destinations__dots-item_active')
    })
    paginator.querySelector(`.destinations__dots-item[data-index="${i}"]`).classList.add('destinations__dots-item_active');
    
    initSlider();
    calcMove();   
}

paginator.addEventListener('click', (e) => {
    const dot = e.target.closest('.destinations__dots-item');
    goToSlide(+dot.dataset.index);
});

buttonLeft.addEventListener('click', () => {
    const activeIndex = +activeSlide.dataset.slide;
    const nextIndex = activeIndex === 0 ? 0 : activeIndex - 1

    goToSlide(nextIndex);
}); 

buttonRight.addEventListener('click', () => {
    const activeIndex = +activeSlide.dataset.slide;
    console.log(activeIndex)
    const nextIndex = activeIndex === allSlides.length -1 ? allSlides.length -1 : activeIndex + 1
    console.log(nextIndex)
    goToSlide(nextIndex);
}); 
