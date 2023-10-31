import React from 'react';

const TextInput = ({ value, onChange, placeholder='', placeholderTextColor='', onKeyPress, className='' }) => {

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      if (onKeyPress) {
        onKeyPress();
      }
    }
  };

  return (
    <input 
      type="text" 
      className={className}
      value={value} 
      onChange={onChange}  
      placeholder={placeholder} 
      placeholdertextcolor={placeholderTextColor}
      onKeyPress={handleKeyPress}
    />
  );
};

export default TextInput;