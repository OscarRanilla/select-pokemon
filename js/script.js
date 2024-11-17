const divContainer = document.querySelector('.container');
const btnPokemon =document.getElementById('get-pokemon')
const pokemonSelect = document.getElementById("pokemon-select");



//Vamos a añadir algunos Pokemón más
function trerLista_Pokemon(){
    //vamos a traernos 20 más
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`).then((response)=>{
        if (!response.ok){
            throw new Error ('La solicitud no fue exitosa');
        }
        return response.json();
    })
    .then((listaPokemon)=>{
   
   //añadimos en un array los elemento que ya existen en el index.html para no volver a añadirlos
    const listElement =['bulbasaur','charmander','squirtle'];
    listaPokemon.results.forEach(pokemon => {
    //vamos a evaluar que no esten los que ya tenemos en el index.html
    if (!listElement.includes(pokemon.name)){
       // console.log(pokemon.name);
       //creamos el optión 
        const option = document.createElement('option');
        option.text = pokemon.name;
        option.value = pokemon.name;

      //Lo añadimos al select
        pokemonSelect.add(option);

    }
});
   
    })
}

trerLista_Pokemon();
///===============================


function traerPokemon(pokSelect){
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokSelect}`).then((response)=>{
        if (!response.ok){
            throw new Error ('La solicitud no fue exitosa');
        }
        return response.json();
    })
    .then((pokemon)=>{
        //console.log(pokemon);
    mostrarPokemon(pokemon)
    })
}

function mostrarPokemon(pokemon){
    //mostrar la información en pantalla del Pokémon, incluyendo su nombre, imagen, tipo, altura y peso.
  
     //Limpiamos el div que contiene el pokemon
  

    //Vamos a eliminar el div (divPokemon) si existe para añadir uno nuevo
    const divRemove =document.querySelector('.divPokemon'); 
    if (divRemove){
        divRemove.remove();
    }
   
    // Creamos un div para mostrar el Pokemon 
    const divPokemon=document.createElement('div');
    divPokemon.classList.add('divPokemon')
    
     ///===============IMAGEN
    //=====================
     //Div para la imagen
    const divImg =document.createElement('div');
    divImg.classList.add('divImg');

    
    //Creamos un elemento imagen
    const imgPokemon =document.createElement('img');
    imgPokemon.src=pokemon.sprites.other.dream_world.front_default
    divImg.appendChild(imgPokemon);
    //añadimos en el div imagen la imagen del pokemon
    divPokemon.appendChild(divImg);
    ///**********************IMAGEN
    //=====================



    //=============INFORMACIÓN
    //========================
    const divInf =document.createElement('div');
    divInf.classList.add('divInf');

    //Nombre del pokemon
    const nomPokemon=document.createElement('p');
    nomPokemon.textContent=`Nombre: ${pokemon.name}`

    //tipo pokemon
    const tipoPokemon=document.createElement('p');
    tipoPokemon.textContent=`Tipo: ${pokemon.types[0].type.name}`

    //altura del pokemon
    const altPokemon=document.createElement('p');
    altPokemon.textContent=`Altura: ${pokemon.height}`;

    //peso pokemon
    const pesoPokemon=document.createElement('p');
    pesoPokemon.textContent=`Peso: ${pokemon.weight}`; 

    //Añdimos los párrafos al div de información
    divInf.appendChild(nomPokemon);
    divInf.appendChild(tipoPokemon);
    divInf.appendChild(altPokemon);
    divInf.appendChild(pesoPokemon);

    divPokemon.appendChild(divInf);

     ///**********************INFORMACIÓN
     //==================================

    //Por último añadimos el div container al conetenedor
    divContainer.appendChild(divPokemon);
}




//Botón para consultar el Pokemón
btnPokemon.addEventListener('click',()=>{
    let pokSelect =document.getElementById('pokemon-select').value;

    //console.log(document.getElementById('pokemon-select').value);
    traerPokemon(pokSelect)
})