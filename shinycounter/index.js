let contador = document.getElementById('contador').value
let nomePokemon;


function createXHR() {
    let contador = 0;
    const colors = {
      'bug': '#A8B820',
      'dark': '#705848',
      'dragon': '#7038F8',
      'electric': '#F8D030',
      'fairy': '#EE99AC',
      'fighting': '#C03028',
      'fire': '#F08030',
      'flying': '#A890F0',
      'ghost': '#705898',
      'grass': '#78C850',
      'ground': '#E0C068',
      'ice': '#98D8D8',
      'normal': '#A8A878',
      'poison': '#A040A0',
      'psychic': '#F85888',
      'rock': '#B8A038',
      'steel': '#B8B8D0',
      'water': '#6890F0',
  };
    const xhr = new XMLHttpRequest();
    let nomePokemon = document.getElementById('nomePokemon').value.toLowerCase();

    document.body.onkeyup = function(e) {
      if (e.key == " " ||
          e.code == "Space"   
      ) {
        contador++
        document.getElementById('contador').innerText = contador
        window.localStorage.setItem(nomePokemon, contador)
      }
      else if (e.key == "Shift" ||
          e.code == "ShiftLeft"           
      ) {
        contador--
        document.getElementById('contador').innerText = contador
        window.localStorage.setItem(nomePokemon, contador)
      } 
    }
    if (localStorage.getItem(nomePokemon) != null) {
      document.getElementById('contador').innerText = localStorage.getItem(nomePokemon)
      contador = window.localStorage.getItem(nomePokemon)
    }
      else {
      contador = 0
      document.getElementById('contador').innerText = contador
    }

    xhr.open('GET', `https://pokeapi.co/api/v2/pokemon/${nomePokemon.toLowerCase()}`, true);
    xhr.send();

    xhr.onload = function () {
        if (xhr.status == 200) {
            let resposta = xhr.response
            let respostaObjeto = JSON.parse(resposta)
            console.log(respostaObjeto)
            let pokemon = document.createElement('img')
            pokemon.id = 'pokemon'
            pokemon.src = respostaObjeto.sprites.other["official-artwork"].front_shiny
            pokemon.style.width = "clamp(80px, 100px, 150px)"
            pokemon.style.objectFit = 'cover'
            if (document.getElementById('pokemon') != null) {
                document.getElementById('pokemon').src = pokemon.src
            } else {
              document.getElementById('content').appendChild(pokemon)
            }
            console.log(respostaObjeto['types'][0]['type']['name'])
            document.body.style.background = colors[respostaObjeto['types'][0]['type']['name']]
            document.getElementById('header').style.color = colors[respostaObjeto['types'][0]['type']['name']]
            document.getElementById('contador').style.color = colors[respostaObjeto['types'][0]['type']['name']]
            }
            
        }
    };

