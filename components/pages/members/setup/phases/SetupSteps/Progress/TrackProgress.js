import { Progress, Table, Loader, useMantineTheme, Paper } from "@mantine/core";
import { P } from "../../../../../../Members/Common/Type";

function SyncProgress({ processingTracker }) {
  const { currentStage, completedStages, pendingStages, ...stages } =
    processingTracker;
  const theme = useMantineTheme();
  const totalStages = Object.keys(stages).length;
  const completedCount = completedStages.length;
  const progressPerStage = 100 / totalStages;

  // Creating sections for the progress bar
  const progressSections = Object.entries(stages).map(
    ([stage, data], index) => {
      const isCompleted = completedStages.includes(stage);
      const isCurrent = currentStage === stage;
      let value = 0;

      if (isCompleted) {
        value = progressPerStage;
      } else if (isCurrent) {
        value = progressPerStage / 2; // Adjust this value as needed
      }

      return {
        value: value,
        color: theme.colors.blue[index + 2 * 3], // Alternate colors, adjust as needed
        label: stage.charAt(0).toUpperCase() + stage.slice(1),
        tooltip: `${stage.charAt(0).toUpperCase() + stage.slice(1)} – ${
          data.itemsFound
        } items found`,
      };
    }
  );

  // Generating table data
  const rows = Object.entries(stages)
    .filter(([stage]) => stage !== "totalStages")
    .map(([stage, data]) => {
      const stageName = stage.charAt(0).toUpperCase() + stage.slice(1);
      const isCurrentStage =
        currentStage && currentStage.toLowerCase() === stage;

      return (
        <tr key={stage}>
          <td>
            <P marginBottom={0}>{stageName}</P>
          </td>

          <td>
            {isCurrentStage ? (
              <Loader size="md" variant="dots" color="blue" />
            ) : (
              <P marginBottom={0} textAlign="right">
                {data.itemsFound}
              </P>
            )}
          </td>
        </tr>
      );
    });

  return (
    <>
      <Paper shadow="sm" p="md" mx={"xl"} withBorder>
        <Progress
          value={completedCount * progressPerStage}
          label={
            currentStage
              ? `Currently processing: ${currentStage}`
              : "Processing complete"
          }
          size="xl"
          radius="xl"
          sections={progressSections}
        />
      </Paper>
      <Paper shadow="sm" p="md" m={20} mx={"xl"} withBorder>
        <Table striped>
          <thead>
            <tr>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Paper>
    </>
  );
}

export default SyncProgress;
