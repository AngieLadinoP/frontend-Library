import React from "react";
import styles from "./table.module.css";

export const CategoriesTable = ({ categories }) => {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Categoría</th>
                </tr>
            </thead>
            <tbody>
                {categories.map((item, index) => (
                    <tr key={index}>
                        <td>{item.categoryName}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
