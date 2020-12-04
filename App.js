import React, { Component } from 'react';
import Router from './src/router';
import firebase from 'firebase';


var firebaseConfig = {
  apiKey: "AIzaSyDU2nTrxZYHNqXNsFr57gg783nghZ6Szd8",
  authDomain: "examgenerator-59e19.firebaseapp.com",
  databaseURL: "https://examgenerator-59e19-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "examgenerator-59e19",
  storageBucket: "examgenerator-59e19.appspot.com",
  messagingSenderId: "832876890037",
  appId: "1:832876890037:web:ccb6ca717d9f952ae77bfc"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

class App extends Component{

  render(){
    return(
      <Router />
    )
  }
}

export default App;
