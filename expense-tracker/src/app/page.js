'use client'
import React, { useState, useEffect } from "react";
import { fetchDataFromFirestore } from "../firebase/firebaseDB";
import SignIn from "./SignIn";

export default function Home() {
  const [data, setData] = useState([]);
  const [expense, setExpense] = useState([]);
  const [amount, setAmount] = useState([]);
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newItem = e.target.elements[0].value;
    const newAmount = e.target.elements[1].value;

    if (!newItem || isNaN(newAmount)) {
      return;
    }

    setExpense((prevExpense) => [...prevExpense, newItem]);
    setAmount((prevAmount) => [...prevAmount, parseFloat(newAmount)]);
    setTotal(total + parseFloat(newAmount));

    e.target.elements[0].value = "";
    e.target.elements[1].value = "";
  };

  
const setUserData=(data)=>{
  console.log(data)
  setUser(data)
}




useEffect(() => {
  async function fetchData() {
    try {
      const result = await fetchDataFromFirestore();
      setData(result);
      data.map((item) => {
        setExpense(item.spends);
        setAmount(item.cost);
      })
    } catch (error) {
      // Handle the error
    }
  }

  fetchData();
}, []);
  return (
    <main>
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
            <button type='submit'>A-d-d</button>
          </form>
        </div>
        <div>
          {expense.map((item, idx) => (
            <div key={idx}>
              {item} - {amount[idx]}
            </div>
          ))}
        </div>
        Total: {total}
        
      </div>
    </main>
  );
}
