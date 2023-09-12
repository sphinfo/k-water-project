import React from 'react';

const TextInput = ({ value, onChange, placeholder='', placeholderTextColor, onKeyPress }) => {
  return (
    <input 
      type="text" 
      value={value} 
      onChange={onChange}  
      placeholder={placeholder} 
      placeholdertextcolor={placeholderTextColor}
      onKeyPress={onKeyPress}
    />
  );
};

export default TextInput;