import React from "react";
import { Link } from "react-router-dom";

export const Item = () => {
  const id = 1;

  return (
    <Link to={`/library/${id}`}>
      {/* 
    Botón de editar, mover de colección o borrar
  - Nombre de la colección
  - Título 
  - Autor 
  - Año de publicación
  - Páginas
  - ISBN
  - Fecha de agregado
  - DEscripción 
  - Status leido o no 
  */}
    </Link>
  );
};
