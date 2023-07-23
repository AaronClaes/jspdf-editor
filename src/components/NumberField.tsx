import { Stack, TextField, TextFieldProps, styled } from "@mui/material";
import LayoutIconButton from "./LayoutIconButton";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { FC } from "react";

type NumberFieldProps = Omit<TextFieldProps, "type" | "onChange" | "value"> & {
  value: number;
  onChange: (value: number) => void;
};

const NumberField: FC<NumberFieldProps> = ({ onChange, ...rest }) => {
  const handleOnChange = (value: string | number) => {
    const numberValue = typeof value === "string" ? parseFloat(value) : value;
    onChange(numberValue);
  };

  const handleIncrease = () => {
    onChange(rest.value + 1);
  };
  const handleDecrease = () => {
    onChange(rest.value - 1);
  };

  return (
    <Stack spacing={1} direction="row" alignItems="center">
      <StyledTextField
        {...rest}
        type="number"
        size="small"
        onChange={(e) => handleOnChange(e.target.value)}
        InputProps={{
          sx: {
            input: {
              py: 0.5,
            },
            px: 0.5,
          },
          startAdornment: (
            <LayoutIconButton onClick={handleDecrease}>
              <FaMinus size="16" />
            </LayoutIconButton>
          ),
          endAdornment: (
            <>
              <LayoutIconButton onClick={handleIncrease}>
                <FaPlus size="16" />
              </LayoutIconButton>
            </>
          ),
        }}
      />
    </Stack>
  );
};

const StyledTextField = styled(TextField)(({ fullWidth }) => ({
  width: fullWidth ? "100%" : "120px",
  input: {
    textAlign: "center",
  },
  "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button": {
    "-webkit-appearance": "none",
    margin: 0,
  },
}));

export default NumberField;
