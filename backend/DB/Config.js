import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore/lite'

const firebaseConfig = {
  apiKey: 'AIzaSyBtqukHnVCOE6Wen6dXkOix7kvccelSpBM',
  authDomain: 'fireproject-5bfc4.firebaseapp.com',
  projectId: 'fireproject-5bfc4',
  storageBucket: 'fireproject-5bfc4.firebasestorage.app',
  messagingSenderId: '246177500703',
  appId: '1:246177500703:web:8671e17b70db580b328f2a'
}
const firebaseApp = initializeApp(firebaseConfig)
const dbFirebase = getFirestore(firebaseApp)

export {dbFirebase}
