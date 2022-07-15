import React, { useState } from "react";
import styles from "./dashboard.module.css";
import { BiCategory } from "react-icons/bi";
import { DoughnutChart } from "../../components/Chart";
import { Link } from "react-router-dom";
import { BarChart } from "../../components/BarChart";

export const Dashboard = ({ books, collections, authors }) => {
    const [collection, setCollection] = useState({
        idCollection: "",
        collectionName: "Todos",
    });
    // initial information
    let filteredBooks;
    if (collection.idCollection) {
        filteredBooks = books.filter(
            (item) => item.collectionId.id === collection.idCollection
        );
    } else {
        filteredBooks = books;
    }
    const booksCount = filteredBooks.length;
    const readBooks = filteredBooks.filter(
        (item) => item.readingStatus === true
    );
    const readPages = readBooks
        .map((item) => item.pages)
        .reduce((prev, curr) => prev + curr, 0);
    const percentage = Math.trunc((readBooks.length / booksCount) * 100);
    // Charts
    let languagesChart = [];
    let countLanguagesCharts = [];
    filteredBooks.map((item) => {
        if (!languagesChart.includes(item.languageId.languageName)) {
            languagesChart.push(item.languageId.languageName);
            countLanguagesCharts.push(0);
        }
        return item;
    });
    filteredBooks.map(
        (item) =>
            (countLanguagesCharts[
                languagesChart.indexOf(item.languageId.languageName)
            ] += 1)
    );

    //Categories
    const categoriesChart = [];
    let countCategoryCharts = [];
    filteredBooks.map((item) => {
        if (!categoriesChart.includes(item.categoryId.categoryName)) {
            categoriesChart.push(item.categoryId.categoryName);
            countCategoryCharts.push(0);
        }
        return item;
    });
    filteredBooks.map(
        (item) =>
            (countCategoryCharts[
                categoriesChart.indexOf(item.categoryId.categoryName)
            ] += 1)
    );
    //Series
    const seriesChart = [];
    let countSeriesCharts = [];
    filteredBooks.map((item) => {
        if (
            !seriesChart.includes(item.seriesId.seriesName) &&
            item.seriesId.seriesName !== "No aplica"
        ) {
            seriesChart.push(item.seriesId.seriesName);
            countSeriesCharts.push(0);
        }
        return item;
    });
    filteredBooks.map(
        (item) =>
            (countSeriesCharts[
                seriesChart.indexOf(item.seriesId.seriesName)
            ] += 1)
    );

    //Publisher
    const publishersChart = [];
    let countPublisherCharts = [];
    filteredBooks.map((item) => {
        if (!publishersChart.includes(item.publisherId.publisherName)) {
            publishersChart.push(item.publisherId.publisherName);
            countPublisherCharts.push(0);
        }
        return item;
    });
    filteredBooks.map(
        (item) =>
            (countPublisherCharts[
                publishersChart.indexOf(item.publisherId.publisherName)
            ] += 1)
    );

    const handleInputChange = (e) => {
        setCollection({
            idCollection: e.target.value,
            collectionName: e.target.options[e.target.selectedIndex].text,
        });
    };

    const topAuthors = [];
    authors.map((item) =>
        topAuthors.push({
            id: item.id,
            name: `${item.firstName !== "NA" ? item.firstName : ""} ${
                item.lastName !== "NA" ? item.lastName : ""
            }`,
            count: 0,
        })
    );

    // For each book
    for (let i = 0; i < books.length; i++) {
        // For each author of the book
        for (let j = 0; j < books[i].authorsId.length; j++) {
            // For each author
            for (let k = 0; k < topAuthors.length; k++) {
                if (books[i].authorsId[j].id === topAuthors[k].id) {
                    topAuthors[k].count += 1;
                }
            }
        }
    }

    return (
        <div className={styles.dashboard}>
            <h1>Dashboard</h1>
            {/*Select collection*/}
            <div className={styles.selection}>
                <div className={styles.field__select}>
                    <div className={styles.selectIcon}>
                        <BiCategory className={styles.iconView} />
                        <select
                            aria-label="Collection"
                            name="collection"
                            id="collection"
                            onChange={handleInputChange}
                            defaultValue=""
                        >
                            <option value="">Todos</option>
                            {collections.length !== 0
                                ? collections.map((item, index) => (
                                      <option value={item.id} key={index}>
                                          {item.collectionName}
                                      </option>
                                  ))
                                : null}
                        </select>
                    </div>
                </div>
                <div>
                    <Link to={`/dashboard/admin-content`}>
                        Administrar contenido
                    </Link>
                </div>
            </div>

            <div className={styles.cards_container}>
                {/* Books count */}
                <div className={`${styles.booksCount} ${styles.cardDashboard}`}>
                    <h3 className={styles.cardTitle}>Cantidad de libros</h3>
                    <div className={styles.cardNumber}>{booksCount}</div>
                </div>

                {/* Read books */}
                <div
                    className={`${styles.readBooks} ${styles.cardDashboard} ${styles.cardChart}`}
                >
                    <h3 className={styles.cardTitle}>Libros leídos</h3>
                    <div className={styles.containerChart}>
                        <div className={styles.cardNumber}>{percentage}%</div>
                        <div className={styles.chart}>
                            <DoughnutChart
                                label="Leídos"
                                labels={
                                    booksCount - readBooks.length === 0
                                        ? ["Leídos"]
                                        : booksCount - readBooks.length ===
                                          booksCount
                                        ? ["Sin leer"]
                                        : ["Leídos", "Sin leer"]
                                }
                                values={
                                    booksCount - readBooks.length === 0
                                        ? [readBooks.length]
                                        : booksCount - readBooks.length ===
                                          booksCount
                                        ? [booksCount - readBooks.length]
                                        : [
                                              readBooks.length,
                                              booksCount - readBooks.length,
                                          ]
                                }
                            />
                        </div>
                    </div>
                </div>

                {/* Read pages */}
                <div
                    className={`${styles.readPages} ${styles.cardDashboard} 
                `}
                >
                    <h3 className={styles.cardTitle}>Páginas leídas</h3>

                    <div className={styles.cardNumber}>{readPages}</div>
                </div>

                {/* Languages  */}
                <div
                    className={`${styles.languages}  ${styles.cardDashboard} `}
                >
                    <h3 className={styles.cardTitle}>Idiomas</h3>
                    <div className={styles.chart}>
                        <DoughnutChart
                            label="Idiomas"
                            labels={languagesChart}
                            values={countLanguagesCharts}
                        />
                    </div>
                </div>

                {/* Categories */}
                <div className={`${styles.categories} ${styles.cardDashboard}`}>
                    <h3 className={styles.cardTitle}>Géneros</h3>
                    <div className={styles.chart}>
                        <BarChart
                            label="Géneros"
                            labels={categoriesChart}
                            values={countCategoryCharts}
                        />
                    </div>
                </div>
                {/* Series */}
                <div className={`${styles.series} ${styles.cardDashboard}`}>
                    <h3 className={styles.cardTitle}>Series</h3>
                    <div className={styles.chart}>
                        <DoughnutChart
                            label="Series"
                            labels={seriesChart}
                            values={countSeriesCharts}
                        />
                    </div>
                </div>
                {/* Publishers */}
                <div
                    className={`${styles.publishers} ${styles.cardDashboard} `}
                >
                    <h3 className={styles.cardTitle}>Editoriales</h3>
                    <div className={styles.chart}>
                        <BarChart
                            label="Editoriales"
                            labels={publishersChart}
                            values={countPublisherCharts}
                        />
                    </div>
                </div>
            </div>
            {/* Top Authors */}
            <div>
                <h2>Top Autores</h2>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Posición</th>
                            <th>Autor</th>
                            <th>Cantidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topAuthors
                            .sort((a, b) => {
                                return b.count - a.count;
                            })
                            .slice(0, 10)
                            .map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td> {item.name}</td>
                                    <td>{item.count}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
