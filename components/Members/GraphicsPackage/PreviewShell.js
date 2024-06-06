import { useEffect, useState } from "react";
import { Paper } from "@mantine/core";
import { MembersPreviewPlayer } from "./Player";
import { P } from "../Common/Type";
import { prepareMockData } from "../../../utils/Remotion/RemotionPrepareMockData";

export const MembersPreviewShell = ({
  userAccount,
  selectedAsset,
  selectedHeroImage,
}) => {
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    const data = prepareMockData(userAccount);
    let filtered = data.find(
      (item) => item.data.VIDEOMETA.Video.CompositionID === selectedAsset
    );

    if (filtered && selectedHeroImage) {
      // Replace HeroImage with selectedHeroImage if it's not null
      filtered = {
        ...filtered,
        data: {
          ...filtered.data,
          VIDEOMETA: {
            ...filtered.data.VIDEOMETA,
            Video: {
              ...filtered.data.VIDEOMETA.Video,
              HeroImage: {
                ...filtered.data.VIDEOMETA.Video.HeroImage,
                ...selectedHeroImage,
              },
            },
          },
        },
      };
    }

    setFilteredData(filtered);
  }, [userAccount, selectedAsset, selectedHeroImage]);

  if (!filteredData) {
    return <P>Loading...</P>;
  }

  return (
    <Paper shadow="md" w={"100%"} p={0} withBorder>
      <MembersPreviewPlayer Data={filteredData} />
    </Paper>
  );
};
