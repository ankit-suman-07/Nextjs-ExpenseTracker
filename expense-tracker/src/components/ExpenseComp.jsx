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
  const [userName, setUserName] = useState("");

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



  const setUserData = (data) => {
    console.log(data)
    setUser(data)
  }

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Before setUsername : ", user.email);
        const result = await fetchDataFromFirestore(dispatch, user.email);
        console.log(result);
        if (result.length > 0) {
          // Assuming result[0] contains the data you need
          const item = result[0];
          console.log("Item : ", item);
          console.log("spends : ", item.expenses.spends);

          setExpense(item.expenses.spends || []);
          setAmount(item.expenses.cost || []);
          setCategory(item.expenses.category || []);
          setDate(item.expenses.date || []);
          setTotal(item.total || 0);
          console.log('---->');
          console.log(item);
        }
      } catch (error) {

      }
    }



    fetchData();
  }, [user]);

  // Use useEffect to log the updated 'expense' state
  useEffect(() => {
    console.log("Expense : ", expense); // This will log the updated 'expense' state


    dispatch(addData(expense, amount, category, date, total));
    if (user) {

      if (expense.length != 0) {
        setUserName(user.displayName);
        console.log("Disp Name : ", user.displayName);
        writeExpenses(expense, amount, category, date, total, user.email);
      }
    }
  }, [expense]);

  return (
    <div>
      {
        user == null ?
          <>
            <h3>SignIn with google</h3>
            <SignIn setUser={setUserData} />
          </> :
          <>
            <h3>Expense Tracker</h3>

            <SignIn setUser={setUserData} />
            <div>
              {user.displayName}
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
          </>
      }


    </div>
  )
}
