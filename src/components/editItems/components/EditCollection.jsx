import React, { useState, useEffect } from "react";
import apiLibrary from "../../../api";
import styles from "../editItem.module.css";
import { RiCloseCircleLine } from "react-icons/ri";

export const EditCollection = ({ idItem, setModal, fetch }) => {
    const [collection, setCollection] = useState({ collectionName: "" });
    const { collectionName } = collection;
    const fetchCollection = async (id) => {
        const res = await apiLibrary.get(`/api/collections/${id}`);
        setCollection(res.data);
    };

    const handleInputChange = (e) => {
        setCollection({ [e.target.name]: e.target.value });
    };
    useEffect(() => {
        fetchCollection(idItem);
    }, [idItem]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await apiLibrary.put(`/api/collections/${idItem}`, {
            collectionName,
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
                <h2>Editar colección</h2>
                <div>
                    <label htmlFor="newCollectionName">Nombre colección</label>
                    <input
                        name="collectionName"
                        value={collectionName}
                        type="text"
                        onChange={handleInputChange}
                        id="newCollectionName"
                        required
                    />
                </div>
                <div className={styles.submitButton}>
                    <button type="submit">Actualizar</button>
                </div>
            </form>
        </div>
    );
};
