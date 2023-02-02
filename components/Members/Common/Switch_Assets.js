import { useState, useEffect, useRef } from "react";
import { fetcher } from "../../../lib/api";
import Cookies from "js-cookie";
import { Box, Container, SimpleGrid, Space, Switch } from "@mantine/core";
import { P, SubHeaders } from "./Type";
import { ShadowWrapper } from "./Containers";
import { showNotification } from '@mantine/notifications';
const qs = require("qs");

const query = qs.stringify(
  {
    populate: ["Name", "description", "asset_category"],
  },
  {
    encodeValuesOnly: true,
  }
);

export const SwitchAssets = ({
  USERASSETS,
  COLLECTIONID,
  setHasUpdated = () => {},
}) => {
  const [UserSelectedAssets, setUserSelected] = useState(USERASSETS);
  const [items, setItems] = useState([]);
  const [AssetCategories, setAssetCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const previousValue = useRef();
 
  useEffect(() => {
    async function fetchData() {
      const response = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/assets/?${query}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("jwt")}`,
          },
        }
      );

      const groupedObjects = response.data.reduce((acc, obj) => {
        const key = obj.attributes.asset_category.data.attributes.Name;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
      }, {});

      const Descriptionobj = response.data.reduce((acc, obj) => {
        const key = obj.attributes.asset_category.data.attributes.Name;
        const value = obj.attributes.asset_category.data.attributes.description;
        acc[key] = value;
        return acc;
      }, {});

      setItems(groupedObjects);
      setAssetCategories(Descriptionobj);
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleChange = async (Asset) => {
    const isIncluded = UserSelectedAssets.some(
      (USERASSET) => USERASSET.id === Asset.id
    );

    if (isIncluded) {
      const updatedAssets = UserSelectedAssets.filter(
        (USERASSET) => USERASSET.id !== Asset.id
      );
      setUserSelected(updatedAssets);
    } else {
      const updatedAssets = [...UserSelectedAssets, Asset];

      setUserSelected(updatedAssets);
    }
  };

  const updateAPI = async (UserSelectedAssets) => {
    const assetIds = UserSelectedAssets.map((USERASSET) => USERASSET.id);

    try {
     await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/accounts/${COLLECTIONID}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("jwt")}`,
          },
          body: JSON.stringify({
            data: {
              assets: assetIds,
            },
          }),
        }
      );

      showNotification({
        title: 'Sync Completed',
        message: 'Your assets have been updated on your Account',
      })

    } catch (err) {
      setError(err.message);
    }

    setHasUpdated(true);
  };

  useEffect(() => {
    
    if (UserSelectedAssets !== previousValue.current) {
      updateAPI(UserSelectedAssets);
      previousValue.current = UserSelectedAssets;
    }
    
  }, [UserSelectedAssets]);

  const isAssetTrue = (ID) => {
    return UserSelectedAssets.some((USERASSET) => USERASSET.id === ID);
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <Container size={"md"}>
      {Object.entries(items).map(([key, value]) => {
        return (
          <div key={key}>
            <SubHeaders Copy={key} />
            <P Copy={AssetCategories[key]} />
            <ShadowWrapper BGColor={1} p={20}>
              
              <SimpleGrid cols={1} breakpoints={[{ minWidth: "lg", cols: 2 }]}>
                {value.map((Asset, i) => {
                  return (
                    <Box
                      key={i}
                      sx={(theme) => ({
                        padding: theme.spacing.xl,
                        border: `1px solid ${theme.colors.members[3]}`,
                        backgroundColor:theme.colors.members[0],
                        borderRadius: "5px",
                      })}
                    >
                      <Switch
                        label={Asset.attributes.Name}
                        description={Asset.attributes.description}
                        error=""
                        size="md"
                        color="green"
                        checked={isAssetTrue(Asset.id)}
                        onChange={() => handleChange(Asset)}
                      />
                    </Box>
                  );
                })}
              </SimpleGrid>
            </ShadowWrapper>
            <Space h={30} />
          </div>
        );
      })}
    </Container>
  );
};
