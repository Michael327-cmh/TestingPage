var firstsearch = document.querySelector('#Search');
var resultContent = document.querySelector('#livesearch');
var musicsearch = document.querySelector('#musicsearch');
var Musicsearchitem = document.querySelector('#Music-Search-Item')
  
function MusicSearch(query) {
    var locMMURL = `https://api.musixmatch.com/ws/1.1/track.search?apikey=54136b8efe820fb6dfbc6d2a8179c359&q=${query}`
    fetch(locMMURL)
    .then(function (response) {
      if(response.ok) {
        response.json().then(function (data) {
            printResults (data, query)
        });
      } else {
          return response.json();
          }
    })
    .catch(function (error) {
      console.error(error);
    });
}


function MusicSearchSubmit(event) {
    event.preventDefault();
    
    var searchInput = firstsearch.value.trim();
    
    if (searchInput) {
      MusicSearch(searchInput);

      resultContent.textContent = '';
      musicsearch.value = '';
    }
}

function printResults(Music, searchterm) {
    console.log(Music);
    Musicsearchitem.textContent = searchterm;

    for (var i=0; i < Music.message.body.track_list.length; i++) {
        
                
        var resultCard = document.createElement('div');
        resultCard.classList.add('card', 'blue-grey', 'darken-1');
        
        var resultBody = document.createElement('div');
        resultBody.classList.add('card-body');
        resultCard.append(resultBody);
        
        
        var bodyContentEl = document.createElement('p');
        bodyContentEl.innerHTML =
            '<strong>Album Name:</strong> ' + Music.message.body.track_list[i].track.album_name + '<br/>';
                
        if (Music.message.body.track_list[i].track.artist_name) {
            bodyContentEl.innerHTML +=
            '<strong>Artist Name:</strong> ' + Music.message.body.track_list[i].track.artist_name + '<br/>';
        } else {
            bodyContentEl.innerHTML +=
            '<strong>Artist Name:</strong> No subject for this entry.' + '<br/>';
        }
        
        if (Music.message.body.track_list[i].track.track_name) {
            bodyContentEl.innerHTML +=
            '<strong>Track:</strong> ' + Music.message.body.track_list[i].track.track_name;
        } else {
            bodyContentEl.innerHTML +=
            '<strong>Track:</strong>  No description for this entry.';
        }
        
        var linkButton = document.createElement('a');
        linkButton.textContent = 'Listen Here';
        linkButton.onclick = function () {YTResults};
        linkButton.classList.add('btn',);
        
        resultBody.append(linkButton, bodyContentEl);
        //resultBody.appendChild(bodyContentEl);
        resultContent.append(resultCard);
    }
}

function YTResults() {
    fetch("https://deezerdevs-deezer.p.rapidapi.com/track/%7Bid%7D", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "4b9eb06844msh2593a5e43d37842p15d2e7jsnd7dac4b64d82",
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
        }
    })
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.error(err);
    });
}



musicsearch.addEventListener('submit', MusicSearchSubmit);
