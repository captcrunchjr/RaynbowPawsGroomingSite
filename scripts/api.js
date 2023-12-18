'use strict';

// const url = 'https://dogapi.dog/api/v2/facts';
const url = 'https://api.thedogapi.com/v1/images/search?limit=1&has_breeds=1&order=RAND';
const key = 'live_2vXeqKnoqKKqSFHdsygn6PB4Gur2TrgTYgCongK8tS0iVMGohzzwyooeYpxeooWV'

let apicard = document.querySelector('.apicard');
let breedTitle = document.querySelector('.breedtitle');
let apipic = document.querySelector('.apipic');
let apiimg = document.querySelector('.apiimg');
let breedInfo = document.querySelector('.breedinfo');
let wikilink = document.querySelector('.wikilink');
let height = document.querySelector('.height');
let weight = document.querySelector('.weight');
let temperament = document.querySelector('.temperament');
let origin = document.querySelector('.origin');
let lifespan = document.querySelector('.lifespan');
let button;
let errorDisplay = document.querySelector('.error');

window.addEventListener('load', getFact);

function urlBuilder(){

}

async function getFact(){
    try{
        let response = await fetch(url, {
            method: "GET",
            headers:{'x-api-key': key}
            });
        if(!response.ok){
            throw Error(`Error ${response.url} ${response.statusText}`);
        }
        const data = await response.json();
        if(data != null){
            displayDogFacts(data[0]);
        }
        else{
            throw Error('Could not fetch dog fact from API.');
        }
    } catch (error){
        //specific error info logged for dev purposes, front end error message is displayed
        console.log(error);
        apicard.classList.add('hide');
        errorDisplay.classList.remove('hide');
        let message = document.createElement('p');
        message.classList.add('errormsg');
        message.textContent = "Error loading from API";
        errorDisplay.append(message);
    }
}

function displayDogFacts(data){
    errorDisplay.classList.add('hide');
    apicard.classList.remove('hide');
    breedTitle.innerHTML = data.breeds[0].name;
    apiimg.src = data.url;
    height.innerHTML = "Height: " + data.breeds[0].height.imperial + " inches";
    weight.innerHTML = "Weight: " + data.breeds[0].weight.imperial + " pounds";
    temperament.innerHTML = "Temperament: " + data.breeds[0].temperament;
    lifespan.innerHTML = "Lifespan: " + data.breeds[0].life_span;

    if (button != null){
        button.remove();
    }

    button = document.createElement('button');
    button.classList.add('factbutton');
    button.textContent = 'New Fact!';

    apicard.append(button);
    button = document.querySelector('.factbutton');
    button.addEventListener('click', getFact);
}