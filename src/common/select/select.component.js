import { FormControl, MenuItem, InputLabel, Box } from "@mui/material";
import SelectMui from "@mui/material/Select";
import PropTypes from "prop-types";

const SelectComponent = ({
  selectData,
  handleChange,
  selectValue,
  selectName,
}) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="select-label">{selectName}</InputLabel>
        <SelectMui
          labelId="select-label"
          id="select"
          value={selectValue}
          label={selectName}
          onChange={handleChange}
        >
          {selectData?.map(({ id, data: { name } }) => {
            return (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            );
          })}
        </SelectMui>
      </FormControl>
    </Box>
  );
};

SelectComponent.propTypes = {
  selectData: PropTypes.array,
  handleChange: PropTypes.func,
  selectValue: PropTypes.string,
  selectName: PropTypes.string,
};

export { SelectComponent };
