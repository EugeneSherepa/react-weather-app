import React, { useState } from 'react';

type Props = {
  setCity: (value: string) => void,
  setContainerHeight:(calue: number) => void,
};

export const Search: React.FC<Props> = ({ setCity, setContainerHeight }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value.trim());
  }

  const handleFormSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputValue) {
      setCity(inputValue);
      setContainerHeight(580);
    }
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="search-box">
        <i className="fa-solid fa-location-dot" />
        <input 
          type="text" 
          placeholder="Enter your location" 
          value={inputValue}
          onChange={(event) => handleInputChange(event)}
        />
        <button 
          type="submit"
          className="fa-solid fa-magnifying-glass" 
          onClick={() => handleFormSubmit}
        />
      </div>
    </form>
  )
}
