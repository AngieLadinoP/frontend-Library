import React, { useState, useEffect } from "react";
import apiLibrary from "../../../api";
import styles from "../editItem.module.css";
import { RiCloseCircleLine } from "react-icons/ri";

export const EditCategory = ({ idItem, setModal, fetch }) => {
    const [category, setCategory] = useState({ categoryName: "" });
    const { categoryName } = category;
    const fetchCategory = async (id) => {
        const res = await apiLibrary.get(`/api/categories/${id}`);
        setCategory(res.data);
    };

    const handleInputChange = (e) => {
        setCategory({ [e.target.name]: e.target.value });
    };
    useEffect(() => {
        fetchCategory(idItem);
    }, [idItem]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await apiLibrary.put(`/api/categories/${idItem}`, {
            categoryName,
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

                <h2>Editar género</h2>
                {/*Category*/}
                <div>
                    <label htmlFor="category">Nombre género</label>
                    <input
                        name="categoryName"
                        value={categoryName}
                        type="text"
                        id="category"
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles.submitButton}>
                    <button type="submit">Actualizar</button>
                </div>
            </form>
        </div>
    );
};
