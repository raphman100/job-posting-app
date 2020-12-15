import firebase from 'firebase/app';
import 'firebase/auth';
// import 'firebase/firestore';

const firebaseConfig = {
	apiKey: "AIzaSyBQY8W_A2gVOTA6eBQRo2l_APA4KsDuTU8",
	authDomain: "nuxtvuetifytestproject.firebaseapp.com",
	databaseURL: "https://nuxtvuetifytestproject.firebaseio.com",
	projectId: "nuxtvuetifytestproject",
	storageBucket: "nuxtvuetifytestproject.appspot.com",
	messagingSenderId: "991951696056",
	appId: "1:991951696056:web:15934ea4f99b89dc9d044d",
	measurementId: "G-MSCLFD8HJX"
};

// Initialize Firebase
let app = null;
if ( !firebase.apps.length ) {
	app = firebase.initializeApp( firebaseConfig );
}

export default firebase;
