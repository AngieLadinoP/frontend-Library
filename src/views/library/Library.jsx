import React, { useState } from "react";
import { BsCardList } from "react-icons/bs";
import { MdCalendarViewMonth } from "react-icons/md";
import { VscPreview } from "react-icons/vsc";
import { BiSearchAlt } from "react-icons/bi";
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
        collectionName: "",
    });
    const [view, setView] = useState({ display: "" });
    const visualization = [
        { name: "Lista", icon: <BsCardList />, value: "list" },
        { name: "Portadas", icon: <MdCalendarViewMonth />, value: "cover" },
        { name: "Detalles", icon: <VscPreview />, value: "summary" },
    ];
    const [searchedWord, setSearchedWord] = useState({ word: "" });
    const handleInputChange = (e) => {
        setCollection({ [e.target.name]: e.target.value });
        setView({ [e.target.name]: e.target.value });
        setSearchedWord({ [e.target.name]: e.target.value });
    };
    console.log(collection);
    return (
        <div className={styles.library}>
            {/* Search bar */}
            <div className={`${styles.field} ${styles.field_search}`}>
                <label htmlFor="searchedWord">
                    <BiSearchAlt className={styles.searchIcon} />
                </label>
                <input
                    list="books"
                    name="word"
                    type="text"
                    value={searchedWord.word}
                    onChange={handleInputChange}
                />
            </div>
            <div className={styles.sortOptions}>
                {/*Select collection*/}
                <div className={`${styles.field} ${styles.field__select}`}>
                    <label htmlFor="collection">
                        Colección
                        <select
                            aria-label="Collection"
                            name="collectionName"
                            id="collection"
                            onChange={handleInputChange}
                            defaultValue=""
                        >
                            <option value="">---Colección---</option>
                            {collections.length !== 0
                                ? collections.map((item, index) => (
                                      <option value={item.id} key={index}>
                                          {item.collectionName}
                                      </option>
                                  ))
                                : null}
                        </select>
                    </label>
                </div>
                {/* Select visualization */}
                <div className={`${styles.field} ${styles.field__select}`}>
                    <label htmlFor="visualization">
                        Visualización
                        <select
                            aria-label="Visualization"
                            name="display"
                            id="visualization"
                            onChange={handleInputChange}
                            defaultValue="cover"
                        >
                            {visualization.length !== 0
                                ? visualization.map((item, index) => (
                                      <option value={item.value} key={index}>
                                          {item.name}
                                      </option>
                                  ))
                                : null}
                        </select>
                    </label>
                </div>
            </div>

            <div className={styles.visualization}>
                <Visualization display={view.display} books={books} />
            </div>
        </div>
    );
};
