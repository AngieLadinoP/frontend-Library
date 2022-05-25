import React from "react";

export const NewAuthor = ({ handleInputChange, newAuthor }) => {
    const {
        firstName,
        lastName,
        birthDay,
        birthMonth,
        birthYear,
        birthPlaceCity,
        birthPlaceCountry,
    } = newAuthor;

    return (
        <div>
            <h2>Nuevo autor</h2>
            {/* First Name */}
            <div>
                <label htmlFor="firstName">Nombres</label>
                <input
                    name="firstName"
                    value={firstName}
                    type="text"
                    onChange={handleInputChange}
                    id="firstName"
                />
            </div>

            {/* Last name */}
            <div>
                <label htmlFor="lastName">Apellidos</label>
                <input
                    name="lastName"
                    value={lastName}
                    type="text"
                    onChange={handleInputChange}
                    id="lastName"
                />
            </div>

            {/* Birth date */}
            <div>
                <label>Fecha de nacimiento</label>
                <div id="date">
                    <div>
                        <label htmlFor="birthDay">Día</label>
                        <input
                            name="birthDay"
                            value={birthDay}
                            type="number"
                            max={31}
                            onChange={handleInputChange}
                            id="birthDay"
                            placeholder="DD"
                        />
                    </div>
                    <div>
                        <label htmlFor="birthMonth">Mes</label>
                        <input
                            name="birthMonth"
                            value={birthMonth}
                            type="number"
                            onChange={handleInputChange}
                            id="birthMonth"
                            max={12}
                            placeholder="MM"
                        />
                    </div>
                    <div>
                        <label htmlFor="birthYear">Año</label>
                        <input
                            name="birthYear"
                            value={birthYear}
                            type="number"
                            onChange={handleInputChange}
                            id="birthYear"
                            placeholder="YYYY"
                            required
                        />
                    </div>
                </div>
            </div>

            {/* Birth Place (City) */}
            <div>
                <label htmlFor="birthPlaceCity">Ciudad de nacimiento</label>
                <input
                    name="birthPlaceCity"
                    value={birthPlaceCity}
                    type="text"
                    onChange={handleInputChange}
                    id="birthPlaceCity"
                />
            </div>

            {/* Birth Place (Country) */}
            <div>
                <label htmlFor="birthPlaceCountry">País de nacimiento</label>
                <input
                    name="birthPlaceCountry"
                    value={birthPlaceCountry}
                    type="text"
                    onChange={handleInputChange}
                    id="birthPlaceCountry"
                />
            </div>
        </div>
    );
};
