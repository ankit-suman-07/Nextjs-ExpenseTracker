import React from 'react';
import "../css/PieChart.css";

export const PieChart = (props) => {
    const expenseArr = props.expense;
    const amountArr = props.amount;

    const categoryTotals = expenseArr.reduce((acc, category, index) => {
        if (acc[category]) {
            acc[category] += amountArr[index];
        } else {
            acc[category] = amountArr[index];
        }
        return acc;
    }, {});

    return (
        <div>
            <ul>
                {Object.entries(categoryTotals).map(([category, total]) => (
                    <li key={category}>
                        {category}: {total}
                    </li>
                ))}
            </ul>
        </div>
    )
}
