import React from "react";
import styles from "./table.module.css";
export const LanguagesTable = ({ languages }) => {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Idioma</th>
                </tr>
            </thead>
            <tbody>
                {languages.map((item, index) => (
                    <tr key={index}>
                        <td>{item.languageName}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
