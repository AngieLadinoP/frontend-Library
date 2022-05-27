import React from "react";
import styles from "./itemsList.module.css";
import { FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";
export const CardList = ({ books }) => {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th id="book_title">Libro</th>
                    <th id="book_title">Autor</th>
                    <th id="book_title">Detalles</th>
                </tr>
            </thead>
            <tbody>
                {books.map((item, index) => (
                    <tr key={index}>
                        <td>{item.title}</td>
                        <td>
                            {item.authorsId.map((item, index) => (
                                <p key={index}>
                                    {item.firstName} {item.lastName}
                                </p>
                            ))}
                        </td>
                        <td>
                            <Link to={`/library/${item.id}`}>
                                <FiEye className={styles.viewIcon} />
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
