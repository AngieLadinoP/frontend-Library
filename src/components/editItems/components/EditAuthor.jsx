import React, { useState, useEffect } from "react";
import apiLibrary from "../../../api";
import styles from "../editItem.module.css";
import { RiCloseCircleLine } from "react-icons/ri";

export const EditAuthor = ({ idItem, setModal, fetch }) => {
    const [author, setAuthor] = useState({
        firstName: "",
        lastName: "",
        birthDay: "",
        birthMonth: "",
        birthYear: "",
        birthPlaceCity: "",
        birthPlaceCountry: "",
    });
    const {
        firstName,
        lastName,
        birthDay,
        birthMonth,
        birthYear,
        birthPlaceCity,
        birthPlaceCountry,
    } = author;
    const fetchAuthor = async (id) => {
        const res = await apiLibrary.get(`/api/authors/${id}`);
        setAuthor(res.data);
    };
    const handleInputChange = (e) => {
        setAuthor({ ...author, [e.target.name]: e.target.value });
    };
    useEffect(() => {
        fetchAuthor(idItem);
    }, [idItem]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await apiLibrary.put(`/api/authors/${idItem}`, {
            firstName,
            lastName,
            birthDay,
            birthMonth,
            birthYear,
            birthPlaceCity,
            birthPlaceCountry,
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
                <h2>Editar autor</h2>
                {/* First Name */}
                <div>
                    <label htmlFor="firstName">Nombres</label>
                    <input
                        name="firstName"
                        value={firstName}
                        type="text"
                        onChange={handleInputChange}
                        id="firstName"
                    />
                </div>

                {/* Last name */}
                <div>
                    <label htmlFor="lastName">Apellidos</label>
                    <input
                        name="lastName"
                        value={lastName}
                        type="text"
                        onChange={handleInputChange}
                        id="lastName"
                    />
                </div>

                {/* Birth date */}
                <div>
                    <label>Fecha de nacimiento</label>
                    <div id="date">
                        <div>
                            <label htmlFor="birthDay">Día</label>
                            <input
                                name="birthDay"
                                value={birthDay}
                                type="number"
                                max={31}
                                onChange={handleInputChange}
                                id="birthDay"
                                placeholder="DD"
                            />
                        </div>
                        <div>
                            <label htmlFor="birthMonth">Mes</label>
                            <input
                                name="birthMonth"
                                value={birthMonth}
                                type="number"
                                onChange={handleInputChange}
                                id="birthMonth"
                                max={12}
                                placeholder="MM"
                            />
                        </div>
                        <div>
                            <label htmlFor="birthYear">Año</label>
                            <input
                                name="birthYear"
                                value={birthYear}
                                type="number"
                                onChange={handleInputChange}
                                id="birthYear"
                                placeholder="YYYY"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Birth Place (City) */}
                <div>
                    <label htmlFor="birthPlaceCity">Ciudad de nacimiento</label>
                    <input
                        name="birthPlaceCity"
                        value={birthPlaceCity}
                        type="text"
                        onChange={handleInputChange}
                        id=" birthPlaceCity"
                    />
                </div>

                {/* Birth Place (Country) */}
                <div>
                    <label htmlFor="birthPlaceCountry">
                        País de nacimiento
                    </label>
                    <input
                        name="birthPlaceCountry"
                        value={birthPlaceCountry}
                        type="text"
                        onChange={handleInputChange}
                        id="birthPlaceCountry"
                    />
                </div>
                <div className={styles.submitButton}>
                    <button type="submit">Actualizar</button>
                </div>
            </form>
        </div>
    );
};
