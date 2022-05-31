import React, { useState, useEffect } from "react";
import apiLibrary from "../../../api";
import styles from "../editItem.module.css";
import { RiCloseCircleLine } from "react-icons/ri";

export const EditPublisher = ({ idItem, setModal, fetch }) => {
    const [publisher, setPublisher] = useState({
        publisherName: "",
        divisionName: "",
    });
    const { publisherName, divisionName } = publisher;

    const fetchPublisher = async (id) => {
        const res = await apiLibrary.get(`/api/publishers/${id}`);
        setPublisher(res.data);
    };
    const handleInputChange = (e) => {
        setPublisher({ ...publisher, [e.target.name]: e.target.value });
    };
    useEffect(() => {
        fetchPublisher(idItem);
    }, [idItem]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await apiLibrary.put(`/api/publishers/${idItem}`, {
            publisherName,
            divisionName,
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
                <h2>Editar editorial</h2>

                {/*Publisher's name*/}
                <div>
                    <label id="publisherName">Nombre editorial</label>
                    <input
                        name="publisherName"
                        value={publisherName}
                        type="text"
                        onChange={handleInputChange}
                        id="publisherName"
                        required
                    />
                </div>

                {/*Division's Name*/}
                <div>
                    <label htmlFor="divisionName">
                        Nombre división de la editorial
                    </label>
                    <input
                        name="divisionName"
                        value={divisionName}
                        type="text"
                        onChange={handleInputChange}
                        id="divisionName"
                    />
                </div>
                <div className={styles.submitButton}>
                    <button type="submit">Actualizar</button>
                </div>
            </form>
        </div>
    );
};
