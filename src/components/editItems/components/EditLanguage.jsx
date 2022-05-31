import React, { useState, useEffect } from "react";
import apiLibrary from "../../../api";
import styles from "../editItem.module.css";
import { RiCloseCircleLine } from "react-icons/ri";

export const EditLanguage = ({ idItem, setModal, fetch }) => {
    const [language, setLanguage] = useState({ languageName: "" });
    const { languageName } = language;
    const fetchLanguage = async (id) => {
        const res = await apiLibrary.get(`/api/languages/${id}`);
        setLanguage(res.data);
    };

    const handleInputChange = (e) => {
        setLanguage({ [e.target.name]: e.target.value });
    };
    useEffect(() => {
        fetchLanguage(idItem);
    }, [idItem]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await apiLibrary.put(`/api/languages/${idItem}`, {
            languageName,
        });
        fetch();
        setModal((prev) => !prev);
    };

    return (
        <div className={styles.modal}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <RiCloseCircleLine
                    onClick={(prev) => setModal(!prev)}
                    className={styles.closeIcon}
                />
                <h2>Nuevo idioma</h2>

                {/*Language*/}
                <div>
                    <label htmlFor="languageName">Idioma</label>
                    <input
                        name="languageName"
                        value={languageName}
                        type="text"
                        onChange={handleInputChange}
                        id="languageName"
                    />
                </div>
                <div className={styles.submitButton}>
                    <button type="submit">Actualizar</button>
                </div>
            </form>
        </div>
    );
};
