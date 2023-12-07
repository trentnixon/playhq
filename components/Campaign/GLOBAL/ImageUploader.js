import { Box, Button, Group, Image } from "@mantine/core";
import React, { useRef, useState } from "react";
import { P } from "../../Members/Common/Type";

const ImageUploader = ({ onImageSelect }) => {
  const [logoUrl, setLogoUrl] = useState("");
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setLogoUrl(base64String);
        onImageSelect(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  return (
    <Box>
      <Group position="apart">
        <Button onClick={handleButtonClick} color="blue">
          <P marginBottom={0} color="white">
            Upload Image
          </P>
        </Button>
        <input
          ref={fileInputRef}
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />

        {logoUrl && (
          <Image
            height={100}
            width={"auto"}
            src={logoUrl}
            alt="Uploaded Logo"
          />
        )}
      </Group>
    </Box>
  );
};

export default ImageUploader;
