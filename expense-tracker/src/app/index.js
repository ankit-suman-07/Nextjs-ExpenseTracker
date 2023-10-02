'use client'
import React from "react";
import "../css/page.css";

import { ExpenseComp } from "@/components/ExpenseComp";
import { Footer } from "@/components/Footer";

export default function Home() {

  return (
    <main  >
      <div className="main-page">

        <ExpenseComp />
        <Footer />

      </div>
    </main>
  );
}
