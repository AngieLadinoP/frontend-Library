import React, { useState } from "react";
import { AuthorsTable } from "../tables/AuthorsTable";
import { useNavigate } from "react-router-dom";
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
import { Modal } from "../modal/Modal";

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
    const navigate = useNavigate();
    const [option, setOption] = useState("Libros");

    const CSVBooks = books.map((item) => ({
        id: item.id,
        title: item.title,
        authorsId: item.authorsId.map((item) => `${item.id}`).toString(),
        authorsName: item.authorsId
            .map((item) => `${item.firstName} ${item.lastName}`)
            .toString(),
        publisherId: item.publisherId.id,
        publisherName: item.publisherId.publisherName,
        languageId: item.languageId.id,
        languageName: item.languageId.languageName,
        seriesId: item.seriesId.id,
        seriesName: item.seriesId.seriesName,
        collectionId: item.collectionId.id,
        collectionName: item.collectionId.collectionName,
        isbn10: item.isbn10,
        isbn13: item.isbn13,
        description: item.description,
        pages: item.pages,
        publishDay: item.publishDay,
        publishMonth: item.publishMonth,
        publishYear: item.publishYear,
        summary: item.summary,
        tags: item.tags.toString(),
        volumeNumber: item.volumeNumber,
        cover: item.cover,
        readingStatus: item.readingStatus,
        categoryId: item.categoryId.id,
        categoryName: item.categoryId.categoryName,
    }));
    console.table(CSVBooks);
    let csvData =
        option === "Autores"
            ? authors
            : option === "Libros"
            ? CSVBooks
            : option === "Géneros"
            ? categories
            : option === "Colecciones"
            ? collections
            : option === "Editoriales"
            ? publishers
            : option === "Series"
            ? series
            : option === "Idiomas"
            ? languages
            : CSVBooks;

    let csvHeaders =
        option === "Autores"
            ? headersAuthors
            : option === "Libros"
            ? headersBooks
            : option === "Géneros"
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
        if (e.target.name === "option") {
            setOption(e.target.value);
        }
    };
    // Modals to add new information
    const [openCollection, setOpenCollection] = useState(false);
    const [openCategory, setOpenCategory] = useState(false);
    const [openAuthor, setOpenAuthor] = useState(false);
    const [openPublisher, setOpenPublisher] = useState(false);
    const [openSeries, setOpenSeries] = useState(false);
    const [openLanguage, setOpenLanguage] = useState(false);

    const handleModal = () => {
        if (option === "Autores") {
            setOpenAuthor(!openAuthor);
        } else if (option === "Géneros") {
            setOpenCategory(!openCategory);
        } else if (option === "Colecciones") {
            setOpenCollection(!openCollection);
        } else if (option === "Editoriales") {
            setOpenPublisher(!openPublisher);
        } else if (option === "Series") {
            setOpenSeries(!openSeries);
        } else if (option === "Idiomas") {
            setOpenLanguage(!openLanguage);
        } else if (option === "Libros") {
            navigate("/library/add", { replace: true });
        }
    };
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
                <div className={styles.newItem} onClick={handleModal}>
                    Nuevo
                </div>
                {/* Modals */}
                {openCollection ? (
                    <Modal
                        type={"collection"}
                        setModal={setOpenCollection}
                        fetch={fetchCollections}
                    />
                ) : openAuthor ? (
                    <Modal
                        type={"author"}
                        setModal={setOpenAuthor}
                        fetch={fetchAuthors}
                    />
                ) : openPublisher ? (
                    <Modal
                        type={"publisher"}
                        setModal={setOpenPublisher}
                        fetch={fetchPublishers}
                    />
                ) : openSeries ? (
                    <Modal
                        type={"series"}
                        setModal={setOpenSeries}
                        fetch={fetchSeries}
                    />
                ) : openLanguage ? (
                    <Modal
                        type={"language"}
                        setModal={setOpenLanguage}
                        fetch={fetchLanguages}
                    />
                ) : openCategory ? (
                    <Modal
                        type={"category"}
                        setModal={setOpenCategory}
                        fetch={fetchCategories}
                    />
                ) : null}
            </div>
            {/* Select order */}

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
                ) : option === "Géneros" ? (
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
