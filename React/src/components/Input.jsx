import React from 'react'

function Input({ fieldNames }) {

    const handleChange = () => {};

    console.log(fieldNames);
    
    return (
        <div>
        {fieldNames.map(({ name, value }, index) => (
          <div className="w-full md:w-1/3" key={index}>
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor={name.toLowerCase()}
            >
              {name.toUpperCase()}
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              placeholder={`Enter your ${name.toLowerCase()}`}
              id={name.toLowerCase()}
              value={value}
              onChange={(e) => handleChange(e, name)}
            />
          </div>
        ))}
      </div>
    )
}

export default Input
