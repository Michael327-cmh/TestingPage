var firstsearch = document.querySelector('#Search');
var resultContent = document.querySelector('#livesearch');
var musicsearch = document.querySelector('#musicsearch');
var Musicsearchitem = document.querySelector('#Music-Search-Item')
  
function MusicSearch(query) {
    var MMURL = `https://api.musixmatch.com/ws/1.1/track.search?apikey=54136b8efe820fb6dfbc6d2a8179c359&q=${query}`
    fetch(MMURL)
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
        linkButton.textContent = 'Dive Deeper';
        //linkButton.onclick = YTResults();
        linkButton.classList.add('btn',);
        
        resultBody.append(linkButton, bodyContentEl);
        resultContent.append(resultCard);
    }
}

// function ShowResults(Second, Deeper) {
   
//     Musicsearchitem.textContent = Deeper;

//     for (var i=0; i < Second.length; i++) {
//         console.log(Second);
                
//         var resultCard = document.createElement('div');
//         resultCard.classList.add('card', 'blue-grey', 'darken-1');
        
//         var resultBody = document.createElement('div');
//         resultBody.classList.add('card-body');
//         resultCard.append(resultBody);
        
        
//         var bodyContentEl = document.createElement('p');
//         bodyContentEl.innerHTML =
//             '<strong>Album Name:</strong> ' + Second[i].track.album_name + '<br/>';
                
//         if (Second.message.body.track_list[i].track.artist_name) {
//             bodyContentEl.innerHTML +=
//             '<strong>Artist Name:</strong> ' + Second.message.body.track_list[i].track.artist_name + '<br/>';
//         } else {
//             bodyContentEl.innerHTML +=
//             '<strong>Artist Name:</strong> No subject for this entry.' + '<br/>';
//         }
        
//         if (Second.message.body.track_list[i].track.track_name) {
//             bodyContentEl.innerHTML +=
//             '<strong>Track:</strong> ' + Second.message.body.track_list[i].track.track_name;
//         } else {
//             bodyContentEl.innerHTML +=
//             '<strong>Track:</strong>  No description for this entry.';
//         }
        
//         resultBody.append(bodyContentEl);
//         resultContent.append(resultCard);
//     }
// }

// function YTResults(track_name) {
//    var Ufinder = `https://www.googleapis.com/youtube/v3/videos?id=71CDEYXw3mM&key=AIzaSyCMOEOHziR1Ycifilh5J3nJ5S7RqC4VzSo&q=${bodyContentEl.value}`
//    fetch(Ufinder)
//    .then(function (response) {
//        if(response.ok) {
//            response.json().then(function (data) {
//                ShowResults (data.items, track_name)
//            });
//        } else {
//            return response.json();
//        }
//    })
//    .catch(function (error) {
//        console.error(error);
//    });
// };



musicsearch.addEventListener('submit', MusicSearchSubmit);
