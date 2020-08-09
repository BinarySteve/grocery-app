import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
	apiKey: 'AIzaSyBpNaAIBrng0DJrkRRsFQLqbIxIj706vss',
	authDomain: 'grocery-tracker-73333.firebaseapp.com',
	databaseURL: 'https://grocery-tracker-73333.firebaseio.com',
	projectId: 'grocery-tracker-73333',
	storageBucket: 'grocery-tracker-73333.appspot.com',
	messagingSenderId: '350854574500',
	appId: '1:350854574500:web:11858927ccfdc8efe3d131',
	measurementId: 'G-925H71TP8G'
});

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };
