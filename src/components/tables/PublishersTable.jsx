import React, { useState } from "react";
import { EditPublisher } from "../editItems/components/EditPublisher";
import styles from "./table.module.css";

export const PublishersTable = ({ publishers, fetchPublishers }) => {
    const [openEdit, setOpenEdit] = useState(false);
    const [info, setInfo] = useState("");
    const handleOnClick = (idAuthor) => {
        setOpenEdit((prev) => !prev);
        setInfo(idAuthor);
    };
    const SortArray = (x, y) => {
        if (y.publisherName > x.publisherName) {
            return -1;
        }
        return 0;
    };

    return (
        <>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Editar</th>
                        <th>Identificador</th>
                        <th>Editorial</th>
                        <th>División</th>
                    </tr>
                </thead>
                <tbody>
                    {publishers.sort(SortArray).map((item, index) => (
                        <tr key={index}>
                            <td className={styles.edit}>
                                <p onClick={() => handleOnClick(item.id)}>
                                    Editar
                                </p>
                            </td>
                            <td>{item.id}</td>
                            <td>{item.publisherName}</td>
                            <td>{item.divisionName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {openEdit ? (
                <EditPublisher
                    idItem={info}
                    setModal={setOpenEdit}
                    fetch={fetchPublishers}
                />
            ) : null}
        </>
    );
};
