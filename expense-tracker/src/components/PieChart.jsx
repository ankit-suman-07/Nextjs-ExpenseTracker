import React from 'react';
import "../css/PieChart.css";
import Demo from './LineChart';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export const PieChart = (props) => {
    const expenseArr = props.expense;
    const amountArr = props.amount;
    const categoryArr = props.category;



    const categoryTotals = {};

    expenseArr.forEach((category, index) => {
        const categoryName = categoryArr[index];
        const amount = amountArr[index];

        if (categoryTotals[categoryName]) {
            categoryTotals[categoryName] += amount;
        } else {
            categoryTotals[categoryName] = amount;
        }
    });

    const dataArr = [];

    Object.entries(categoryTotals).map(([category, total], index) => {
        dataArr.push({
            y: total,
            label: category,
        });
        return null; // Remember to return something in a map function
    });


    const options = {
        // exportEnabled: true,
        animationEnabled: true,
        // backgroundColor: "#F5DEB3",
        width: 300,
        height: 200,
        data: [{
            type: "doughnut",
            startAngle: 0,
            toolTipContent: "<b>{label}</b>: {y}",

            indexLabelFontSize: 14,
            indexLabel: "{label}",
            dataPoints: dataArr,
        }]
    };

    return (
        <div className='pie-chart-comp' >
            <CanvasJSChart options={options} />
        </div>
    )
}
