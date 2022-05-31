import React, { useState } from "react";
import styles from "./table.module.css";
import { EditCollection } from "../editItems/components/EditCollection";
export const CollectionsTable = ({ collections, fetchCollections }) => {
    const [openEdit, setOpenEdit] = useState(false);
    const [info, setInfo] = useState("");

    const handleOnClick = (idCollection) => {
        setOpenEdit((prev) => !prev);
        setInfo(idCollection);
    };
    return (
        <>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Editar</th>
                        <th>Identificador</th>
                        <th>Colección</th>
                    </tr>
                </thead>
                <tbody>
                    {collections.map((item, index) => (
                        <tr key={index}>
                            <td className={styles.edit}>
                                <p onClick={() => handleOnClick(item.id)}>
                                    Editar
                                </p>
                            </td>
                            <td>{item.id}</td>
                            <td>{item.collectionName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {openEdit ? (
                <EditCollection
                    idItem={info}
                    setModal={setOpenEdit}
                    fetch={fetchCollections}
                />
            ) : null}
        </>
    );
};
