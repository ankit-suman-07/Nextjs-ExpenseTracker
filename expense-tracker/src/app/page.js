'use client'
import React, { useState, useEffect } from "react";

import SignIn from "@/components/SignIn";
import { ExpenseComp } from "@/components/ExpenseComp";


export default function Home() {
  
  
  return (
    <main>
      <div>
        HomePage
        
        <ExpenseComp />
        
      </div>
    </main>
  );
}
