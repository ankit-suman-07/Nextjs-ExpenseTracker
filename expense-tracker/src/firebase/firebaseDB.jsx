// dataService.js
import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { app } from "./firebaseConfig"; // Import the app from the Firebase config file
import { useDispatch } from "react-redux";
import { addData } from "@/redux/features/auth-slice";
import { useSelector} from "react-redux"

// Initialize Firestore
const firestore = getFirestore(app);

// Define the document reference
const spendsDoc = doc(firestore, 'expenses', 'username');


export function writeExpenses(expenses, amounts, categories, dates, total) {
  // Create an array of objects for each entry
  const docData = expenses.map((expense, index) => ({
    spends: expense,
    cost: amounts[index],
    category: categories[index],
    date: dates[index],
  }));

  // Use setDoc to write the array of objects to Firestore
  setDoc(spendsDoc, { expenses: docData, total: total })
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
    // console.log("Data : " +JSON.stringify(data[0]));
    dispatch(addData(data[0]))
    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
}

export { fetchDataFromFirestore };
