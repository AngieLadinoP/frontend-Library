import React, { useState } from "react";
import { NewAuthor } from "./components/NewAuthor";
import { NewCollection } from "./components/NewCollection";
import { NewLanguage } from "./components/NewLanguage";
import { NewPublisher } from "./components/NewPublisher";
import { NewSeries } from "./components/NewSeries";
import { NewCategory } from "./components/NewCategory";
import styles from "./modal.module.css";
import { RiCloseCircleLine } from "react-icons/ri";
import apiLibrary from "./../../api";
export const Modal = ({ type, setModal, fetch }) => {
    const [newCollection, setNewCollection] = useState({ collectionName: "" });
    const [newAuthor, setNewAuthor] = useState({
        firstName: "",
        lastName: "",
        birthDay: "",
        birthMonth: "",
        birthYear: "",
        birthPlaceCity: "",
        birthPlaceCountry: "",
    });
    const [newPublisher, setNewPublisher] = useState({
        publisherName: "",
        divisionName: "",
    });
    const [newSeries, setNewSeries] = useState({ seriesName: "" });

    const [newLanguage, setNewLanguage] = useState({ languageName: "" });

    const [newCategory, setNewCategory] = useState({ categoryName: "" });

    const handleInputChange = (e) => {
        if (e.target.name === "birthDate") {
            const formatedDate = {
                day: e.target.value.slice(8, 10),
                month: e.target.value.slice(5, 7),
                year: e.target.value.slice(0, 4),
            };
            setNewAuthor({ ...newAuthor, [e.target.name]: formatedDate });
        }
        setNewCollection({ ...newCollection, [e.target.name]: e.target.value });
        setNewAuthor({ ...newAuthor, [e.target.name]: e.target.value });
        setNewPublisher({ ...newPublisher, [e.target.name]: e.target.value });
        setNewSeries({ ...newSeries, [e.target.name]: e.target.value });
        setNewLanguage({ ...newLanguage, [e.target.name]: e.target.value });
        setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (type === "collection") {
            await apiLibrary.post("/api/collections", newCollection);
        } else if (type === "category") {
            await apiLibrary.post("/api/categories", newCategory);
        } else if (type === "author") {
            await apiLibrary.post("/api/authors", newAuthor);
        } else if (type === "publisher") {
            await apiLibrary.post("/api/publishers", newPublisher);
        } else if (type === "series") {
            await apiLibrary.post("/api/series", newSeries);
        } else if (type === "language") {
            await apiLibrary.post("/api/languages", newLanguage);
        }
        fetch();
        setModal((prev) => !prev);
    };

    return (
        <div className={styles.modal}>
            <form id={type} onSubmit={handleSubmit} className={styles.form}>
                <RiCloseCircleLine
                    onClick={(prev) => setModal(!prev)}
                    className={styles.closeIcon}
                />

                {type === "collection" ? (
                    <NewCollection
                        handleInputChange={handleInputChange}
                        newCollection={newCollection}
                    />
                ) : type === "author" ? (
                    <NewAuthor
                        handleInputChange={handleInputChange}
                        newAuthor={newAuthor}
                    />
                ) : type === "publisher" ? (
                    <NewPublisher
                        handleInputChange={handleInputChange}
                        newPublisher={newPublisher}
                    />
                ) : type === "series" ? (
                    <NewSeries
                        handleInputChange={handleInputChange}
                        newSeries={newSeries}
                    />
                ) : type === "language" ? (
                    <NewLanguage
                        handleInputChange={handleInputChange}
                        newLanguage={newLanguage}
                    />
                ) : type === "category" ? (
                    <NewCategory
                        handleInputChange={handleInputChange}
                        newCategory={newCategory}
                    />
                ) : null}

                <div className={styles.submitButton}>
                    <button type="submit">Añadir</button>
                </div>
            </form>
        </div>
    );
};
