import React, { useState } from "react";
import { EditSeries } from "../editItems/components/EditSeries";
import styles from "./table.module.css";
export const SeriesTable = ({ series, fetchSeries }) => {
    const [openEdit, setOpenEdit] = useState(false);
    const [info, setInfo] = useState("");
    const handleOnClick = (idSeries) => {
        setOpenEdit((prev) => !prev);
        setInfo(idSeries);
    };
    return (
        <>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Editar</th>
                        <th>Identificador</th>
                        <th>Serie</th>
                    </tr>
                </thead>
                <tbody>
                    {series.map((item, index) => (
                        <tr key={index}>
                            <td className={styles.edit}>
                                <p onClick={() => handleOnClick(item.id)}>
                                    Editar
                                </p>
                            </td>
                            <td>{item.id}</td>
                            <td>{item.seriesName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {openEdit ? (
                <EditSeries
                    idItem={info}
                    setModal={setOpenEdit}
                    fetch={fetchSeries}
                />
            ) : null}
        </>
    );
};
