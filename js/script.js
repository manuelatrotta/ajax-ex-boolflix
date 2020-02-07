//535029b12126fd0395272f6e0b4b8764

//Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il  bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
//Titolo
////Titolo Originale
//Lingua
//Voto

//su postaman con le due keys richieste api e query esempio di risultato
//{
//    "page": 1,
//    "total_results": 6,
//    "total_pages": 1,
//    "results": [
//      {"title": "Inception",
//            "vote_average": 8.3,
//            "overview": "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\", the implantation of another person's idea into a target's subconscious.",
//            "release_date": "2010-07-15"
//        },
//risultati in base alla ricerca al click del bottone
$(document).ready(function() {
  //variabile di richiesta che deve essere poi data dall'input
  //var query = 'inception';
  $("button").click(function () {
    var search = $('#search').val();
    resetSearch();
    getMovie(search);
  });
});

//functions--------------

//funzione per resettare la ricerca

function resetSearch() {
  $('.list-films').html(" ");
  $('#search').val(" ");
}

//funzione chiamata ricerca film
function getMovie(string) {

  var api_key = '535029b12126fd0395272f6e0b4b8764';
  var url = 'https://api.themoviedb.org/3/search/movie';

  $.ajax({
    url: url,
    method:'GET',
    data:{
      api_key: api_key,
      query: string,
      language: 'it-IT'
    },
    success: function(data) {
      var films = data.results;
//se non si ha riscontro con la ricerca quindi la lunghezza di film è uguale a zero manda alert non trovato
        if (films.length == 0) {
          alert('no found');
        }else{
      //stampa tutti i risultati ottenuti
    //  console.log(films);
      printFilms(films);
      }
    },
    error:function(request, state, errors) {
      console.log(errors);
    }
  });
}

//funzione che stampa i risultati ottenuti
function printFilms (films) {
  var source = $("#film-template").html();
  var template = Handlebars.compile(source);

//con un ciclo for vediamo tutte le caratteristiche del film (i)
  for (var i = 0; i < films.length; i++) {
    var thisFilm = films[i];
    console.log(thisFilm);
//in context inserisco gli attributi che voglio stampare nel template
    var context = {
      title: thisFilm.title,
      original_title: thisFilm.original_title,
      original_language : thisFilm.original_language,
      vote_average: thisFilm.vote_average,
    };
    var html = template(context);
    $('.list-films').append(html);
  }
}
