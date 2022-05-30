import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import apiLibrary from "../../api";
import styles from "./itemDetails.module.css";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BiCategory } from "react-icons/bi";
import { MdCollectionsBookmark } from "react-icons/md";
import { CardCover } from "../visualization/cards/cardCover/CardCover";
export const ItemDetails = ({ books }) => {
    const { idItem } = useParams();
    const [book, setBook] = useState({
        authorsId: [],
        categoryId: {},
        publisherId: {},
        languageId: {},
        seriesId: { seriesName: "" },
        collectionId: {},
        title: "",
        isbn10: "",
        isbn13: "",
        description: "",
        pages: "",
        publishDay: "",
        publishMonth: "",
        publishYear: "",
        summary: "",
        tags: [],
        volumeNumber: "",
        cover: "",
        readingStatus: "",
    });
    const {
        authorsId,
        categoryId,
        publisherId,
        languageId,
        seriesId,
        collectionId,
        title,
        isbn10,
        isbn13,
        description,
        pages,
        publishDay,
        publishMonth,
        publishYear,
        summary,
        tags,
        volumeNumber,
        cover,
        readingStatus,
    } = book;
    const { seriesName } = seriesId;

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
    const fetchBook = async (idBook) => {
        const res = await apiLibrary.get(`/api/books/${idBook}`);
        setBook(res.data);
    };

    const seriesBooks = books
        .filter(
            (item) =>
                item.seriesId.id === book.seriesId.id &&
                item.id !== idItem &&
                book.seriesId.name !== "N/A"
        )
        .sort((a, b) => b.volumeNumber - a.volumeNumber);

    let booksByAuthors = [];
    // For each book
    for (let i = 0; i < books.length; i++) {
        // For each author of the book
        for (let j = 0; j < books[i].authorsId.length; j++) {
            // For each author of the current book
            for (let k = 0; k < book.authorsId.length; k++) {
                if (
                    books[i].authorsId[j].id === book.authorsId[k].id &&
                    books[i].id !== idItem
                ) {
                    booksByAuthors.push(books[i]);
                }
            }
        }
    }

    useEffect(() => {
        fetchBook(idItem);
    }, [idItem]);

    return (
        <div>
            <div className={styles.options}>
                <Link
                    to={`/library/edit-item/${idItem}`}
                    className={styles.labelIcon}
                >
                    <FiEdit size={25} color="blue" />
                    <span> Editar</span>
                </Link>
                <p className={styles.labelIcon}>
                    <RiDeleteBin5Line size={25} color="red" />
                    <span>Eliminar</span>
                </p>
            </div>
            <div className={styles.details__container}>
                <div className={styles.grid__container1}>
                    {/*cover */}
                    <div className={styles.cover}>
                        <img src={cover} alt={title} />
                    </div>
                    {/*Collection */}
                    <div className={`${styles.collection} ${styles.labelIcon}`}>
                        <span>
                            <MdCollectionsBookmark size={25} />
                        </span>
                        {collectionId.collectionName}
                    </div>
                    {/*Category */}
                    <div className={`${styles.category} ${styles.labelIcon}`}>
                        <span>
                            <BiCategory size={25} />
                        </span>
                        {categoryId.categoryName}
                    </div>
                    {/* Title */}
                    <div className={styles.title}>
                        <h2 id="book_title">{title}</h2>
                    </div>

                    {/* Authors */}
                    <div className={styles.authors}>
                        {authorsId.length !== 0
                            ? authorsId.map((item, index) => (
                                  <h2
                                      key={index}
                                      id="book_author"
                                  >{` ${item.firstName} ${item.lastName}`}</h2>
                              ))
                            : null}
                    </div>

                    {/*pages */}
                    <div className={styles.pages}>
                        <span className={styles.labelInfo}>Páginas: </span>{" "}
                        {pages}
                    </div>
                    {/*Language */}
                    <div className={styles.language}>
                        <span className={styles.labelInfo}>Idioma: </span>
                        {languageId.languageName}
                    </div>

                    {seriesName ? (
                        <>
                            {/*Series */}
                            <div className={styles.series}>
                                <span className={styles.labelInfo}>
                                    Serie:{" "}
                                </span>{" "}
                                {seriesName}
                            </div>
                            {/*volumeNumber */}
                            <div className={styles.volume}>
                                <span className={styles.labelInfo}>
                                    Volumen en la serie:{" "}
                                </span>
                                {volumeNumber}
                            </div>
                        </>
                    ) : null}

                    {/*reading Status */}
                    <div>
                        <span className={styles.labelInfo}>
                            Estado de lectura:{" "}
                        </span>
                        {readingStatus ? "Leído" : "Sin leer"}
                    </div>
                    {/*summary */}
                    <div>
                        <span className={styles.labelInfo}>Resumen: </span>
                        {summary ? (
                            <a href={summary} rel="noreferrer" target="_blank">
                                Enlace al resumen
                            </a>
                        ) : (
                            "Aún no hay enlace al resumen"
                        )}
                    </div>
                    {/* Tags */}
                    <ul className={styles.tags}>
                        {tags.length !== 0
                            ? tags.map((item, index) => (
                                  <li key={index}>{item}</li>
                              ))
                            : null}
                    </ul>
                </div>

                <div className={styles.grid__container2}>
                    {/*isbn */}
                    {isbn10 ? (
                        <div className={styles.isbn10}>
                            <span className={styles.labelInfo}>ISBN 10: </span>{" "}
                            {isbn10}
                        </div>
                    ) : null}
                    {isbn13 ? (
                        <div className={styles.isbn13}>
                            <span className={styles.labelInfo}>ISBN 13:</span>{" "}
                            {isbn13}
                        </div>
                    ) : null}
                    {/* Publisher */}
                    <div className={styles.publisher}>
                        <span className={styles.labelInfo}>Editorial: </span>
                        {`${publisherId.publisherName} ${publisherId.divisionName}`}
                    </div>
                    {/*publishDate */}
                    <div className={styles.publishDate}>
                        <span className={styles.labelInfo}>
                            Fecha de publicación:
                        </span>
                        {`${publishMonth ? months[publishMonth - 1] : null} ${
                            publishDay ? publishDay : publishDay
                        }  ${publishYear}`}
                    </div>
                    {/*Description */}
                    <div className={styles.description}>
                        <span className={styles.labelInfo}>Descripción: </span>
                        {description}
                    </div>
                </div>

                <div className={styles.recomendations}>
                    <h3>
                        {seriesBooks.length !== 0
                            ? "Otros libros de la serie"
                            : booksByAuthors.length !== 0
                            ? "Otros libros del autor(es)"
                            : "No hay recomendaciones"}
                    </h3>
                    <div className={styles.recomendationItems}>
                        {seriesBooks.length !== 0
                            ? seriesBooks.map((item, index) => (
                                  <CardCover book={item} key={index} />
                              ))
                            : booksByAuthors.length !== 0
                            ? booksByAuthors.map((item, index) => (
                                  <CardCover book={item} key={index} />
                              ))
                            : null}
                    </div>
                </div>
            </div>
        </div>
    );
};
