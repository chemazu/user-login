import firebase from '@firebase/app';
import 'firebase/firestore';
import 'firebase/storage'
import  'firebase/auth';

const config = {
    apiKey: "AIzaSyDCabpaKLDLyag0t8A1JKX9srqjahjaQ_Y",
    authDomain: "gym-app-4d60d.firebaseapp.com",
    databaseURL: "https://gym-app-4d60d.firebaseio.com",
    projectId: "gym-app-4d60d",
    storageBucket: "gym-app-4d60d.appspot.com",
    messagingSenderId: "307121383282",
    appId: "1:307121383282:web:11b47b9f5906fd57d59feb",
    measurementId: "G-56ZMY44EQJ"
  };
  // Initialize Firebase
  firebase.initializeApp(config);

export const storage = firebase.storage();
export const auth = firebase.auth();
export const firestore = firebase.firestore();

//creating SIGN IN  with GOOGLE
const provider = new firebase.auth.GoogleAuthProvider()  //READ ABOUT THE new OPERATOR
provider.setCustomParameters({ prompt:'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

//creating 'add  SIGNED USER to firebase database'
export const createUserProfile= async(userAuth , additionalData) =>{
  if(!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`) //this creates a firebase doc that can be searched
  const snapShot = await userRef.get() //.get() checks for userRef will await waits
   if(!snapShot.exists) {
      const {displayName , email} = userAuth;
      const createdAt = new Date();
      try{
        await userRef.set({
          displayName,
          email,
          createdAt,

          ...additionalData
        })
      }
      catch(error){
        console.log('error creating user', error.message);
      }
   }
}

export default firebase