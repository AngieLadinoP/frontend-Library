import React from "react";
import styles from "./cardCover.module.css";
import { Link } from "react-router-dom";

export const CardCover = ({ book }) => {
    const { id, cover, title, authorsId } = book;

    return (
        <div className={styles.cardBook}>
            <Link to={`/library/${id}`}>
                <div className={styles.cover}>
                    <img src={cover} alt={title} />
                </div>

                <div>
                    <h4 className={styles.title} id="book_title">
                        {title}
                    </h4>
                    <ul className={styles.authors}>
                        {authorsId.length !== 0
                            ? authorsId.map((item, index) => (
                                  <li
                                      key={index}
                                      className={styles.author}
                                      id="book_author"
                                  >{`${item.firstName} ${item.lastName}`}</li>
                              ))
                            : null}
                    </ul>
                </div>
            </Link>
        </div>
    );
};
