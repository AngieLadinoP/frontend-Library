import React from "react";

export const NewLanguage = ({ handleInputChange, newLanguage }) => {
  const { languageName } = newLanguage;
  return (
    <>
      <h2>Nuevo idioma</h2>

      {/*Language*/}
      <div>
        <label htmlFor="languageName">Idioma</label>
        <input
          name="languageName"
          value={languageName}
          type="text"
          onChange={handleInputChange}
          id="languageName"
        />
      </div>
    </>
  );
};
