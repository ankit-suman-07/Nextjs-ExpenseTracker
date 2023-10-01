import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchDataFromFirestore } from "../firebase/firebaseDB";
import SignIn from "./SignIn";
import { addData } from "@/redux/features/auth-slice";
import { writeExpenses } from "../firebase/firebaseDB";
import { setDoc } from "firebase/firestore";

import { FirstScreen } from "./FirstScreen";
import { PieChart } from "./PieChart";

import "../css/ExpenseComp.css";


export const ExpenseComp = () => {
  const [expense, setExpense] = useState([]);
  const [amount, setAmount] = useState([]);
  const [total, setTotal] = useState(0);
  const [category, setCategory] = useState([]);
  const [date, setDate] = useState([]);
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");

  const dispatch = useDispatch();

  const categories = ["Rent", "Outing", "Trip", "Gadgets", "Grocery", "Cafe", "Travel", "Subscription", "Tax"];
  const categoryTotal = {
    Rent: 0,
    Outing: 0,
    Trip: 0,
    Gadgets: 0,
    Grocery: 0,
    Cafe: 0,
    Travel: 0,
    Subscription: 0,
    Tax: 0,
  };




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
    e.target.elements[2].value = "Select";
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
          expense.map((item, idx) => {
            categoryTotal.category[idx] += amount[idx];
          });
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
    <div className="expense-comp" >
      {
        user == null ?
          <>
            <nav>
              <div className="logo" >
                Tracker.
              </div>
              {/* <div className="prompt" >
              Sign In With Google
            </div> */}
              <SignIn setUser={setUserData} />
            </nav>
            <FirstScreen />
          </> :
          <>
            <nav>
              <div className="logo" >
                Tracker.
              </div>

              <div className="prompt" >
                Hi, {user.displayName}
              </div>
              <SignIn setUser={setUserData} />
            </nav>
            <div className="main-screen" >


              <div className="box form" >
                <form onSubmit={handleFormSubmit}>
                  <input type='text' placeholder='Enter Item' name='item' />
                  <input type='text' placeholder='Enter Amount' name='amount' />
                  {/* <input type='text' placeholder='Enter Category' name='category' /> */}
                  <select name="category" id="category" >
                    <option value="Select" disabled default>Select Category</option>
                    {
                      categories.map((category) => (
                        <option value={category}>{category}</option>
                      ))
                    }

                  </select>
                  <input type='date' placeholder='Enter Date' name='date' />
                  <button type='submit' className="add-btn" >Add Expense</button>
                </form>
              </div>

              <div className="box expense-list" >
                {expense.map((item, idx) => (
                  <div key={idx} className="expense-element" >
                    <span> {item} </span>
                    <span> {amount[idx]} </span>
                    <span> {category[idx]} </span>
                    <span> {date[idx]} </span>

                  </div>
                ))}
              </div>

              <div className="box pie-chart" >
                <PieChart expense={expense} amount={amount} />
              </div>

              <div className="box total-expend" >
                Total: {total}

                {
                  Object.keys(categoryTotal).forEach(function (key, index) {

                    <>
                      <span>{key}</span>
                      <span>{categoryTotal[key]}</span>
                    </>
                  })
                }
                {Object.entries(categoryTotal).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
              </div>

              <div className="box bar-graph" >
                Bar Graph
              </div>
            </div>
          </>
      }


    </div>
  )
}
