import React, { useState } from "react";
import { BsCardList } from "react-icons/bs";
import { MdCalendarViewMonth } from "react-icons/md";
import { VscPreview } from "react-icons/vsc";
import { BiSearchAlt, BiCategory } from "react-icons/bi";
import styles from "./library.module.css";
import { Visualization } from "../../components/visualization/Visualization";
export const Library = ({
    authors,
    books,
    categories,
    collections,
    languages,
    publishers,
    series,
}) => {
    //Filters
    const [collection, setCollection] = useState({
        idCollection: "",
        collectionName: "Todos",
    });
    const [view, setView] = useState("");
    const visualization = [
        {
            name: "Lista",
            icon: <BsCardList className={styles.iconView} />,
            value: "list",
        },
        {
            name: "Portadas",
            icon: <MdCalendarViewMonth className={styles.iconView} />,
            value: "cover",
        },
        {
            name: "Resumen",
            icon: <VscPreview className={styles.iconView} />,
            value: "summary",
        },
    ];
    const [viewIcon, setViewIcon] = useState(visualization[1].icon);
    const [searchedWord, setSearchedWord] = useState("");

    const handleInputChange = (e) => {
        if (e.target.name === "collection") {
            setCollection({
                idCollection: e.target.value,
                collectionName: e.target.options[e.target.selectedIndex].text,
            });
        }
        if (e.target.name === "display") {
            setView(e.target.value);
            for (let i = 0; i < visualization.length; i++) {
                if (visualization[i].value === e.target.value) {
                    setViewIcon(visualization[i].icon);
                }
            }
        } else if (e.target.name === "searchedWord") {
            setSearchedWord(e.target.value);
        }
    };

    let filteredBooks;

    if (collection.idCollection && searchedWord) {
        const collectionBooks = books.filter(
            (item) => item.collectionId.id === collection.idCollection
        );
        filteredBooks = collectionBooks.filter((item) => {
            return `${item.authorsId.map(
                (item) => `${item.firstName} ${item.lastName}`
            )} ${item.seriesId.seriesName} ${item.title} ${item.description}`
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .includes(
                    searchedWord
                        .toLowerCase()
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                );
        });
    } else if (!collection.idCollection && searchedWord) {
        filteredBooks = books.filter((item) => {
            return `${item.authorsId.map(
                (item) => `${item.firstName} ${item.lastName}`
            )} ${item.publisherId.publisherName} ${
                item.publisherId.divisionName
            } ${item.seriesId.seriesName} ${item.title} ${item.description}`
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .includes(
                    searchedWord
                        .toLowerCase()
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                );
        });
    } else if (collection.idCollection && !searchedWord) {
        filteredBooks = books.filter(
            (item) => item.collectionId.id === collection.idCollection
        );
    } else {
        filteredBooks = books;
    }

    return (
        <div className={styles.library}>
            {/* Search bar */}
            <div className={`${styles.field} ${styles.field_search}`}>
                <label htmlFor="searchedWord">
                    <BiSearchAlt className={styles.searchIcon} />
                </label>
                <input
                    list="books"
                    name="searchedWord"
                    type="text"
                    value={searchedWord}
                    onChange={handleInputChange}
                />
            </div>
            <div className={styles.sortOptions}>
                {/*Select collection*/}
                <div className={`${styles.field} ${styles.field__select}`}>
                    <label htmlFor="collection">
                        Colección
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
                    </label>
                </div>
                {/* Select visualization */}
                <div className={`${styles.field} ${styles.field__select}`}>
                    <label htmlFor="visualization">
                        Visualización
                        <div>
                            {viewIcon}
                            <select
                                aria-label="Visualization"
                                name="display"
                                id="visualization"
                                onChange={handleInputChange}
                                defaultValue="cover"
                            >
                                {visualization.length !== 0
                                    ? visualization.map((item, index) => (
                                          <option
                                              value={item.value}
                                              key={index}
                                          >
                                              {item.name}
                                          </option>
                                      ))
                                    : null}
                            </select>
                        </div>
                    </label>
                </div>
            </div>
            <div>
                <span> Cantidad de libros: </span>
                {filteredBooks.length}
            </div>

            <div className={styles.visualization}>
                <Visualization display={view} books={filteredBooks} />
            </div>
        </div>
    );
};
