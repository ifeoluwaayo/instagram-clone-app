import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyC_XC5fyyNkaLYZj7e4HfJmNSM6h-186q8",
	authDomain: "instagram-clone-app-cadc6.firebaseapp.com",
	projectId: "instagram-clone-app-cadc6",
	storageBucket: "instagram-clone-app-cadc6.appspot.com",
	messagingSenderId: "217587018156",
	appId: "1:217587018156:web:45af5e5cc93f4afeb3b209",
};

// Initialize Firebase
firebase.apps.length ? firebase.app() : firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { firebase, db };
