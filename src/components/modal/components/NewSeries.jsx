import React from "react";

export const NewSeries = ({ handleInputChange, newSeries }) => {
  const { seriesName } = newSeries;
  return (
    <>
      <h2>Nueva serie</h2>

      {/*Series name*/}
      <div>
        <label htmlFor="seriesName">Nombre serie</label>
        <input
          name="seriesName"
          value={seriesName}
          type="text"
          onChange={handleInputChange}
          id="seriesName"
        />
      </div>
    </>
  );
};
