const pokemonContainer = document.querySelector('#pokemonContainer')
const modalContainer = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-container');
const pokemonNumber = 400;
const pokemonData = [];


// create a function which uses fetch to call the pokemon API
const getPokemon = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    createPokemonCard(data);
}

// create a fetch function, to loop through a for loop. Going to call getPokemon() to get the id from 1 - 150
const fetchPokemons = async () => {
    for (let i=1; i <= pokemonNumber; i++){
        await getPokemon(i)
    }
};

// create a new function. Inside it create a new div with class. link it with innerHtml. 
const createPokemonCard = (pokemon) => {
    const pokemonEl = document.createElement('newDiv');
    pokemonEl.classList.add('pokemon');
    const {id, name, sprites, types } = pokemon;
    const type = types[0].type.name;
    const pokemonInnerHtml = `
    <div class='img-container'>
    <img src='${sprites.front_default}' alt='${name}'/>
    </div>
    <div class='info'>
        <span class='number'>${id}</span>
        <h3 class='name'>${name}</h3>
        <small class='type'>Type: <span>${type}</span></small>
    </div>
    `;
    pokemonEl.innerHTML = pokemonInnerHtml;
    pokemonEl.addEventListener('click', function(e) {
        modalContainer.classList.add('show-modal');
        const {weight, abilities, height } = pokemon;
        console.log(pokemon, 'pokey')
        const ability = abilities[0].ability.name;
        const pokemonInnerHtml2 = `
        <div class='img-container'>
        <img src='${sprites.front_default}' alt='${name}'/>
        </div>
    <div class='info'>
        <span class='number'>${id}</span>
        <h3 class='name1'>${name}</h3>
    </div>
        <div class='info2'>
        <div class='type'>Type: <span>${type}</span></div>
        <div class='height'>Height: ${height}</div>
        <div class='weight'>Weight: ${weight}</div>
        <div class='ability'>Abilities: ${ability}</div>
        </div>
    </div>
        `
        modalContent.innerHTML= pokemonInnerHtml2;
    })
    pokemonData.push(pokemonEl);
    pokemonContainer.appendChild(pokemonEl)
}

// event listener on the modal, so when you click the modal it will go back to the original webpage
modalContainer.addEventListener('click', (e) => {
    if(e.target.classList.contains('modal')) modalContainer.classList.remove('show-modal');
})
 
// create an event listener that listens to typing which will narrow down the pokemon to to match the value inside input.
const input = document.querySelector('input');
input.addEventListener('input', (e) => {    
    const filtered = pokemonData.filter(data => {
        return data.innerText.includes(e.target.value);
    })
    pokemonContainer.innerHTML = '';
    filtered.forEach(pokemon => {
        pokemonContainer.appendChild(pokemon);
    })
})
fetchPokemons();



