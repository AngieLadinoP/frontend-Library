import React from "react";
import { Doughnut } from "react-chartjs-2";
export const DoughnutChart = ({ doughnutData }) => {
    return (
        <div>
            <Doughnut
                data={doughnutData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Cryptocurrency prices",
                        },
                        legend: {
                            display: true,
                            position: "bottom",
                        },
                    },
                }}
            />
        </div>
    );
};
