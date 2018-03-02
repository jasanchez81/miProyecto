let map;
let markers = [];

function initMap() {
  // Create a map object and specify the DOM element for display.
  map = new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(0, 0),
    zoom: 2,
    minZoom: 2,
    styles: [{featureType:"all",elementType:"all",stylers:[{visibility:"on"}]},{featureType:"all",elementType:"labels",stylers:[{visibility:"off"},{saturation:"-100"}]},{featureType:"all",elementType:"labels.text.fill",stylers:[{saturation:36},{color:"#000000"},{lightness:40},{visibility:"off"}]},{featureType:"all",elementType:"labels.text.stroke",stylers:[{visibility:"off"},{color:"#000000"},{lightness:16}]},{featureType:"all",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"administrative",elementType:"geometry.fill",stylers:[{color:"#000000"},{lightness:20}]},{featureType:"administrative",elementType:"geometry.stroke",stylers:[{color:"#000000"},{lightness:17},{weight:1.2}]},{featureType:"landscape",elementType:"geometry",stylers:[{color:"#000000"},{lightness:20}]},{featureType:"landscape",elementType:"geometry.fill",stylers:[{color:"#4d6059"}]},{featureType:"landscape",elementType:"geometry.stroke",stylers:[{color:"#4d6059"}]},{featureType:"landscape.natural",elementType:"geometry.fill",stylers:[{color:"#4d6059"}]},{featureType:"poi",elementType:"geometry",stylers:[{lightness:21}]},{featureType:"poi",elementType:"geometry.fill",stylers:[{color:"#4d6059"}]},{featureType:"poi",elementType:"geometry.stroke",stylers:[{color:"#4d6059"}]},{featureType:"road",elementType:"geometry",stylers:[{visibility:"on"},{color:"#7f8d89"}]},{featureType:"road",elementType:"geometry.fill",stylers:[{color:"#7f8d89"}]},{featureType:"road.highway",elementType:"geometry.fill",stylers:[{color:"#7f8d89"},{lightness:17}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#7f8d89"},{lightness:29},{weight:.2}]},{featureType:"road.arterial",elementType:"geometry",stylers:[{color:"#000000"},{lightness:18}]},{featureType:"road.arterial",elementType:"geometry.fill",stylers:[{color:"#7f8d89"}]},{featureType:"road.arterial",elementType:"geometry.stroke",stylers:[{color:"#7f8d89"}]},{featureType:"road.local",elementType:"geometry",stylers:[{color:"#000000"},{lightness:16}]},{featureType:"road.local",elementType:"geometry.fill",stylers:[{color:"#7f8d89"}]},{featureType:"road.local",elementType:"geometry.stroke",stylers:[{color:"#7f8d89"}]},{featureType:"transit",elementType:"geometry",stylers:[{color:"#000000"},{lightness:19}]},{featureType:"water",elementType:"all",stylers:[{color:"#2b3638"},{visibility:"on"}]},{featureType:"water",elementType:"geometry",stylers:[{color:"#2b3638"},{lightness:17}]},{featureType:"water",elementType:"geometry.fill",stylers:[{color:"#24282b"}]},{featureType:"water",elementType:"geometry.stroke",stylers:[{color:"#24282b"}]},{featureType:"water",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"water",elementType:"labels.text",stylers:[{visibility:"off"}]},{featureType:"water",elementType:"labels.text.fill",stylers:[{visibility:"off"}]},{featureType:"water",elementType:"labels.text.stroke",stylers:[{visibility:"off"}]},{featureType:"water",elementType:"labels.icon",stylers:[{visibility:"off"}]}]
  });

  initTweets();
}

function addMarker(map, tweet) {
  const marker = new google.maps.Marker({
    position: { 
      lat: tweet.lat,
      lng: tweet.lng
    },
    map,
    zIndex: 99 + markers.length,
    animation: google.maps.Animation.DROP,
    icon: tweet.img,
    title: tweet.user
  });

  markers.push(marker);
}

function clean() {
  document.querySelector('#tweets').innerHTML = '';

  markers.forEach((marker) => marker.setMap(null));
  markers = [];
}

function renderTweet(tweet) {
  const container = document.querySelector('#tweets');
  const tweetContainer = document.createElement('div');
  
  tweetContainer.classList.add('card');
  tweetContainer.innerHTML = `
    <div class="card-body">
      <img class="card-img-left" src="${tweet.img}">
      <h5 class="card-title">${tweet.user}</h5>
      <p class="card-text">${tweet.text}</p>
    </div>
    `;

  $(container).prepend(tweetContainer);
}

function loadHashtag(hashtag) {

  //---------------------
  // Start coding here!
  // Connect to firebase, retrieve last 5 tweets and listen to new additions
  // Once tweet has been received, call 'renderTweet' and 'addMarker'
  // -----------------------------

  const ref = firebase.database().ref('tweets/' + hashtag).limitToLast(5);
  
  ref.on('child_added', (snapshot) => {
    const value = snapshot.val();
    renderTweet(value);
    addMarker(map, value)
  })
}




function initTweets() {
  const logout = document.querySelector('#logout');
  const input = document.querySelector('input');

  logout.addEventListener('click', () => {
    firebase.auth().signOut().then(()=>{
      window.location.href = window.location.origin;
    });
  });


  let timeout;

  input.addEventListener('keyup', (event) => {
    clearTimeout(timeout);
    timeout = setTimeout(()=>{
      // -----------------------------
    // Start coding here!
    // Load tweets on user input
    // -----------------------------
    const value = event.target.value;
    if(value){
      fetch(window.location.href + '?tag=' + value, {method:'put'})
      loadHashtag(value);
    }

    },1000)
    
  });

  // -----------------------------
  // Start coding here!
  // Redirect to / if user is not logged in
  // -----------------------------
  //loadHashtag('photo');
};
