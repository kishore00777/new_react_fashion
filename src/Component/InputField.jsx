import React from "react";
import TextField from "@mui/material/TextField";

export default function InputField({
  id,
  name,
  label,
  value,
  onChange,
  type,
  file,
  variant,
  inputProps,
}) {
  return (
    <TextField
      id={id ?? label}
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      size="medium"
      fullWidth
      type={type || (file && "file")}
      variant={variant}
      inputProps={inputProps}
    />
  );
}
