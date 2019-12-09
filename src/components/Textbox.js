import React from 'react';
import PropTypes from 'prop-types';

const Textbox = ({name, value, placeholder, onChange, isPassword}) => {
  return (
    <input
      name={name}
      type={isPassword ? 'password' : 'text'}
      placeholder={placeholder}
      value={value}
      onChange={onChange} />
  );
};

Textbox.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  isPassword: PropTypes.bool,
};

export default Textbox;
