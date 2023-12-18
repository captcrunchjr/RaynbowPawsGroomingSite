'use strict'
//carousel script

const leftBtn = document.querySelector('.left');
const rightBtn = document.querySelector('.right');

const carouselItems = Array.from(document.querySelectorAll('.carousel-item'));
const navItems = Array.from(document.querySelectorAll('.nav-item'));
const CAROUSEL_SIZE = carouselItems.length;

leftBtn.addEventListener('click', swipe);
rightBtn.addEventListener('click', swipe);

function swipe(e){
    const currentCarouselItem = document.querySelector('.carousel-item.active');
    const currentIndex = carouselItems.indexOf(currentCarouselItem);
    let nextIndex;

    if(e.currentTarget.classList.contains('left')){
        if(currentIndex === 0){
            nextIndex = CAROUSEL_SIZE - 1;
        }
        else{
            nextIndex = currentIndex - 1;
        }
    }
    else{
        if(currentIndex === CAROUSEL_SIZE - 1){
            nextIndex = 0;
        }
        else{
            nextIndex = currentIndex + 1;
        }

    }

    carouselItems[nextIndex].classList.add('active');
    navItems[nextIndex].classList.add('active');
    currentCarouselItem.classList.remove('active');
    navItems[currentIndex].classList.remove('active');
}

const nav = document.querySelector('.carousel-nav');
nav.addEventListener('click', changeImage);

function changeImage(e){
    if(e.target.classList.contains('nav-item')){
        const currentTarget = e.target;
        if(currentTarget.classList.contains('active')){
            return;
        }
        else{
            navItems.forEach(e =>{
                e.classList.remove('active');
            })
            currentTarget.classList.add('active');
            const targetIndex = navItems.indexOf(currentTarget);
            
            carouselItems.forEach(element => {
                element.classList.remove('active');
            });
            carouselItems[targetIndex].classList.add('active');
        }
    }
}