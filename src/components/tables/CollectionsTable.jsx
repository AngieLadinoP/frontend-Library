import React from "react";
import styles from "./table.module.css";
export const CollectionsTable = ({ collections }) => {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Colección</th>
                </tr>
            </thead>
            <tbody>
                {collections.map((item, index) => (
                    <tr key={index}>
                        <td>{item.collectionName}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
