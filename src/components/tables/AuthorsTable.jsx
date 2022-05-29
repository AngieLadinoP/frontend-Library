import React from "react";
import styles from "./table.module.css";

export const AuthorsTable = ({ authors, months }) => {
    // recibir arreglo con encabezados

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Nombres</th>
                    <th>Apellidos</th>
                    <th>Fecha de nacimiento</th>
                    <th>Ciudad de nacimiento</th>
                    <th>País de nacimiento</th>
                </tr>
            </thead>
            <tbody>
                {authors.map((item, index) => (
                    <tr key={index}>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>
                            {`${
                                item.birthMonth
                                    ? months[item.birthMonth - 1]
                                    : null
                            }  ${
                                item.birthDay ? item.birthDay : item.birthDay
                            } ${item.birthYear ? item.birthYear : null}`}
                        </td>
                        <td>{item.birthPlaceCity}</td>
                        <td>{item.birthPlaceCountry}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
