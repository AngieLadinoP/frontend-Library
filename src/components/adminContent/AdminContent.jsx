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
}) => {
    const months = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
    ];

    const content = [
        "Autores",
        "Libros",
        "Categorías",
        "Colecciones",
        "Editoriales",
        "Series",
        "Idiomas",
    ];
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

    //     const csvData = [
    //         ["firstname", "lastname", "email"],
    //         ["Ahmed", "Tomi", "ah@smthing.co.com"],
    //         ["Raed", "Labes", "rl@smthing.co.com"],
    //         ["Yezzi", "Min l3b", "ymin@cocococo.com"],
    //     ];
    //     // Array of literal objects. Each item is rendered as CSV line however the order of fields will be defined by the headers props. If the headers props are not defined, the component will generate headers from each data item.
    // headers = [
    //     { label: "First Name", key: "firstname" },
    //     { label: "Last Name", key: "lastname" },
    //     { label: "Email", key: "email" }
    //   ];

    //   data = [
    //     { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
    //     { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
    //     { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" }
    //   ];

    const handleInputChange = (e) => {
        setOption(e.target.value);
    };
    return (
        <div className={styles.adminContent}>
            <h2>Administrar contenido</h2>
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
                <div>
                    <CSVLink data={csvData} filename={`${option}.csv`}>
                        Descargar {option} en csv
                    </CSVLink>
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
