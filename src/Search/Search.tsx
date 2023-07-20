import React, { useState } from 'react';

type Props = {
  setCity: (value: string) => void,
  setContainerHeight:(calue: number) => void,
  t:(value: string) => string,
};

export const Search: React.FC<Props> = ({ 
  setCity, 
  setContainerHeight, 
  t,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
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
          placeholder={t('searchPlaceholder')}
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
