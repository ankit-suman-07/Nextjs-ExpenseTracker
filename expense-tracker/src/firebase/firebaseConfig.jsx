// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore"; // Removed unnecessary import

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBUZYuLcg9vLHE3plcXSsVw6uj52keL5OE",
  authDomain: "expense-tracker-b321c.firebaseapp.com",
  projectId: "expense-tracker-b321c",
  storageBucket: "expense-tracker-b321c.appspot.com",
  messagingSenderId: "1084830971814",
  appId: "1:1084830971814:web:bab816a44b6ec6be64c167"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(); // Removed unnecessary argument

// Initialize Firestore
export const db = getFirestore(app);

// Define the document reference
const spendsDoc = doc(db, 'newExpenses', 'username'); // Replace 'username' with the actual username

function writeExpenses() {
    const docData = {
        spends: ["man", "mat", "map"],
        cost: [122, 434, 80],
    };

    // Use setDoc to write the data to Firestore
    setDoc(spendsDoc, docData)
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}

// Call the writeExpenses function to write data to Firestore
writeExpenses();
