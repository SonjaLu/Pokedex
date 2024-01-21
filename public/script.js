let count = 0;
let pokemons = [];
let loadFrom = 40;
let PokemonStarterCard = [];
let scrollable = true;
let names = [];
let currentPokemon;
let pokemonType;
let currentPokemonId = 1;
let progressValue = 50;
let maxStats = [250, 250, 250, 250, 250, 180]
let searchResults = [];
let typeSearchResult = [];
let typeSearched = false;
let loadFromTypesearch = 40;


async function loadAllPokemon() {
    for (i = 0; i < 1008; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}/`;
        let response = await fetch(url);
        let pokemon = await response.json();
        pokemons.push(pokemon);
        names.push(pokemons[i]['name']);
        renderFirst(i);
    }
}


function renderFirst(i){
    if (i > 39) {
        return;
    }
    render(i);
}


function renderMore(){
        for (let i = loadFrom; i < loadFrom + 6; i++) {
                render(i);
            }
        loadFrom += 6;
        
}

function render(index) {
    if (index < pokemons.length) {
        let name = pokemons[index]['name'];
        let id = pokemons[index]['id'];
        let image = pokemons[index]['sprites']['other']['official-artwork']['front_default'];
        let type1 = pokemons[index]['types'][0]['type']['name'];
        generateStarterCard(name, id, image, type1, index);
        getTypeForStarterCard(index);
    }
}

function getTypeForStarterCard(index) {
    let types = pokemons[index]['types'];
    for (let i = 0; i < types.length; i++) {
        let type = types[i]['type']['name'];
        let content = document.getElementById(`type-small${index}`);
        content.innerHTML += `
<div class="type-small${type}" id="${type}${index}">
    ${type}
    </div>`;

    }
}

function resetPokedexMargin() {
    let pokedex = document.getElementById('pokedex');
    if (pokedex) {
        pokedex.style.Top = "60%"; 
        pokedex.classList.remove('margin-adjusted');
    }
}

function renderCard(index) {
    
    document.getElementById('pokedex').classList.remove('d-none');
    let name = pokemons[index]['name'];
    let id = pokemons[index]['id'];
    let image = pokemons[index]['sprites']['other']['official-artwork']['front_default'];
    let type1 = pokemons[index]['types'][0]['type']['name'];
    let height = pokemons[index]['height'];
    let weight = pokemons[index]['weight'];
    let bex = pokemons[index]['base_experience'];
    let stats = pokemons[index]['stats'];
    generatePokemonCard(index, name, id, image, type1, height, weight, bex, stats);
    getMoves(index);
    getAbilities(index);
    document.getElementById('around').style.filter = 'blur(8px)';
    document.getElementById('overlay').style.display = 'block';
}


function openMoves() {
    let moves = document.getElementById('moves');
    let pokedex = document.getElementById('pokedex');

    if (moves) {
        moves.classList.remove('d-none');
    }

  
}


function closeBox() {
    document.getElementById('opencard').classList.add('d-none');
    document.getElementById('around').classList.remove('opac');
    let pokedex = document.getElementById('pokedex');
    let moves = document.getElementById('moves');
  

    if (moves) {
        moves.classList.add('d-none');
    }
    document.getElementById('around').style.filter = 'none';
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('pokedex').classList.add('d-none');
}

function checkHidden(index, i) {
    if (pokemons[index]['abilities'][i]['is_hidden'] == true) {
        return `hidden`;
    }
}



function checkStatsWidth(index){
    for (let i = 0; i < 6; i++) {
        let bar = document.getElementById(`color-bar${i}`);
    let stat = pokemons[index]['stats'][i]['base_stat'];
    let correctBar = stat/maxStats[i] * 100;
    bar.style.width = `${correctBar}px`;
    }
    let totalbar = document.getElementById(`color-bar6`);
    let totalbarC = sum/780 * 100;
    totalbar.style.width = `${totalbarC}px`;
}

function getSum(stats){
    sum = 0;
    for (let i = 0; i < stats.length; i++) {
        let stat = stats[i]['base_stat'];
        sum += stat;
    }
    return sum;
}

window.onscroll = function() {infiniteScroll()
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        renderMore();
    }
}



function infiniteScroll() {
    let content = document.getElementById('overview');
    let containerHeight = content.scrollHeight;
    if ((document.documentElement.scrollTop + innerHeight - 120) == containerHeight && scrollable == true) {
        renderMore();
    }
}


function getMoves(index) {
    let moves = pokemons[index]['moves'];
    let content = document.getElementById('moves');
    content.innerHTML = "";
    for (let i = 0; i < moves.length; i++) {
        let move = moves[i]['move']['name'];
        content.innerHTML += `<span>${move}</span>`;
    }
}


function getAbilities(index) {
    let abilities = pokemons[index]['abilities'];
    let content = document.getElementById('moves');
    
    if (!content) {
        console.error('Element mit ID "ability-content" nicht gefunden');
        return;
    }

    content.innerHTML = "";
    for (let i = 0; i < abilities.length; i++) {
        let abil = abilities[i]['ability']['name'];
        content.innerHTML += `<span class="ability-close ${checkHidden(index, i)}">${abil}</span>`;
    }
}

function searchByName() {
    let input = document.getElementById('search-input').value;
    scrollable = false;
    typeSearched = false;
    clear();
    searchResults = [];
    if (input.length == 1) {
        pushOneLetterSearch(input);
        renderSearchResults();
        backToStart();
    }
    else {
        searchResults = [];
        pushTwoLettersSearch(input);
        renderSearchResults();
        backToStart();
        if (input.length == 0) {
        }
    }
}

function renderSearchResults(){
    for (let i = 0; i < searchResults.length; i++) {
        let result = searchResults[i];
        render(result);  
    }
    document.documentElement.scrollTop = 0;
}

function pushOneLetterSearch(input){
    for (let i = 0; i < names.length; i++) {
        let pokeName = names[i];
        let letter = pokeName.charAt(0);
        if (input == letter) {
            searchResults.push(i)
        }
    }
}


function pushTwoLettersSearch(input){
    for (let i = 0; i < names.length; i++) {
        pokeName = names[i];
        let firstLetter = pokeName.charAt(0);
        let secondLetter = pokeName.charAt(1);
        if (input.charAt(0) == firstLetter && input.charAt(1) == secondLetter) {
            searchResults.push(i)
        }
    }
}


function allowEnter(){
    let input = document.getElementById(`search-input`);
    input.addEventListener('keypress', function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById(`goto-button`).click();
      }});
}


function clear(){
let content = document.getElementById('overview');
content.innerHTML = ``;
}

function backToStart() {
    document.getElementById('restart').classList.remove('d-none');
    
}

function refresh() {
    clear();
    loadAllPokemon();
}