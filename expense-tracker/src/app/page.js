'use client'
import React, { useState, useEffect } from "react";
import { signInWithPopup } from "firebase/auth";
import { app, auth, provider } from "@/firebase/firebaseConfig"; // Import auth and provider directly from Firebase

export default function Home() {
  const [expense, setExpense] = useState([]);
  const [amount, setAmount] = useState([]);
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newItem = e.target.elements.item.value;
    const newAmount = e.target.elements.amount.value;

    if (!newItem || isNaN(newAmount)) {
      return;
    }

    setExpense((prevExpense) => [...prevExpense, newItem]);
    setAmount((prevAmount) => [...prevAmount, parseFloat(newAmount)]);
    setTotal(total + parseFloat(newAmount));

    e.target.elements.item.value = "";
    e.target.elements.amount.value = "";
  };

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setUser(user);
    });
  }, []);

  const signIn = () => signInWithPopup(auth, provider);
  const signOut = () => auth.signOut();

  return (
    <main>
      <div>
        <h3>Expense Tracker</h3>
        <div>
          <button onClick={signIn}>Sign In</button>
          <button onClick={signOut}>Sign Out</button>
        </div>
        <div>
          {user ? <span>{user.displayName}</span> : "No User"}
        </div>
        <div>
          <form onSubmit={handleFormSubmit}>
            <input type='text' placeholder='Enter Item' name='item' />
            <input type='text' placeholder='Enter Amount' name='amount' />
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
        Total: {total}
      </div>
    </main>
  );
}
