import React, { useState } from "react";
import { AuthorsTable } from "../tables/AuthorsTable";
import { CSVLink } from "react-csv";
import { BooksTable } from "../tables/BooksTable";
import { CategoriesTable } from "../tables/CategoriesTable";
import { CollectionsTable } from "../tables/CollectionsTable";
import { PublishersTable } from "../tables/PublishersTable";
import { SeriesTable } from "../tables/SeriesTable";
import { LanguagesTable } from "../tables/LanguagesTable";
import styles from "./adminContent.module.css";
import { FiDownload } from "react-icons/fi";
import {
    content,
    headersAuthors,
    headersBooks,
    headersCategories,
    headersCollections,
    headersPublishers,
    headersSeries,
    headersLanguages,
} from "./csvData";

export const AdminContent = ({
    authors,
    books,
    categories,
    collections,
    publishers,
    series,
    languages,
    fetchAuthors,
    fetchBooks,
    fetchCollections,
    fetchPublishers,
    fetchLanguages,
    fetchCategories,
    fetchSeries,
    months,
}) => {
    const orderOptions = ["title", "authors", "publishDate"];
    const [orderOption, setOrderOption] = useState("title");
    const [option, setOption] = useState("Libros");
    let csvData =
        option === "Autores"
            ? authors
            : option === "Libros"
            ? books
            : option === "Categorías"
            ? categories
            : option === "Colecciones"
            ? collections
            : option === "Editoriales"
            ? publishers
            : option === "Series"
            ? series
            : option === "Idiomas"
            ? languages
            : books;

    let csvHeaders =
        option === "Autores"
            ? headersAuthors
            : option === "Libros"
            ? headersBooks
            : option === "Categorías"
            ? headersCategories
            : option === "Colecciones"
            ? headersCollections
            : option === "Editoriales"
            ? headersPublishers
            : option === "Series"
            ? headersSeries
            : option === "Idiomas"
            ? headersLanguages
            : headersBooks;

    const handleInputChange = (e) => {
        if (e.target.name === "orderOption") {
            setOrderOption(e.target.value);
        } else if (e.target.name === "option") {
            setOption(e.target.value);
        }
    };
    console.log(orderOption);
    return (
        <div className={styles.adminContent}>
            <h1>Administrar contenido</h1>
            {/*Select collection*/}
            <div className={styles.selection}>
                <div className={styles.field__select}>
                    <select
                        aria-label="Option"
                        name="option"
                        id="option"
                        onChange={handleInputChange}
                        defaultValue="Libros"
                    >
                        {content.length !== 0
                            ? content.map((item, index) => (
                                  <option value={item} key={index}>
                                      {item}
                                  </option>
                              ))
                            : null}
                    </select>
                </div>
                <CSVLink
                    data={csvData}
                    headers={csvHeaders}
                    filename={`${option}.csv`}
                    className={styles.download}
                >
                    <FiDownload className={styles.downloadIcon} />
                    Descargar {option} en csv
                </CSVLink>
            </div>
            {/* Select order */}
            <div className={styles.selection}>
                <div
                    className={`${styles.field__select} ${styles.select_order}`}
                >
                    <select
                        aria-label="Order"
                        name="orderOption"
                        id="order"
                        onChange={handleInputChange}
                        defaultValue="title"
                    >
                        {orderOptions.length !== 0
                            ? orderOptions.map((item, index) => (
                                  <option value={item} key={index}>
                                      {item}
                                  </option>
                              ))
                            : null}
                    </select>
                    <div>
                        <FiDownload className={styles.downloadIcon} />
                    </div>
                </div>
            </div>
            <div className={styles.tableContainer}>
                {option === "Autores" ? (
                    <div className={`${styles.table} ${styles.scrollTable}`}>
                        <AuthorsTable
                            authors={authors}
                            months={months}
                            fetchAuthors={fetchAuthors}
                        />
                    </div>
                ) : option === "Libros" ? (
                    <div className={`${styles.table} ${styles.scrollTable}`}>
                        <BooksTable
                            books={books}
                            months={months}
                            fetchBooks={fetchBooks}
                        />
                    </div>
                ) : option === "Categorías" ? (
                    <div className={styles.table}>
                        <CategoriesTable
                            categories={categories}
                            fetchCategories={fetchCategories}
                            books={books}
                        />
                    </div>
                ) : option === "Colecciones" ? (
                    <div className={styles.table}>
                        <CollectionsTable
                            collections={collections}
                            fetchCollections={fetchCollections}
                        />
                    </div>
                ) : option === "Editoriales" ? (
                    <div className={styles.table}>
                        <PublishersTable
                            publishers={publishers}
                            fetchPublishers={fetchPublishers}
                        />
                    </div>
                ) : option === "Series" ? (
                    <div className={styles.table}>
                        <SeriesTable
                            series={series}
                            fetchSeries={fetchSeries}
                        />
                    </div>
                ) : option === "Idiomas" ? (
                    <div className={styles.table}>
                        <LanguagesTable
                            languages={languages}
                            fetchLanguages={fetchLanguages}
                        />
                    </div>
                ) : null}
            </div>
        </div>
    );
};
