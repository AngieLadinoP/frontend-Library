import React, { useState } from "react";
import { ItemsSummary } from "../../components/visualization/itemsSummary/ItemsSummary";
import { ItemsList } from "../../components/visualization/itemsList/ItemsList";
import { ItemsCover } from "../../components/visualization/itemsCover/ItemsCover";
import { BsCardList } from "react-icons/bs";
import { MdCalendarViewMonth } from "react-icons/md";
import { VscPreview } from "react-icons/vsc";
import styles from "./library.module.css";
export const Library = ({
  authors,
  books,
  categories,
  collections,
  languages,
  publishers,
  series,
}) => {
  //Filters
  const [collection, setCollection] = useState("");
  const [view, setView] = useState("");
  const visualization = [
    { name: "Lista", icon: <BsCardList />, value: "list" },
    { name: "Portadas", icon: <MdCalendarViewMonth />, value: "cover" },
    { name: "Detalles", icon: <VscPreview />, value: "details" },
  ];

  const [searchedWord, setSearchedWord] = useState("");
  const handleInputChange = (e) => {
    if (e) {
      setCollection({ ...collection, [e.target.name]: e.target.value });
      setView(e.target.value);
    }
  };

  const handleInput = (e) => {
    setSearchedWord(e.target.value);
  };
  return (
    <div>
      {/*
      -- Filtro para escoger la colección 
      -- Filtro para escoger la vista (lista, portadas, portadas con info, etc) 
      -- Filtro para ordenar por título, autor, fecha agregado, fecha publicación, etc) 
      */}
      <label>
        Colección
        <select
          aria-label="Collection"
          name="collection"
          onChange={handleInputChange}
          defaultValue=""
        >
          <option value="">---Colección---</option>
          {collections.length !== 0
            ? collections.map((item, index) => (
                <option value={item.id} key={index}>
                  {item.collectionName}
                </option>
              ))
            : null}
        </select>
      </label>
      <label>
        Visualización
        <select
          aria-label="Visualization"
          name="visualization"
          onChange={handleInputChange}
          defaultValue="cover"
        >
          {visualization.length !== 0
            ? visualization.map((item, index) => (
                <option value={item.value} key={index}>
                  {item.name}
                </option>
              ))
            : null}
        </select>
      </label>

      <div>
        <label htmlFor="searchedWord">Buscar</label>
        <input
          list="books"
          name="searchedWord"
          type="text"
          value={searchedWord}
          onChange={handleInput}
        />
        {searchedWord}
      </div>

      <div className={styles.visualization}>
        {view === "list" ? (
          <ItemsList books={books} />
        ) : view === "details" ? (
          <ItemsSummary books={books} />
        ) : (
          <ItemsCover books={books} />
        )}
      </div>
    </div>
  );
};
