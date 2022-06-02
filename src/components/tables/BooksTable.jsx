import React from "react";
import { Link } from "react-router-dom";
import styles from "./table.module.css";

export const BooksTable = ({ books, months }) => {
    books.sort((a, b) => a.numberL - b.numberL);

    return (
        <table className={`${styles.table} `}>
            <thead>
                <tr>
                    <th>Editar</th>
                    <th>Número</th>
                    <th>Título</th>
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
                    <th>Género</th>
                    <th>Colección</th>
                </tr>
            </thead>
            <tbody>
                {books.map((item, index) => (
                    <tr key={index}>
                        <td className={styles.edit}>
                            <Link to={`/library/edit/${item.id}`}>Editar</Link>
                        </td>
                        <td>{item.numberL}</td>
                        <td>{item.title}</td>
                        <td>
                            {item.authorsId.map((item, index) => (
                                <p key={index}>
                                    {`${
                                        item.firstName !== "NA"
                                            ? item.firstName
                                            : ""
                                    }
                                    ${
                                        item.lastName !== "NA"
                                            ? item.lastName
                                            : ""
                                    }`}
                                </p>
                            ))}
                        </td>
                        <td>{item.pages}</td>
                        <td>{item.isbn10}</td>
                        <td>{item.isbn13}</td>
                        <td>
                            {`${item.publishDay ? item.publishDay : ""} ${
                                item.publishMonth
                                    ? months[item.publishMonth - 1]
                                    : ""
                            } ${item.publishYear}`}
                        </td>
                        <td>{item.publisherId.publisherName}</td>
                        <td>
                            {item.publisherId.divisionName
                                ? item.publisherId.divisionName
                                : "No aplica"}
                        </td>
                        <td>{item.seriesId.seriesName}</td>
                        <td>
                            {item.seriesId.seriesName === "No aplica"
                                ? "No aplica"
                                : item.volumeNumber}
                        </td>
                        <td>{item.languageId.languageName}</td>
                        <td>{item.summary}</td>
                        <td>{item.readingStatus ? "Sí" : "No"}</td>
                        <td>{item.categoryId.categoryName}</td>
                        <td>{item.collectionId.collectionName}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
