import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

const generateData = () => {
    let dataset = [];
    const dates = [
        "Jun 30",
        "Jul 01",
        "Jul 02",
        "Jul 03",
        "Jul 04",
        "Jul 05",
        "Jul 06",
        "Jul 07",
        "Jul 08",
        "Jul 09",
        "Jul 10",
        "Jul 11",
        "Jul 12",
        "Jul 13",
        "Jul 14",
        "Jul 15",
        "Jul 16",
        "Jul 17",
    ];

    for (let date of dates) {
        dataset.push({
            date,
            "checkout-1": Math.round(150 + Math.random() * 20 - 10),
            "checkout-2": Math.round(200 + Math.random() * 20 - 10),
            "checkout-3": Math.round(250 + Math.random() * 20 - 10),
        });
    }

    return dataset;
};

const ChartComponent = () => {
    const chartData = useMemo(() => {
        const generatedData = generateData();

        return {
            labels: generatedData.map((data) => data.date),
            datasets: [
                {
                    label: "Checkout 1",
                    data: generatedData.map((data) => data["checkout-1"]),
                    borderColor: "rgb(255, 99, 132)",
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                },
                {
                    label: "Checkout 2",
                    data: generatedData.map((data) => data["checkout-2"]),
                    borderColor: "rgb(53, 162, 235)",
                    backgroundColor: "rgba(53, 162, 235, 0.5)",
                },
                {
                    label: "Checkout 3",
                    data: generatedData.map((data) => data["checkout-3"]),
                    borderColor: "rgb(75, 192, 192)",
                    backgroundColor: "rgba(75, 192, 192, 0.5)",
                },
            ],
        };
    }, []); // Dependencies array is empty, indicating this only runs on mount

    return (
        <div className="w-full max-w-4xl px-4">
            {" "}
            <Line data={chartData} options={{ maintainAspectRatio: false }} />
        </div>
    );
};

export default ChartComponent;
