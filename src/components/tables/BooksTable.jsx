import React from "react";
import styles from "./table.module.css";

export const BooksTable = ({ books, months }) => {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Título libro</th>
                    <th>Autores</th>
                    <th>Pg</th>
                    <th>ISBN 10</th>
                    <th>ISBN 13</th>
                    <th>Fecha de publicación</th>
                    <th>Editorial</th>
                    <th>División editorial</th>
                    <th>Serie</th>
                    <th># de la serie</th>
                    <th>Idioma</th>
                    <th>Enlace al resumen</th>
                    <th>Leído</th>
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
                        <td>{item.pages}</td>
                        <td>{item.isbn10}</td>
                        <td>{item.isbn13}</td>
                        <td>
                            {`${
                                item.publishDay
                                    ? item.publishDay
                                    : item.publishDay
                            } ${
                                item.publishMonth
                                    ? months[item.publishMonth - 1]
                                    : null
                            } ${item.publishYear}`}
                        </td>
                        <td>{item.publisherId.publisherName}</td>
                        <td>
                            {item.publisherId.divisionName
                                ? item.publisherId.divisionName
                                : "N/A"}
                        </td>
                        <td>{item.seriesId.seriesName}</td>
                        <td>
                            {item.seriesId.seriesName === "N/A"
                                ? "N/A"
                                : item.volumeNumber}
                        </td>
                        <td>{item.languageId.languageName}</td>
                        <td>{item.summary}</td>
                        <td>{item.readingStatus ? "Sí" : "No"}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
