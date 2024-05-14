import React from 'react'

function Option({ options, selectedOption }) {
    
    const handleChange = () => {};
    
    return (
      <select
        className="py-3 px-4 pe-9 block w-full md:w-1/3 border border-gray-200 rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
        value={selectedOption}
        onChange={handleChange}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    );
  }

export default Option
