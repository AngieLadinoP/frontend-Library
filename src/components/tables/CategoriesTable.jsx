import React, { useState } from "react";
import { EditCategory } from "../editItems/components/EditCategory";
import styles from "./table.module.css";

export const CategoriesTable = ({ categories, fetchCategories }) => {
    const [openEdit, setOpenEdit] = useState(false);
    const [info, setInfo] = useState("");

    const handleOnClick = (idCategory) => {
        setOpenEdit((prev) => !prev);
        setInfo(idCategory);
    };
    return (
        <>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Editar</th>
                        <th>Identificador</th>
                        <th>Categoría</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((item, index) => (
                        <tr key={index}>
                            <td className={styles.edit}>
                                <p onClick={() => handleOnClick(item.id)}>
                                    Editar
                                </p>
                            </td>
                            <td>{item.id}</td>
                            <td>{item.categoryName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {openEdit ? (
                <EditCategory
                    idItem={info}
                    setModal={setOpenEdit}
                    fetch={fetchCategories}
                />
            ) : null}
        </>
    );
};
