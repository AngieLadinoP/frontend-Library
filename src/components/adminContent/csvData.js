export const content=[
    "Autores",
    "Libros",
    "Géneros",
    "Colecciones",
    "Editoriales",
    "Series",
    "Idiomas",
];
export const headersAuthors=[
    { label: "Identificador", key: "id" },
    { label: "Nombres", key: "firstName" },
    { label: "Apellidos", key: "lastName" },
    { label: "Día de nacimiento", key: "birthDay" },
    { label: "Mes de nacimiento", key: "birthMonth" },
    { label: "Año de nacimiento", key: "birthYear" },
    { label: "Ciudad de nacimiento", key: "birthPlaceCity" },
    { label: "País de nacimiento", key: "birthPlaceCountry" },
]
export const headersBooks=[
    { label: "Identificador", key: "id" },
    { label: "Título", key: "title" },
    { label: "IdAutores", key: "authorsId" },
    { label: "Autores", key: "authorsName" },
    { label: "IdEditorial", key: "publisherId" },
    { label: "Editorial", key: "publisherName" },
    { label: "IdIdioma", key: "languageId" },
    { label: "Idioma", key: "languageName" },
    { label: "IdSerie", key: "seriesId" },
    { label: "Serie", key: "seriesName" },
    { label: "volumen", key: "volumeNumber" },
    { label: "IdColección", key: "collectionId" },
    { label: "Colección", key: "collectionName" },
    { label: "IdGénero", key: "categoryId" },
    { label: "Género", key: "categoryName" },
    { label: "ISBN 10", key: "isbn10" },
    { label: "ISBN 13", key: "isbn13" },
    { label: "Páginas", key: "pages" },
    { label: "Día de publicación", key: "publishDay" },
    { label: "Mes de publicación", key: "publishMonth" },
    { label: "Año de publicación", key: "publishYear" },
    { label: "Enlace al resumen", key: "summary" },
    { label: "Etiquetas", key: "tags" },
    { label: "Portada", key: "cover" },
    { label: "Descripción", key: "description" },
    { label: "Estado de lectura", key: "readingStatus" },
]

export const headersCategories=[
    { label: "Identificador", key: "id" },
    { label:"Género", key: "categoryName" },
]
export const headersCollections=[
    { label: "Identificador", key: "id" },
    { label: "Colección", key: "collectionName" },
]
export const headersPublishers=[
    { label: "Identificador", key: "id" },
    { label: "Editorial", key: "publisherName" },
    { label: "División", key: "divisionName" },
]
export const headersSeries=[
    { label: "Identificador", key: "id" },
    { label: "Serie", key: "seriesName" },
]
export const headersLanguages=[
    { label: "Identificador", key: "id" },
    { label: "Idioma", key: "languageName" },
]
