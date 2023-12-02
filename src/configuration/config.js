import firebase from 'firebase';
import 'firebase/auth'
import'firebase/firestore'
import 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyB83pUr0HBQ94kfFp5Ig9clhcqpNCOVdH0",
    authDomain: "diem-store.firebaseapp.com",
    projectId: "diem-store",
    storageBucket: "diem-store.appspot.com",
    messagingSenderId: "294270164335",
    appId: "1:294270164335:web:80f92e7ae42accd76e9c9a",
    measurementId: "G-12DQEEXSLQ"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const auth = firebaseApp.auth();
  const fs = firebaseApp.firestore();
  const storage = firebaseApp.storage();
  
  export {
    auth,
    fs,
    storage
  }