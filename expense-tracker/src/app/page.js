'use client'
import React, { useState, useEffect } from "react";
import "../css/page.css";

import SignIn from "@/components/SignIn";
import { ExpenseComp } from "@/components/ExpenseComp";
import { useSelector } from "react-redux";
import { Footer } from "@/components/Footer";

export default function Home() {
  const username = useSelector((state) => state.authReducer.value.username);
  // console.log('Username  '  + username);

  return (
    <main  >
      <div className="main-page">
        {/* Username : ${username} */}

        <ExpenseComp />
        <Footer />

      </div>
    </main>
  );
}
