import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyAkt8fGu6FBwVT-xx07ENm-fkTyOoIXo6s',
  authDomain: 'to-do-projects.firebaseapp.com',
  databaseURL: 'https://to-do-projects.firebaseio.com',
  projectId: 'to-do-projects',
  storageBucket: '',
  messagingSenderId: '61794831040',
};
firebase.initializeApp(config);

export default firebase
