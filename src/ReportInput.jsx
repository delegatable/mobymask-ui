import React, { useState } from 'react';
import { reportTypes as options } from './constants';

export default function ReportInput({ onSubmit }) {
  const [value, setValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('TWT');

  const handleChange = event => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    const result = sanitizeValue(selectedOption, value);
    if (onSubmit) {
      onSubmit(result);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="report-type">Report Type:</label>
        <select id="report-type" name="report-type" onChange={handleChange}>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="value">Value:</label>
        <input
          type="text"
          id="value"
          name="value"
          value={value}
          onChange={event => setValue(event.target.value)}
        />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

function sanitizeValue (type, value) {
  switch (type) {
    case 'TWT':
        value = value.indexOf("@") === 0 ? value.slice(1) : value;
        break;

    case 'URL':
        value = value.indexOf("//") === -1 ? value : value.split('//')[1];
        break;

    case 'eip155:1':
        value = value.indexOf("0x") === 0 ? value : `0x${value}`;
        value = value.toLowerCase();
        break;
  }

  return `${type}:${value}`;
}
