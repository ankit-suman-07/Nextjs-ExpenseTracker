// dataService.js
import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

async function fetchDataFromFirestore() {
  const collectionRef = collection(db, "expenses");
  
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
