// dataService.js
import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { app } from "./firebaseConfig"; // Import the app from the Firebase config file

// Initialize Firestore
const firestore = getFirestore(app);

// Define the document reference
const spendsDoc = doc(firestore, 'expenses', 'username'); // Replace 'username' with the actual username

export function writeExpenses() {
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

async function fetchDataFromFirestore() {
  const collectionRef = collection(firestore, "expenses");
  
  try {
    const querySnapshot = await getDocs(collectionRef);
    const data = [];

    querySnapshot.forEach((doc) => {
      if (doc.exists()) {
        data.push({
          id: doc.id,
          ...doc.data(),
        });
      }
    });
    console.log(data);

    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
}

export { fetchDataFromFirestore };
