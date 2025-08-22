import React, { useEffect, useRef } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import styles from "./BaseForm.module.css";
import { toast } from "react-toastify";

const BaseForm = ({
  title,
  fields,
  onSubmit,
  initialValues = {},
  disableSuccessToast = false,
  toastValue,
  radioOptions,
}) => {
  const [formData, setFormData] = React.useState({});
  const inputRefs = useRef([]);
  const [errors, setErrors] = React.useState({});

  useEffect(() => {
    let initial = { ...initialValues };

    if (
      radioOptions &&
      radioOptions.defaultValue &&
      !initial[radioOptions.name]
    ) {
      initial[radioOptions.name] = radioOptions.defaultValue;
    }

    setFormData(initial);
  }, [initialValues, radioOptions]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (index < fields.length - 1) {
        inputRefs.current[index + 1]?.focus();
      } else {
        inputRefs.current[fields.length]?.click();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    let hasError = false;

    fields.forEach((field) => {
      if (!formData[field.name] || formData[field.name].trim() === "") {
        newErrors[field.name] = "This field is required";
        toast.error(`${field.label} is required!`, {
          position: "bottom-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        hasError = true;
      }
    });

    if (radioOptions && !formData[radioOptions.name]) {
      newErrors[radioOptions.name] = `${radioOptions.label} is required`;
      toast.error(`${radioOptions.label} is required!`, {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) return;
    onSubmit(formData);

    if (!disableSuccessToast) {
      toast.success(`${toastValue} Successfully!`, {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <Box className={styles.baseForm}>
      <Typography variant="h4" sx={{ fontWeight: "bold" }} mb={2} color="teal">
        {title}
      </Typography>
      <form onSubmit={handleSubmit}>
        {fields.map((field, index) => (
          <TextField
            key={index}
            value={formData[field.name] || ""}
            fullWidth
            onKeyDown={(e) => handleKeyDown(e, index)}
            inputRef={(el) => (inputRefs.current[index] = el)}
            label={field.label}
            name={field.name}
            type={field.type || "text"}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              "& label.Mui-focused": {
                color: "#009e97",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "gray",
                },
                "&:hover fieldset": {
                  borderColor: "#009e97",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#009e97",
                },
              },
              pb: "10px",
            }}
          />
        ))}
        {radioOptions && (
          <Box mb={2}>
            <FormLabel component="legend">{radioOptions.label}</FormLabel>
            <RadioGroup
              row
              name={radioOptions.name}
              value={formData[radioOptions.name] || ""}
              onChange={handleChange}
            >
              {radioOptions.options.map((opt, idx) => (
                <FormControlLabel
                  key={idx}
                  value={opt.value}
                  control={
                    <Radio
                      sx={{
                        color: "#009e97",
                        "&.Mui-checked": { color: "#009e97" },
                      }}
                    />
                  }
                  label={opt.label}
                />
              ))}
            </RadioGroup>
          </Box>
        )}
        <Button
          ref={(el) => (inputRefs.current[fields.length] = el)}
          variant="contained"
          type="submit"
          fullWidth
          sx={{ bgcolor: "teal" }}
        >
          {title}
        </Button>
      </form>
    </Box>
  );
};

export default BaseForm;
