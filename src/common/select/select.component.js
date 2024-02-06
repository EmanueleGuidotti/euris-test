import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import SelectMui from "@mui/material/Select";

const Select = ({ selectData, handleChange, selectValue, selectName }) => {
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

export { Select };
