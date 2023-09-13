import { initializeApp } from 'firebase/app'
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAxtju-cSq_mgHcHe0vds2_Uq-_5cQv23s",
    authDomain: "crwn-clothing-db-8f6f1.firebaseapp.com",
    projectId: "crwn-clothing-db-8f6f1",
    storageBucket: "crwn-clothing-db-8f6f1.appspot.com",
    messagingSenderId: "290701156169",
    appId: "1:290701156169:web:2e5adf795fe6d65f89c498"
  };
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid)

  const userSnapshot = await getDoc(userDocRef)

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    } catch (error){
      console.log('error creating the user', error.message)
    }
  }

  return userDocRef
}