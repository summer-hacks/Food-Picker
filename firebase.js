import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAXhloiW3rMV1cdnEJZGSm6OCFBRSVln80",
  authDomain: "chicken-1a88a.firebaseapp.com",
  databaseURL: "https://chicken-1a88a.firebaseio.com",
  projectId: "chicken-1a88a",
  storageBucket: "chicken-1a88a.appspot.com",
  messagingSenderId: "461248206150",
  appId: "1:461248206150:web:1f6a84e93ead343ba14147"
};

firebase.initializeApp(firebaseConfig);
export default firebase;
