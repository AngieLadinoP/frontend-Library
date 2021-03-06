import React from "react";
import { Chart, registerables } from "chart.js";
import { Doughnut } from "react-chartjs-2";
Chart.register(...registerables);

export const DoughnutChart = ({ labels, label, values }) => {
    const opacity = 0.8;

    const colors = [
        `rgba(255,99,132,${opacity})`,
        `rgba(54,162,235,${opacity})`,
        `rgba(255, 206, 86, ${opacity})`,
        `rgba(75, 192, 192, ${opacity})`,
        `rgba(153, 102, 255,${opacity})`,
        `rgba(255, 159, 64, ${opacity})`,
        `rgba(255, 105, 97, ${opacity})`,
        `rgba(119, 221, 119, ${opacity})`,
        `rgba(49, 127, 111, ${opacity})`,
        `rgba(127, 49, 65, ${opacity})`,
        `rgba(200, 20, 191, ${opacity})`,
        `rgba(6, 78, 252, ${opacity})`,
        `rgba(255, 206, 236, ${opacity})`,
        `rgba(152, 150, 240, ${opacity})`,
        `rgb(255, 245, 203, ${opacity})`,
        `rgb(182, 227, 212, ${opacity})`,
        `rgb(51, 167, 181, ${opacity})`,
        `rgb(2, 3, 129 ${opacity})`,
        `rgb(40, 116, 252 ${opacity})`,
    ];

    let chartColors = [];

    for (let i = 0; i < labels.length; i++) {
        const position = Math.floor(Math.random() * (colors.length - 1));
        if (!chartColors.includes(colors[position])) {
            chartColors.push(colors[position]);
        } else {
            i--;
        }
    }

    const data = {
        labels: labels,
        datasets: [
            {
                label: label,
                data: values,
                backgroundColor: chartColors,
                borderColor: chartColors,
                borderWidth: 1,
            },
        ],
    };
    return <Doughnut data={data} />;
};
