import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyDt1i0gWOYt2Ew6loreRJbe5I3JlDAKxIo",
    authDomain: "tutor4dev-pmk.firebaseapp.com",
    databaseURL: "https://tutor4dev-pmk.firebaseio.com",
    projectId: "tutor4dev-pmk",
    storageBucket: "tutor4dev-pmk.appspot.com",
    messagingSenderId: "280186293690"
}

const setupFirebase = () => {
    try {
        return firebase.app()
    } catch (err) {
        return firebase.initializeApp(config)
    }
}

export { setupFirebase }
