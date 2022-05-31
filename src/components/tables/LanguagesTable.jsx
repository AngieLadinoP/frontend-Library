import React, { useState } from "react";
import styles from "./table.module.css";
import { EditLanguage } from "../editItems/components/EditLanguage";

export const LanguagesTable = ({ languages, fetchLanguages }) => {
    const [openEdit, setOpenEdit] = useState(false);
    const [info, setInfo] = useState("");

    const handleOnClick = (idLanguage) => {
        setOpenEdit((prev) => !prev);
        setInfo(idLanguage);
    };

    return (
        <>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Editar</th>
                        <th>Identificador</th>
                        <th>Idioma</th>
                    </tr>
                </thead>
                <tbody>
                    {languages.map((item, index) => (
                        <tr key={index}>
                            <td className={styles.edit}>
                                <p onClick={() => handleOnClick(item.id)}>
                                    Editar
                                </p>
                            </td>
                            <td>{item.id}</td>
                            <td>{item.languageName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {openEdit ? (
                <EditLanguage
                    idItem={info}
                    setModal={setOpenEdit}
                    fetch={fetchLanguages}
                />
            ) : null}
        </>
    );
};
