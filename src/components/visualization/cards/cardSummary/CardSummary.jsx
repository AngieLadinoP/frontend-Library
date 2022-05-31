import React from "react";
import { Link } from "react-router-dom";
import styles from "./cardSummary.module.css";

export const CardSummary = ({ book }) => {
    const {
        id,
        title,
        cover,
        authorsId,
        pages,
        languageId,
        seriesId,
        volumeNumber,
        readingStatus,
        description,
    } = book;
    const { seriesName } = seriesId;

    return (
        <div className={styles.summaryCard}>
            <div className={styles.cover}>
                <img src={cover} alt={title} />
            </div>
            <div className={styles.info}>
                <Link to={`/library/${id}`}>
                    <div className={styles.titles}>
                        <h2 id="book_title">
                            {`${
                                volumeNumber ? `${volumeNumber}.` : ""
                            } ${title}`}
                        </h2>
                        <ul className={styles.authors}>
                            {authorsId.length !== 0
                                ? authorsId.map((item, index) => (
                                      <li
                                          id="book_author"
                                          key={index}
                                          className={styles.author}
                                      >{`${item.firstName} ${item.lastName}`}</li>
                                  ))
                                : null}
                        </ul>
                    </div>
                </Link>
                <div className={styles.details}>
                    <div className={styles.details_info}>
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

                        {seriesName !== "N/A" ? (
                            <>
                                {/*Series */}
                                <div className={styles.series}>
                                    <span className={styles.labelInfo}>
                                        Serie:
                                    </span>
                                    {seriesName}
                                </div>
                                {/*volumeNumber */}
                                <div className={styles.volume}>
                                    <span className={styles.labelInfo}>
                                        Volumen en la serie:
                                    </span>
                                    {volumeNumber}
                                </div>
                            </>
                        ) : null}

                        {/*reading Status */}
                        <div>{readingStatus ? "Leído" : "Sin leer"}</div>
                    </div>
                    {/*Description */}
                    <div className={styles.description}>
                        <p>{description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
