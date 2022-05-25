import React from "react";

export const NewCollection = ({ handleInputChange, newCollection }) => {
  const { collectionName } = newCollection;

  return (
    <>
      <h2>Nueva colección</h2>
      <div>
        <label htmlFor="newCollectionName">Nombre colección</label>
        <input
          name="collectionName"
          value={collectionName}
          type="text"
          onChange={handleInputChange}
          id="newCollectionName"
          required
        />
      </div>
    </>
  );
};
