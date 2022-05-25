import React, { useState } from "react";
import { Modal } from "../../components/modal/Modal";
import styles from "./addItem.module.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import { RiCloseCircleLine } from "react-icons/ri";
import apiLibrary from "../../api";
export const AddItem = ({
  authors,
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
  // Add new book
  const [book, setBook] = useState({
    collectionId: "",
    categoryId: "",
    title: "",
    authorsId: [],
    isbn10: "",
    isbn13: "",
    description: "",
    pages: "",
    publisherId: "",
    publishDay: "",
    publishMonth: "",
    publishYear: "",
    tags: [],
    seriesId: "",
    volumeNumber: "",
    cover: "",
    summary: "",
    languageId: "",
    readingStatus: false,
  });
  const {
    collectionId,
    categoryId,
    title,
    authorsId,
    isbn10,
    isbn13,
    description,
    pages,
    publisherId,
    publishDay,
    publishMonth,
    publishYear,
    tags,
    seriesId,
    volumeNumber,
    cover,
    summary,
    languageId,
    readingStatus,
  } = book;

  // Temporary values
  const [tempAuthors, setTempAuthors] = useState([]);

  // Modals to add new information
  const [openCollection, setOpenCollection] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openAuthor, setOpenAuthor] = useState(false);
  const [openPublisher, setOpenPublisher] = useState(false);
  const [openSeries, setOpenSeries] = useState(false);
  const [openLanguage, setOpenLanguage] = useState(false);

  const handleInputChange = (e) => {
    if (e.target.name === "tags") {
      const tagsValue = e.target.value.split(",");
      setBook({ ...book, tags: tagsValue });
    } else if (e.target.name === "authorsId") {
      if (!book.authorsId.includes(e.target.value)) {
        setBook({ ...book, authorsId: [...authorsId, e.target.value] });
        setTempAuthors([
          ...tempAuthors,
          {
            id: e.target.value,
            tempName: e.target.options[e.target.selectedIndex].text,
          },
        ]);
      }
    } else {
      setBook({ ...book, [e.target.name]: e.target.value });
    }
  };

  const removeItem = (id) => {
    setBook({
      ...book,
      authorsId: authorsId.filter((item) => item !== id),
    });
    setTempAuthors(tempAuthors.filter((item) => item.id !== id));
  };

  const addAuthorBooks = async (idBook, listAuthors) => {
    const number = listAuthors.length;
    await apiLibrary.patch(`/api/authors/books/${idBook}`, {
      listAuthors,
      number,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await apiLibrary.post("/api/books", book);
    addAuthorBooks(res.data.id, authorsId);
    fetchBooks();
    setBook({
      collectionId: "",
      categoryId: "",
      title: "",
      authorsId: [],
      isbn10: "",
      isbn13: "",
      description: "",
      pages: "",
      publisherId: "",
      publishDay,
      publishMonth,
      publishYear,
      tags: [],
      seriesId: "",
      volumeNumber: "",
      cover: "",
      summary: "",
      languageId: "",
      readingStatus: false,
    });
    setTempAuthors([]);
    alert("Libro creado");
  };

  return (
    <section className={styles.container}>
      <h1>Añadir Ítem</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Collection */}
        <div className={`${styles.field} ${styles.field__select}`}>
          <label htmlFor="collection">Colección</label>
          <div>
            <select
              aria-label="Collection"
              name="collectionId"
              onChange={handleInputChange}
              defaultValue=""
              id="collection"
            >
              <option value=""> Colección </option>
              {collections.length !== 0
                ? collections.map((item, index) => (
                    <option value={item.id} key={index}>
                      {item.collectionName}
                    </option>
                  ))
                : null}
            </select>
            <IoIosAddCircleOutline
              onClick={() => setOpenCollection(!openCollection)}
              className={styles.addIcon}
            />
          </div>
        </div>
        {/* Category */}
        <div className={`${styles.field} ${styles.field__select}`}>
          <label htmlFor="category">Categoría</label>
          <div>
            <select
              arialabel="Category"
              name="categoryId"
              onChange={handleInputChange}
              defaultValue=""
              id="category"
            >
              <option value=""> Categoría </option>
              {categories.length !== 0
                ? categories.map((item, index) => (
                    <option value={item.id} key={index}>
                      {item.categoryName}
                    </option>
                  ))
                : null}
            </select>
            <IoIosAddCircleOutline
              className={styles.addIcon}
              onClick={() => setOpenCategory(!openCategory)}
            />
          </div>
        </div>
        {/* Title */}
        <div className={styles.field}>
          <label htmlFor="bookTitle">Título</label>
          <input
            name="title"
            id="bookTitle"
            value={title}
            type="text"
            onChange={handleInputChange}
            placeholder="Título"
            required
          />
        </div>
        {/* Authors */}
        <div className={`${styles.field} ${styles.field__select}`}>
          <label htmlFor="author">Autor</label>
          <div className={styles.field__authors}>
            <div>
              <select
                arialabel="Authors"
                name="authorsId"
                defaultValue=""
                onChange={handleInputChange}
                id="author"
              >
                <option value="">Autor</option>
                {authors.length !== 0
                  ? authors.map((item, index) => (
                      <option value={item.id} key={index}>
                        {`${item.firstName} ${item.lastName}`}
                      </option>
                    ))
                  : null}
              </select>
              <IoIosAddCircleOutline
                className={styles.addIcon}
                onClick={() => setOpenAuthor(!openAuthor)}
              />
            </div>
            <div className={styles.prevText}>
              Autor(es):
              {tempAuthors.length !== 0
                ? tempAuthors.map((item, index) => (
                    <div key={index}>
                      <p>{item.tempName}</p>
                      <RiCloseCircleLine
                        onClick={() => removeItem(item.id)}
                        className={styles.removeIcon}
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
        {/* ISBN 10 */}
        <div className={styles.field}>
          <label htmlFor="isbn10">ISBN 10</label>
          <div>
            <input
              name="isbn10"
              value={isbn10}
              type="text"
              onChange={handleInputChange}
              id="isbn10"
              maxLength={10}
              minLength={0}
              placeholder="ISBN 10"
            />
            <p className={styles.prevText}>Máximo 10 caracteres</p>
          </div>
        </div>
        {/* ISBN 13 */}
        <div className={styles.field}>
          <label htmlFor="isbn13">ISBN 13</label>
          <div>
            <input
              name="isbn13"
              value={isbn13}
              type="text"
              onChange={handleInputChange}
              id="isbn13"
              maxLength={13}
              placeholder="ISBN 13"
            />
            <p className={styles.prevText}>Máximo 13 caracteres</p>
          </div>
        </div>
        {/* Description */}
        <div className={styles.field}>
          <label htmlFor="description">Descripción</label>
          <textarea
            name="description"
            value={description}
            type="text"
            onChange={handleInputChange}
            id="description"
            placeholder="Descripción"
          />
        </div>
        {/* Publisher */}
        <div className={`${styles.field} ${styles.field__select}`}>
          <label htmlFor="publisher">Editorial</label>
          <div>
            <select
              arialabel="Publishers"
              name="publisherId"
              defaultValue=""
              onChange={handleInputChange}
              id="publisher"
            >
              <option value="">Editorial</option>
              {publishers.length !== 0
                ? publishers.map((item, index) => (
                    <option value={item.id} key={index}>
                      {`${item.publisherName} ${
                        item.divisionName ? item.divisionName : ""
                      }`}
                    </option>
                  ))
                : null}
            </select>
            <IoIosAddCircleOutline
              className={styles.addIcon}
              onClick={() => setOpenPublisher(!openPublisher)}
            />
          </div>
        </div>
        {/* pUBLISH date */}
        <div className={styles.field}>
          <label>Fecha de publicación</label>
          <div id="date">
            <div>
              <label htmlFor="publishDay">Día</label>
              <input
                name="publishDay"
                value={publishDay}
                type="number"
                max={31}
                onChange={handleInputChange}
                id="publishDay"
                placeholder="DD"
              />
            </div>
            <div>
              <label htmlFor="publishMonth">Mes</label>
              <input
                name="publishMonth"
                value={publishMonth}
                type="number"
                onChange={handleInputChange}
                id="publishMonth"
                max={12}
                placeholder="MM"
              />
            </div>
            <div>
              <label htmlFor="publishYear">Año</label>
              <input
                name="publishYear"
                value={publishYear}
                type="number"
                onChange={handleInputChange}
                id="publishYear"
                placeholder="YYYY"
                required
              />
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className={styles.field}>
          <label htmlFor="tags">Etiquetas</label>
          <div>
            <input
              name="tags"
              value={tags}
              type="text"
              onChange={handleInputChange}
              id="tags"
              placeholder="Etiquetas"
            />
            <p className={styles.prevText}>Etiquetas separadas por comas (,)</p>
          </div>
        </div>
        {/* Series */}
        <div className={`${styles.field} ${styles.field__select}`}>
          <label htmlFor="series">Serie</label>
          <div>
            <select
              arialabel="Series"
              name="seriesId"
              defaultValue=""
              onChange={handleInputChange}
              id="series"
            >
              <option value="">Serie</option>
              {series.length !== 0
                ? series.map((item, index) => (
                    <option value={item.id} key={index}>
                      {item.seriesName}
                    </option>
                  ))
                : null}
            </select>
            <IoIosAddCircleOutline
              className={styles.addIcon}
              onClick={() => setOpenSeries(!openSeries)}
            />
          </div>
        </div>
        {/* Series volume */}
        <div className={styles.field}>
          <label htmlFor="volumeNumber">Volumen de a serie</label>
          <input
            name="volumeNumber"
            value={volumeNumber}
            type="number"
            min="0"
            onChange={handleInputChange}
            id="volumeNumber"
            placeholder="Volumen en la serie"
          />
        </div>
        {/* Cover */}
        <div className={styles.field}>
          <label htmlFor="coverImage">Portada</label>
          <div>
            <input
              name="cover"
              value={cover}
              type="url"
              onChange={handleInputChange}
              id="coverImage"
              placeholder="Portada"
            />
            <p className={styles.prevText}>Enlace de la imagen</p>
          </div>
        </div>
        {/* Summary*/}
        <div className={styles.field}>
          <label htmlFor="summaryLink">Resumen</label>
          <div>
            <input
              name="summary"
              value={summary}
              type="url"
              onChange={handleInputChange}
              id="summaryLink"
              placeholder="Resumen o reseña"
            />

            <p className={styles.prevText}>Enlace del resumen</p>
          </div>
        </div>
        {/* Language */}
        <div className={`${styles.field} ${styles.field__select}`}>
          <label htmlFor="language">Idioma</label>
          <div>
            <select
              arialabel="Language"
              name="languageId"
              defaultValue=""
              onChange={handleInputChange}
              id="language"
            >
              <option value="">Idioma</option>
              {languages.length !== 0
                ? languages.map((item, index) => (
                    <option value={item.id} key={index}>
                      {item.languageName}
                    </option>
                  ))
                : null}
            </select>
            <IoIosAddCircleOutline
              className={styles.addIcon}
              onClick={() => setOpenLanguage(!openLanguage)}
            />
          </div>
        </div>
        {/* Pages */}
        <div className={styles.field}>
          <label htmlFor="numberPages">Páginas</label>
          <input
            name="pages"
            value={pages}
            type="number"
            min="0"
            onChange={handleInputChange}
            id="numberPages"
            placeholder="Número de páginas"
          />
        </div>
        {/* Reading status */}
        <div className={styles.field}>
          <label htmlFor="readingStatus">Leído</label>
          <div>
            <select
              aria-label="Reading status"
              name="readingStatus"
              defaultValue="false"
              onChange={handleInputChange}
              id="readingStatus"
            >
              <option value="true">Sí</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>
        <div className={styles.submitButton}>
          <button type="submit">Enviar</button>
        </div>
      </form>

      {/* Modals */}
      {openCollection ? (
        <Modal
          type={"collection"}
          setModal={setOpenCollection}
          fetch={fetchCollections}
        />
      ) : openAuthor ? (
        <Modal type={"author"} setModal={setOpenAuthor} fetch={fetchAuthors} />
      ) : openPublisher ? (
        <Modal
          type={"publisher"}
          setModal={setOpenPublisher}
          fetch={fetchPublishers}
        />
      ) : openSeries ? (
        <Modal type={"series"} setModal={setOpenSeries} fetch={fetchSeries} />
      ) : openLanguage ? (
        <Modal
          type={"language"}
          setModal={setOpenLanguage}
          fetch={fetchLanguages}
        />
      ) : openCategory ? (
        <Modal
          type={"category"}
          setModal={setOpenCategory}
          fetch={fetchCategories}
        />
      ) : null}
    </section>
  );
};
