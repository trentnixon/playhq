import { Box } from "@mantine/core";
import { useState } from "react";

export const InputFormContainer = ({ Input, FORMMETA, setFORMMETA }) => {
    const [error, setError] = useState(null);
  
    const handleChange = (e) => {
      setFORMMETA({ ...FORMMETA, [Input.Property]: e.target.value });
      if (Input.Property === "Name") {
        if (!/^[a-zA-Z\s]*$/.test(e.target.value)) {
          setError("Name can only contain letters and spaces");
        } else {
          setError(null);
        }
      }
      if (Input.Property === "URL") {
        if (
          !/^(https?:\/\/)?(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(
            e.target.value
          )
        ) {
          setError("Invalid URL format");
        } else {
          setError(null);
        }
      }
      if (Input.Property === "Tagline") {
        if (e.target.value.length > 120) {
          setError("Tagline must be less than 120 characters");
        } else {
          setError(null);
        }
      }
    };
  
    return (
        
      <Box
        sx={(theme) => ({
          marginBottom: "10px",
        })}
      >
        <input
          type="text"
          className="form-control"
          value={FORMMETA[Input.Property]}
          placeholder={Input.placeholder}
          onChange={handleChange}
        />
        {error && <div className="error">{error}</div>}
      </Box>
    );
  };