import React from "react";

export const NewCategory = ({ handleInputChange, newCategory }) => {
  const { categoryName } = newCategory;
  return (
    <>
      <h2>Nueva categoría</h2>

      {/*Category*/}
      <div>
        <label>Nombre colección</label>
        <input
          name="categoryName"
          value={categoryName}
          type="text"
          onChange={handleInputChange}
        />
      </div>
    </>
  );
};
