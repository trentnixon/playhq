import { useEffect, useState } from "react";
import { Checkbox } from "@mantine/core";
import Cookies from "js-cookie";
import { fetcher } from "../../../../lib/api";

const DBCheckbox = ({
  label,
  name,
  CollectionSaveTo,
  collectionId,
  setHasUpdated,
}) => {
  const [isChecked, setIsChecked] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle checkbox changes
  const handleChange = async (event) => {
    setLoading(true);
    setIsChecked(event.currentTarget.checked);
    try {
      const response = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/${CollectionSaveTo}/${collectionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("jwt")}`,
          },
          body: JSON.stringify({
            data: { [name]: event.currentTarget.checked?event.currentTarget.checked:null },
          }),
        }
      );

      //
      if (response) {
      
        setHasUpdated(); // Trigger any updates if necessary
      }
    } catch (error) {
      console.error("Failed to update checkbox:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Checkbox
      label={label}
      checked={isChecked}
      disabled={loading}
      onChange={handleChange}
    />
  );
};

export default DBCheckbox;
