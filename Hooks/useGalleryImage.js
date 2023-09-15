import Cookies from "js-cookie";
import { useState } from "react";
import { fetcher } from "../lib/api";
import { getAccountIDFromServer } from "../lib/auth";

export const useSetImage = (ctx) => {
  const [Image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createSetImage = async (PATH, OBJ) => {
    setImage(null);
    setError(null);
    setLoading(true);

    try {
      const ID = await getAccountIDFromServer();

      if (ID !== undefined) {
        const res = await fetcher(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/${PATH}`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("jwt")}`,
            },
            body: JSON.stringify(OBJ),
          }
        );

        setImage(res.data);
      }
    } catch (err) {
      // Handle any errors
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return [createSetImage, loading, error, Image];
};

export const useUpdateSetImage = () => {
  const [updatedImage, setUpdatedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateSetImage = async (imageId, updateData) => {
    setUpdatedImage(null);
    setError(null);
    setLoading(true);

    try {
      const ID = await getAccountIDFromServer();

      if (ID !== undefined) {
        const res = await fetcher(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/account-media-libraries/${imageId}`,
          {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("jwt")}`,
            },
            body: JSON.stringify(updateData),
          }
        );

        setUpdatedImage(res.data);
      }
    } catch (err) {
      // Handle any errors
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return [updateSetImage, loading, error, updatedImage];
};

export const useDeleteMediaItem = () => {
    const [deletedImage, setDeletedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const deleteMediaItem = async (imageId) => {
      setDeletedImage(null);
      setError(null);
      setLoading(true);
  
      try {
        const ID = await getAccountIDFromServer();
  
        if (ID !== undefined) {
          const res = await fetcher(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/account-media-libraries/${imageId}`,
            {
              method: "DELETE",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("jwt")}`,
              },
            }
          );
  
          setDeletedImage(res.data);
        }
      } catch (err) {
        // Handle any errors
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    return [deleteMediaItem, loading, error, deletedImage];
  };