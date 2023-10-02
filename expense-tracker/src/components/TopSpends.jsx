import React from 'react';
import "../css/TopSpends.css";

export const TopSpends = (props) => {
    const expenseArr = props.expense;
    const amountArr = props.amount;

    // Create an array of objects with expense and corresponding amount
    const expensesWithAmounts = expenseArr.map((expense, index) => ({
        expense: expense,
        amount: amountArr[index]
    }));

    // Sort the array in descending order based on amount
    const sortedExpenses = expensesWithAmounts.sort((a, b) => b.amount - a.amount);

    // Take the top 4 elements
    const topExpenses = sortedExpenses.slice(0, 4);

    return (
        <div className='top-spends-comp'>
            {topExpenses.map((expenseObj, index) => (
                <div key={index} className='cat-total-units'>
                    <span className='card-total-head' >{expenseObj.expense}</span>
                    <span> $ {expenseObj.amount}</span>
                </div>
            ))}
        </div >
    );
}
