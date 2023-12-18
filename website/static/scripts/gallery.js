"use strict";

const gallery = document.querySelector('.gallery');
gallery.addEventListener('click', openDisplay);

const backdrop = document.querySelector('.backdrop');

function openDisplay(e){
    console.log(e.target);
    if(e.target.tagName =='IMG'){
        console.log(e.target.src);
        document.getElementById('display').classList.toggle('hide');
        const bigimg = document.querySelector('.displayedimage').firstElementChild;
        console.log(bigimg);
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
    if(e.key == 'Escape'){
        if(document.getElementById('display').classList.contains('hide')){
            return;
        }
        else{
            hideDisplay();
        }
    }
});

const x = Array.from(document.getElementsByTagName('span'));
x[0].addEventListener('click', hideDisplay);