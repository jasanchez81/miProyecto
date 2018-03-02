document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.querySelector('#login');
  const card = document.querySelector('.card');

  loginButton.addEventListener('click', () => {

    // -----------------------------
    // Start coding here!
    // Login with Google and redirect to /map
    // -----------------------------
    const provider = new firebase.auth.GoogleAuthProvider();

	// Open login pop-up
	firebase.auth().signInWithPopup(provider).then(()=>{
		window.location.href = window.location.href + 'map'
	}).catch(()=>{
		alert("error")
	})

  });
});
