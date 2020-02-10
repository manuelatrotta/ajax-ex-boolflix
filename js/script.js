//personal api_key:535029b12126fd0395272f6e0b4b8764

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
//        "vote_average":8.7,
//      "overview": "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\", the implantation of another person's idea into a target's subconscious.",
//       "release_date": "2010-07-15"
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
//funzione per messaggio di non risultati
function sendMessageNoResult() {
  var source = $("#noresult-template").html();
  var template = Handlebars.compile(source);
  var html = template();
  $('.list-films').append(html);
}

//funzione chiamata ricerca film
function getMovie(string) {

  var api_key = '535029b12126fd0395272f6e0b4b8764';
  var url_movies = 'https://api.themoviedb.org/3/search/movie';

  $.ajax({
    url: url_movies,
    method:'GET',
    data:{
      api_key: api_key,
      query: string,
      language: 'it-IT'
    },
    success: function(data) {
//se  si ha riscontro con la ricerca quindi il total result è > 0 si stampano i risultati richiamando la funzione printFilms
        if (data.total_results > 0) {
          var films = data.results;
          printFilms(films);
//se non si ha riscontro con la ricerca quindi il total result è uguale a 0 si manda un messaggio all'utente
        }else{
          resetSearch();
          sendMessageNoResult();
      }
    },
    error:function(request, state, errors) {
      console.log(errors);
    }
  });
  $.ajax({
    url: 'https://api.themoviedb.org/3/search/tv',
    method: 'GET',
    data: {
      api_key: '535029b12126fd0395272f6e0b4b8764',
      query: string,
      language: 'it-IT'
    },
    success: function (data) {
      if (data.total_results > 0) {
        var telefilm = data.results;
        printTelefilms(telefilm);
      }else{
        resetSearch();
        sendMessageNoResult();
      }
    },
    error: function (request, state, errors) {
      console.log(errors);
    }
  }
  );
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
  var flag = thisFilm.original_language;
    var context = {
      title: thisFilm.title,
      original_title: thisFilm.original_title,
      original_language : 'img/' + flag + '.png',
      vote_average: thisFilm.vote_average,
      specialChars : printStars(thisFilm.vote_average),
    };
    var html = template(context);
    $('.list-films').append(html);
  }
}
//funzione che stampa i risultati dei telefilms
function printTelefilms(telefilm) {
  $('.list-films').html('');
  var source = $("#telefilm-template").html();
  var template = Handlebars.compile(source);
  for (var i = 0; i < telefilm.length; i++) {
     var thisTelefilm = telefilm[i];
     var flag = thisTelefilm.original_language;
     var context = {
      name: thisTelefilm.name,
      original_name: thisTelefilm.original_name,
      original_language : 'img/' + flag + '.png',
      specialChars: printStars(thisTelefilm.vote_average),
     };
     var html = template(context);
     $('.list-films').append(html);
  }
}
//funzione che correla il voto in scala da 1 a 5 con le stelle.
function printStars(vote) {
  //voto arrotondato con .round e diviso 2 per scala ridotta
  var vote = Math.round(vote / 2);
  var stars = '';
  for(var i=1; i<=5; i++) {
    if(i <=vote) {
      var singleStar = '<i class="fas fa-star"></i>';
    }else {
      var singleStar = '<i class="far fa-star"></i>';
    }
    stars = stars + singleStar;
  }
  return stars;
}
