import React from "react";

export const NewPublisher = ({ handleInputChange, newPublisher }) => {
  const { publisherName, divisionName } = newPublisher;
  return (
    <>
      <h2>Nueva editorial</h2>

      {/*Publisher's name*/}
      <div>
        <label id="publisherName">Nombre editorial</label>
        <input
          name="publisherName"
          value={publisherName}
          type="text"
          onChange={handleInputChange}
          id="publisherName"
          required
        />
      </div>

      {/*Division's Name*/}
      <div>
        <label htmlFor="divisionName">Nombre división de la editorial</label>
        <input
          name="divisionName"
          value={divisionName}
          type="text"
          onChange={handleInputChange}
          id="divisionName"
        />
      </div>
    </>
  );
};
