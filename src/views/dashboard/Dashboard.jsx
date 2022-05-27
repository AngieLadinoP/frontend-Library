import React from "react";
import apiLibrary from "../../api";

export const Dashboard = ({
    authors,
    books,
    fetchBooks,
    categories,
    collections,
    publishers,
    series,
    languages,
    fetchAuthors,
    fetchCollections,
    fetchPublishers,
    fetchLanguages,
    fetchCategories,
    fetchSeries,
}) => {
    const deleteItem = async (idAuthor, listBooks) => {
        try {
            const number = listBooks.length;
            await apiLibrary.delete(`/api/authors/${idAuthor}`, {
                listBooks,
                number,
            });
            fetchAuthors();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            Dashboard
            <div>
                {authors.map((item, index) => (
                    <div key={index}>
                        {item.firstName}
                        <span
                            onClick={() =>
                                deleteItem(item.id, item.authorBooks)
                            }
                        >
                            Eliminar
                        </span>
                    </div>
                ))}
            </div>
            <div>
                {books.map((item, index) => (
                    <div key={index}>{item.title}</div>
                ))}
            </div>
        </div>
    );
};
