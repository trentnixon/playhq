import React from "react";
import { Table } from "@mantine/core";
import SponsorshipForm from "./SponsorshipForm";
import { RoundedSectionContainer } from "../../../../UI/Containers/SectionContainer";
import { SponsorGroupTitles } from "./SponsorshipTitle";

const SponsorshipGroup = ({
  title,
  description,
  levels,
  sponsors,
  accountType,
}) => {
  if (!levels || levels.length === 0) return null;

  return (
    <RoundedSectionContainer
      headerContent={""}
      topContent={
        <SponsorGroupTitles title={title} description={description} />
      }
      bottomContent={
        <Table>
          <tbody>
            {levels.map((level) => (
              <SponsorshipForm
                key={level.id}
                level={level}
                sponsors={sponsors}
                accountType={accountType}
              />
            ))}
          </tbody>
        </Table>
      }
    />
  );
};

export default SponsorshipGroup;
