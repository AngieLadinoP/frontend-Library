import "./App.css";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { Library } from "./views/library/Library";
import { Layout } from "./views/layout/Layout";
import { ItemDetails } from "./components/itemDetails/ItemDetails";
import { AddItem } from "./views/addItem/AddItem";
import { Dashboard } from "./views/dashboard/Dashboard";
import { useState, useEffect } from "react";
import apiLibrary from "./api";
import { EditItem } from "./views/editItem/EditItem";
import { AdminContent } from "./components/adminContent/AdminContent";


function App() {
  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [series, setSeries] = useState([]);

  // Authors
  const fetchAuthors = async () => {
    const res = await apiLibrary.get("/api/authors");
    setAuthors(res.data);
  };

  // Books
  const fetchBooks = async () => {
    const res = await apiLibrary.get("/api/books");
    setBooks(res.data);
  };

  // Categories
  const fetchCategories = async () => {
    const res = await apiLibrary.get("/api/categories");
    setCategories(res.data);
  };

  // Collections
  const fetchCollections = async () => {
    const res = await apiLibrary.get("/api/collections");
    setCollections(res.data);
  };

  // Languages
  const fetchLanguages = async () => {
    const res = await apiLibrary.get("/api/languages");
    setLanguages(res.data);
  };

  // Publishers
  const fetchPublishers = async () => {
    const res = await apiLibrary.get("/api/publishers");
    setPublishers(res.data);
  };

  // Series
  const fetchSeries = async () => {
    const res = await apiLibrary.get("/api/series");
    setSeries(res.data);
  };

  useEffect(() => {
    fetchAuthors();
    fetchBooks();
    fetchCategories();
    fetchCollections();
    fetchLanguages();
    fetchPublishers();
    fetchSeries();
  }, []);

  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <Library
                  authors={authors}
                  books={books}
                  categories={categories}
                  collections={collections}
                  languages={languages}
                  publishers={publishers}
                  series={series}
                />
              }
            />
            <Route path="/library/:idItem" element={<ItemDetails books={books}/>} />
            <Route
              path="/library/add-item"
              element={
                <AddItem
                  authors={authors}
                  books={books}
                  categories={categories}
                  collections={collections}
                  languages={languages}
                  publishers={publishers}
                  series={series}
                  fetchAuthors={fetchAuthors}
                  fetchCategories={fetchCategories}
                  fetchBooks={fetchBooks}
                  fetchCollections={fetchCollections}
                  fetchLanguages={fetchLanguages}
                  fetchPublishers={fetchPublishers}
                  fetchSeries={fetchSeries}
                />
              }
            />
            <Route path="/library/edit-item/:idItem" element={<EditItem authors={authors}
                books={books}
                categories={categories}
                collections={collections}
                languages={languages}
                publishers={publishers}
                series={series}
                fetchAuthors={fetchAuthors}
                fetchCategories={fetchCategories}
                fetchBooks={fetchBooks}
                fetchCollections={fetchCollections}
                fetchLanguages={fetchLanguages}
                fetchPublishers={fetchPublishers}
                fetchSeries={fetchSeries}/>}/>
            <Route
              path="/dashboard"
              element={
                <Dashboard
                books={books}
                collections={collections}
                />
              }
            />
            <Route
              path="/dashboard/admin-content"
              element={
                <AdminContent
                authors={authors}
                books={books}
                categories={categories}
                collections={collections}
                languages={languages}
                publishers={publishers}
                series={series}
                fetchAuthors={fetchAuthors}
                fetchCategories={fetchCategories}
                fetchBooks={fetchBooks}
                fetchCollections={fetchCollections}
                fetchLanguages={fetchLanguages}
                fetchPublishers={fetchPublishers}
                fetchSeries={fetchSeries}
                />
              }
            />
            <Route path="*" element={<Navigate replace to="/" />} />
            {/* <Route path="/pruebas" element={<Aqui/>}/> */}
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
