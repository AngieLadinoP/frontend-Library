import React from "react";
import styles from "./itemsList.module.css";
import { FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";
export const ItemsList = ({ books }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Libro</th>
          <th>Autor</th>
          <th>Detalles</th>
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
                <FiEye />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
