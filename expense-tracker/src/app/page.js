'use client'
import React, { useState, useEffect } from "react";

import SignIn from "@/components/SignIn";
import { ExpenseComp } from "@/components/ExpenseComp";
import { useSelector} from "react-redux"

export default function Home() {
  const username = useSelector((state) => state.authReducer.value.username)
  
  return (
    <main>
      <div>
        HomePage
        Username : {username}
        
        <ExpenseComp />
        
      </div>
    </main>
  );
}
