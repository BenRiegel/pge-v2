//imports ----------------------------------------------------------------------

import firebase from 'firebase/app';
import 'firebase/database';


//module code block ------------------------------------------------------------

var config = {
  apiKey: "AIzaSyAp7m87b17LqWohMbnDIfXP8HGMsJ0kD1o",
  authDomain: "pge-project.firebaseapp.com",
  databaseURL: "https://pge-project.firebaseio.com",
  projectId: "pge-project",
  storageBucket: "pge-project.appspot.com",
  messagingSenderId: "852083951983"
};
firebase.initializeApp(config);


//exports ----------------------------------------------------------------------

export default firebase;
