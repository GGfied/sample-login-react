import React from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({name, choices, selectedChoice, onChange}) => {
  return (
    <select name={name} onChange={onChange} defaultValue={selectedChoice}>
    {choices.map(({ name, value }) =>
      <option key={name} value={name}>{value}</option>
      )}
      </select>
      );
  };

Dropdown.propTypes = {
  name: PropTypes.string.isRequired,
  choices: PropTypes.arrayOf(
    PropTypes.shape({
     name: PropTypes.string.isRequired,
     value: PropTypes.string.isRequired
   })
    ).isRequired,
  selectedChoice: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Dropdown;
