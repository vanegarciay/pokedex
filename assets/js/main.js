$(document).ready(function(){
  $('.modal').modal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      inDuration: 300, // Transition in duration
      outDuration: 200, // Transition out duration
      startingTop: '4%', // Starting top style attribute
      endingTop: '10%', // Ending top style attribute
      ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
        /*console.log(modal, trigger);*/
      },
      complete: function() {} // Callback for Modal close
    }
  );

  var insertarPokemon = function(name,img) {
    var html_pokemon = '<div class="col s12 m2 pokemon-single">' +
        '<a href="#pokemon-modal">' +
        '    <div class="pokemon-content">' +
        '        <img class="responsive-img pokemon" src="https://img.pokemondb.net/sprites/x-y/normal/'+img+'.png" alt="Bulbasaur">' +
        '        <p class="pokemon-icons center-align">' +
        '            <img src="assets/icon/pokeball_gray.png">' +
        '            <img src="assets/icon/valentines-heart.png">' +
        '            <img src="assets/icon/data.png">' +
        '        </p>' +
        '        <p class="pokemon-name center-align">' +
        '            ' + name +
        '        </p>' +
        '    </div>' +
        '</a>' +
    '</div>';

    $("#pokemones-container").append(html_pokemon);
  }

  var generarListaDePokemones = function(json_pokemones) {
    $.each(json_pokemones, function (index, data, img) {
        /*console.log(data.pokemon_species);*/
        insertarPokemon(data.pokemon_species.name, data.pokemon_species.name);
        return index < 20;
    });
  }

  var ajaxPokemon = function() {
    $.ajax({
        url: 'http://pokeapi.co/api/v2/pokedex/1/',
        type: 'GET',
        datatype: 'json'
    })
    .done(function(response){
        /*console.log(response.pokemon_entries);*/
        generarListaDePokemones(response.pokemon_entries);

    })
    .fail(function(){
        console.log("error");
    });
  }

  ajaxPokemon();

  $("#pokemones-container").on('click', '.pokemon-single', function(event) {
    event.preventDefault();
    /*console.log($(this).find(".pokemon-name").text());*/
    $("#pokemon-modal h4").text($(this).find('.pokemon-name').text());
    $("#pokemon-modal img.modal-img").attr("src", $(this).find('img').attr("src"));
  });

});
