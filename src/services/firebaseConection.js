import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyBWM0fMKltDodreyu2u0cnMM-NxDO1CIE4",
    authDomain: "site-masterliga.firebaseapp.com",
    projectId: "site-masterliga",
    storageBucket: "site-masterliga.appspot.com",
    messagingSenderId: "1069064166878",
    appId: "1:1069064166878:web:c930ca71946173a387d14f"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db, storage };