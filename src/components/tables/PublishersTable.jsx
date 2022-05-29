import React from "react";
import styles from "./table.module.css";
export const PublishersTable = ({ publishers }) => {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Editorial</th>
                    <th>División</th>
                </tr>
            </thead>
            <tbody>
                {publishers.map((item, index) => (
                    <tr key={index}>
                        <td>{item.publisherName}</td>
                        <td>{item.divisionName ? item.divisionName : "N/A"}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
