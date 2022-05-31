import React, { useState } from "react";
import { EditAuthor } from "../editItems/components/EditAuthor";
import styles from "./table.module.css";

export const AuthorsTable = ({ authors, months, fetchAuthors }) => {
    const [openEdit, setOpenEdit] = useState(false);
    const [info, setInfo] = useState("");
    const handleOnClick = (idAuthor) => {
        setOpenEdit((prev) => !prev);
        setInfo(idAuthor);
    };
    return (
        <>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Editar</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Fecha de nacimiento</th>
                        <th>Ciudad de nacimiento</th>
                        <th>País de nacimiento</th>
                    </tr>
                </thead>
                <tbody>
                    {authors.map((item, index) => (
                        <tr key={index}>
                            <td className={styles.edit}>
                                <p onClick={() => handleOnClick(item.id)}>
                                    Editar
                                </p>
                            </td>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>
                                {`${
                                    item.birthMonth
                                        ? months[item.birthMonth - 1]
                                        : null
                                }  ${
                                    item.birthDay
                                        ? item.birthDay
                                        : item.birthDay
                                } ${item.birthYear ? item.birthYear : null}`}
                            </td>
                            <td>{item.birthPlaceCity}</td>
                            <td>{item.birthPlaceCountry}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {openEdit ? (
                <EditAuthor
                    idItem={info}
                    setModal={setOpenEdit}
                    fetch={fetchAuthors}
                />
            ) : null}
        </>
    );
};
