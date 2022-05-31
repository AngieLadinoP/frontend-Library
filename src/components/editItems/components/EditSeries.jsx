import React, { useState, useEffect } from "react";
import apiLibrary from "../../../api";
import styles from "../editItem.module.css";
import { RiCloseCircleLine } from "react-icons/ri";

export const EditSeries = ({ idItem, setModal, fetch }) => {
    const [series, setSeries] = useState({ seriesName: "" });
    const { seriesName } = series;

    const fetchSeries = async (id) => {
        const res = await apiLibrary.get(`/api/series/${id}`);
        setSeries(res.data);
    };
    const handleInputChange = (e) => {
        setSeries({ [e.target.name]: e.target.value });
    };
    useEffect(() => {
        fetchSeries(idItem);
    }, [idItem]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await apiLibrary.put(`/api/series/${idItem}`, { seriesName });
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
                <h2>Editar serie</h2>

                {/*Series name*/}
                <div>
                    <label htmlFor="seriesName">Nombre serie</label>
                    <input
                        name="seriesName"
                        value={seriesName}
                        type="text"
                        onChange={handleInputChange}
                        id="seriesName"
                    />
                </div>
                <div className={styles.submitButton}>
                    <button type="submit">Actualizar</button>
                </div>
            </form>
        </div>
    );
};
