import userDispatcher from '../dispatcher/userDispatcher.js';

var user = null,
    userState = 'unknown',
    auth,
    provider = new firebase.auth.GoogleAuthProvider();

export default {
    init() {
        auth = firebase.auth();
        auth.onAuthStateChanged(function(_user) {
            if (_user) {
                user = _user;
                userState = 'signIn';
                // User is signed in.
            } else {
                userState = 'signOut'
                // No user is signed in.
            }
            userDispatcher.dispatch({
                action: 'userState',
                value: userState
            });
        });
    },
    signIn() {
        return auth.signInWithPopup(provider).then(function(result) {
            debugger
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
        }).catch(function(error) {
            debugger
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    },
    signOut() {
        return auth.signOut().then(function() {
            debugger
            // Sign-out successful.
            var provider = new firebase.auth.GoogleAuthProvider();
        }, function(error) {
            debugger
            // An error happened.
        });
    },
    getUserState() {
        return userState;
    },
    getUser() {
        return auth.currentUser;
    },
};