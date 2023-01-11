import app from 'firebase/app';
import 'firebase/auth';

const config = {
     apiKey: "AIzaSyAu5Zrbp6yPByNVq0iWsJLCTTHDH-XmnOg",
     authDomain: "marvelquiz-69f60.firebaseapp.com",
     projectId: "marvelquiz-69f60",
     storageBucket: "marvelquiz-69f60.appspot.com",
     messagingSenderId: "807776084481",
     appId: "1:807776084481:web:9780b208ca98683701d600"
};

class Firebase {
     constructor() {
          app.initializeApp(config);
          this.auth = app.auth();
     }

     //inscription
     signupUser = (email, password) => {
          this.auth.createUserWithEmailAndPassword(email, password);

     }

     //connection
     loginUser = (email, password) => {
          this.auth.signInWithEmailAndPassword(email, password);

     }

     //deconnection
     signOutUser = () => {
          this.auth.signOut();

     }
}

export default Firebase;