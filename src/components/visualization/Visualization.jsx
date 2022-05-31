import React from "react";
import { CardSummary } from "./cards/cardSummary/CardSummary";
import { CardCover } from "./cards/cardCover/CardCover";
import styles from "./visualization.module.css";
export const Visualization = ({ books, display }) => {
    return (
        <div className={styles.container}>
            {books.length !== 0
                ? display === "cover"
                    ? books.map((item, index) => (
                          <CardCover book={item} key={index} />
                      ))
                    : display === "summary"
                    ? books.map((item, index) => (
                          <CardSummary book={item} key={index} />
                      ))
                    : books.map((item, index) => (
                          <CardCover book={item} key={index} />
                      ))
                : "Aún no hay libros en esta colección"}
        </div>
    );
};
