'use client'
import React, { useState } from "react";

export default function Home() {
  const [expense, setExpense] = useState(["apple", "ball", "cat"]);
  const [amount, setAmount] = useState([23.45, 54.67, 435]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newItem = e.target.elements[0].value; // Use 'name' attribute as the key
    const newAmount = e.target.elements[1].value; // Use 'name' attribute as the key

    console.log("eeeeee",e)
    console.log("item - " + newItem);
    console.log("Amount - " + newAmount);

    // Check if the new item is empty
    if (!newItem) {
      return;
    }

    // Check if the new amount is a valid number
    if (isNaN(newAmount)) {
      return;
    }

    // Add the new item to the expense and amount arrays
    setExpense((prevExpense) => [...prevExpense, newItem]);
    setAmount((prevAmount) => [...prevAmount, parseFloat(newAmount)]);

    // Clear the form fields
    e.target.elements[0].value = "";
    e.target.elements[1].value = "";
  };

  // const handleChange=(e)=>{
  //   e.preventDefault();
  //   console.log("eee",e)
  //   if(e.target.name==='item'){
  //     setExpense((prevExpense) => [...prevExpense, e.target.value]);
  //   }
  //   if(e.target.name==='amount'){
  //     setAmount((prevAmount) => [...prevAmount, parseFloat(e.target.value)]);
  //   }

  // }

  return (
    <main>
      <div>
        <h3>Expense Tracker</h3>
        <div>
          <form onSubmit={handleFormSubmit}>
            <input type='text' placeholder='Enter Item' name='item' />
            <input type='text' placeholder='Enter Amount' name='amount'/>
            <button type='submit'>Add</button>
          </form>
        </div>
        <div>
          {expense.map((item, idx) => (
            <div key={idx}>
              {item} - {amount[idx]}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
