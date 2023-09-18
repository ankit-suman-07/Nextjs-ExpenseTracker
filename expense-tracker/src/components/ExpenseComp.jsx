import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchDataFromFirestore } from "../firebase/firebaseDB";
import SignIn from "./SignIn";
import { addData } from "@/redux/features/auth-slice";
import { writeExpenses } from "../firebase/firebaseDB";
import { setDoc } from "firebase/firestore";


export const ExpenseComp = () => {
    const [expense, setExpense] = useState([]);
    const [amount, setAmount] = useState([]);
    const [total, setTotal] = useState(0);
    const [category, setCategory] = useState([]);
    const [date, setDate] = useState([]);
    const [user, setUser] = useState(null);

    const dispatch = useDispatch();

  // Example usage in your component
  const handleFormSubmit = (e) => {
  e.preventDefault();

    const newItem = e.target.elements[0].value;
  const newAmount = e.target.elements[1].value;
  const newCategory = e.target.elements[2].value;
  const newDate = e.target.elements[3].value;

  if (!newItem || isNaN(newAmount)) {
    return;
  }

  // Update state with new entry data
  setExpense((prev) => [newItem, ...prev]);
  setAmount((prev) => [parseFloat(newAmount), ...prev]);
  setCategory((prev) => [newCategory, ...prev]);
  setDate((prev) => [newDate, ...prev]);
    setTotal(total + parseFloat(newAmount));
     console.log(expense);

  // Call writeExpenses with arrays of entries
  // writeExpenses(expense, amount, category, date, total);

  // Clear the form fields
  e.target.elements[0].value = "";
  e.target.elements[1].value = "";
  e.target.elements[2].value = "";
    e.target.elements[3].value = "";
    
  };
  
  
  
const setUserData=(data)=>{
  console.log(data)
  setUser(data)
}

useEffect(() => {
  async function fetchData() {
    try {
      const result = await fetchDataFromFirestore();
      console.log(result);
      if (result.length > 0) {
          // Assuming result[0] contains the data you need
          const item = result[0];
          setExpense(item.spends || []);
          setAmount(item.cost || []);
          setCategory(item.category || []);
          setDate(item.date || []);
          setTotal(item.total || 0);
        }
    } catch (error) {
      
    }
  }

  

  fetchData();
}, []);
  
  // Use useEffect to log the updated 'expense' state
  useEffect(() => {
    console.log(expense); // This will log the updated 'expense' state
    writeExpenses(expense, amount, category, date, total);
     dispatch(addData(expense, amount, category, date, total));
  }, [expense]);

  return (
    <div>
        <h3>Expense Tracker</h3>
        <SignIn  setUser={setUserData} />
        
        <div>
          {user ? <span>{user.displayName}</span> : "No User"}
        </div>
        <div>
          <form onSubmit={handleFormSubmit}>
            <input type='text' placeholder='Enter Item' name='item' />
          <input type='text' placeholder='Enter Amount' name='amount' />
          <input type='text' placeholder='Enter Category' name='category' />
          <input type='date' placeholder='Enter Date' name='date' />
          <button type='submit'>A-d-d</button>
          </form>
        </div>
        <div>
          {expense.map((item, idx) => (
            <div key={idx}>
              {item} - {amount[idx]} - {category[idx]} - {date[idx]}
            </div>
          ))}
        </div>
      Total: {total}
      Category : {category}
      date: {date}
      
    </div>
  )
}
