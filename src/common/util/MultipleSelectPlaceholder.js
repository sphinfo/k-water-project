import { FormControl, MenuItem, OutlinedInput, Select, useTheme } from '@mui/material';
import React, { useState } from 'react';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const getStyles =(name, personName, theme)=>{
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


const MultipleSelectPlaceholder = ({options=[], }) => {

  const theme = useTheme();
  const [positionName, setPositionName] = useState([]);

  const handleChange = (event) => {
    const { target: { value }, } = event;

    console.info(value)
    setPositionName( typeof value === 'string' ? value.split(',') : value, );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
        <Select
          multiple
          displayEmpty
          value={positionName}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>연구 대상 지역</em>;
            }

            return selected.join(', ');
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="">
            <em>연구 대상 지역</em>
          </MenuItem>
          {options.map((optionsObj) => (
            <div>{optionsObj.name}</div>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultipleSelectPlaceholder;