import React from "react";
import styles from "./table.module.css";
export const SeriesTable = ({ series }) => {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Serie</th>
                </tr>
            </thead>
            <tbody>
                {series.map((item, index) => (
                    <tr key={index}>
                        <td>{item.seriesName}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
