// dataService.js
import { db } from "./firebaseConfig";
import { arrayUnion } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { app } from "./firebaseConfig"; // Import the app from the Firebase config file
import { useDispatch } from "react-redux";
import { addData } from "@/redux/features/auth-slice";
import { useUsername } from "@/components/useUsername";


// Initialize Firestore
const firestore = getFirestore(app);
// const username = useSelector((state) => state.authReducer.value.username)

// function returnUserName() {
//   const username = useSelector((state) => state.authReducer.value.username);
//   return username;
// }

const username = useUsername();
// // Define the document reference
const spendsDoc = doc(firestore, "expenses", username);



export function writeExpenses(expense, amounts, categories, dates, total) {



  // Create an array of objects for each entry
  const docData = {
    spends: expense,
    cost: amounts,
    category: categories,
    date: dates,
    total: total,
  };


  // Use setDoc to write the array of objects to Firestore
  setDoc(spendsDoc, { expenses: docData, total: total })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
}


async function fetchDataFromFirestore(dispatch) {
  const collectionRef = collection(firestore, "expenses");

  try {
    const querySnapshot = await getDocs(collectionRef);
    console.log("Query : ", querySnapshot);
    console.log(querySnapshot);
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
    // dispatch(addData(data[0]))
    console.log("This :->  ", data);
    dispatch(addData(data));
    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
}

export { fetchDataFromFirestore };
