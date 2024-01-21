function generateStarterCard(name, id, image, type1, index) {
    let content = document.getElementById('overview');
    content.innerHTML += `
                            <div class="card ${type1}" onclick="renderCard(${index})" id="card${index}">
                            <div class="smallCard">
                                    <span class="smallCardNumber"># ${id}</span>
                                    <span class="smallCardName">${name}</span>
                                    <div class="type-icon" id="type-small${index}">
                                    </div>
                            </div>
                            <div class="smallCardImg">
                                <img src="${image}" alt=""></img>
                            </div>
                        </div> 
                    `;
}

function generatePokemonCard(index, name, id, image, type1, height, weight, bex, stats) {
    document.getElementById('pokedex').classList.toggle('d-none');
   
    let content = document.getElementById('pokedex');
    content.innerHTML = '';
    content.innerHTML += `
    <div class="${type1}" id="opencard"><h1 id="pokemonName">${name} # ${id} </h1><br>
                   
   <img id="pokImg" src="${image}"></img>
   <div><span class="startertype-${type1}">${type1}</span>  ${getMoreThanOneTypes(index)}<br><br>
                   <span>${(height / 10)} m</span><br>
                    <span>${(weight / 10)} kg</span><br>
                  <span>${bex} base-xp</span>
               </div>
               <div class="info-container">
             <div class="basestats-headline-box">
   <span>Base Stats</span>

<div class="stats-table">
   <div class="stat-name">
       <p>hp</p>
       <p>attack</p>
       <p>defense</p>
       <p>special-attack</p>
       <p>special-defense</p>
       <p>speed</p><br>
       <p><b>total</b></p>
   </div>
   <div class="stat-number">
       <p>${stats[0]['base_stat']}</p>
       <p>${stats[1]['base_stat']}</p>
       <p>${stats[2]['base_stat']}</p>
       <p>${stats[3]['base_stat']}</p>
       <p>${stats[4]['base_stat']}</p>
       <p>${stats[5]['base_stat']}</p><br>
       <p><b>${getSum(stats)}</b></p>
   </div>
   <div class="stat-bar">
       <div class="bar"><div class="color-bar${type1}" id="color-bar0"></div></div>
       <div class="bar"><div class="color-bar${type1}" id="color-bar1"></div></div>
       <div class="bar"><div class="color-bar${type1}" id="color-bar2"></div></div>
       <div class="bar"><div class="color-bar${type1}" id="color-bar3"></div></div>
       <div class="bar"><div class="color-bar${type1}" id="color-bar4"></div></div>
       <div class="bar"><div class="color-bar${type1}" id="color-bar5"></div></div><br>
       <div class="bar"><div class="color-bar bg-total-bar" id="color-bar6"></div></div>
   </div>
   </div>
<div class="basestats-box">
<button onclick="openMoves()" id="btn-moves">Moves & Abilities</button>
<button class="close-btn" onclick="closeBox()">Close</button>
<div id="moves" class="shownMovesBox d-none"
<span><b>Moves</b></span>
<span><b>Abilities</b></span>
<div class="closeup-abilities" id="ability-content">
</div></div>

</div>
</div>
`;
checkStatsWidth(index);
}

function getMoreThanOneTypes(index) {
    let types = pokemons[index]['types'];
    if (types.length == 2) {
        return `<span class="startertype-${types[1]['type']['name']}-lighter">${types[1]['type']['name']}</span>
        `;
    }
    if (types.length == 3) {
        return `<span class="startertype-${types[1]['type']['name']}-lighter">${types[1]['type']['name']}</span>
        <span class="class="startertype-${types[2]['type']['name']}-lighter">${types[2]['type']['name']}</span>
        `;
    }
    else {
        return ``;
    }
}