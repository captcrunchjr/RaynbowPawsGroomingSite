"use strict";

const gallery = document.querySelector('.gallery');
gallery.addEventListener('click', openDisplay);

const backdrop = document.querySelector('.backdrop');
const imgarray = Array.from(document.querySelectorAll('.gallery-img'));

function openDisplay(e){
    if(e.target.tagName =='IMG'){
        document.getElementById('display').classList.toggle('hide');
        const bigimg = document.querySelector('.displayedimage').firstElementChild;
        bigimg.src = e.target.src;
    }
}

function hideDisplay(){
    document.getElementById('display').classList.toggle('hide');
}

backdrop.addEventListener('click', e => {
    if(e.target.tagName == 'DIV'){
        hideDisplay();
    }
})

document.addEventListener('keydown', e =>{
    let currentImgSrc = document.querySelector('.displayedimage').firstElementChild.src;
    let nextImg;
    if(e.key == 'Escape'){
        if(document.getElementById('display').classList.contains('hide')){
            return;
        }
        else{
            hideDisplay();
        }
    }
    if(e.key == 'ArrowRight'){
        imgarray.forEach(i =>{
            if(currentImgSrc === i.firstElementChild.src)
                {
                    let index = imgarray.indexOf(i);
                    let offset;
                    if(index == imgarray.length-1){
                        offset = (imgarray.length - 1) * -1;
                    }
                    else{
                        offset = 1;
                    }
                    nextImg = imgarray[index+offset].firstElementChild.src;
                    document.querySelector('.displayedimage').firstElementChild.src = nextImg;
                }
        })
    }
    if(e.key == 'ArrowLeft'){
        imgarray.forEach(i =>{
            if(currentImgSrc === i.firstElementChild.src)
                {
                    let index = imgarray.indexOf(i);
                    let offset;
                    if(index == 0){
                        offset = (imgarray.length - 1);
                    }
                    else{
                        offset = -1;
                    }
                    nextImg = imgarray[index+offset].firstElementChild.src;
                    document.querySelector('.displayedimage').firstElementChild.src = nextImg;
                }
        })
    }
});

const x = Array.from(document.getElementsByTagName('span'));
console.log(x);
x[1].addEventListener('click', hideDisplay);