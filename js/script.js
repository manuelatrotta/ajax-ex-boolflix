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

$(document).ready(function() {
  //variabile di richiesta che deve essere poi data dall'input
  var query = 'inception';

  $.ajax({
    url:'https://api.themoviedb.org/3/search/movie',
    method:'GET',
    data:{
      api_key: '535029b12126fd0395272f6e0b4b8764',
      query: query
    },
    success: function(data) {
      var films = data.results;
      //stampa tutti i risultati ottenuti 
      console.log(films);
    },
    error:function(request, state, errors) {
      console.log(errors);
    }
  });

});
