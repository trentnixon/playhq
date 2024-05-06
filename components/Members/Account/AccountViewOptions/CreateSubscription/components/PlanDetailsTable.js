import { Paper, Table } from "@mantine/core";
import dayjs from "dayjs";
import { P } from "../../../../Common/Type";

// Functional component to display plan details in a table format
export const PlanDetailsTable = ({ selectedDate, endDate }) => {
  // Dev note: Verify if the `selectedDate` and `endDate` properties exist and are valid
  if (
    !selectedDate ||
    !endDate ||
    !endDate.month1 ||
    !endDate.month3 ||
    !endDate.month6
  ) {
    throw new Error("Missing or invalid date parameters.");
  }

  // Helper function to format date using dayjs
  const formatDate = (date) => dayjs(date).format("MMMM DD, YYYY");

  // Array of plan details to render table rows dynamically
  const planDetails = [
    { duration: "1 Month Pass:", days: 30, end: endDate.month1 },
    { duration: "3 Months Pass:", days: 90, end: endDate.month3 },
    { duration: "12 Months Pass:", days: 365, end: endDate.month6 },
  ];

  return (
    <>
      <P marginBottom={0}>Available Plans</P>
      <Paper p="xs" withBorder shadow="md" sx={{ backgroundColor: "white" }}>
        <Table striped>
          <thead>
            <tr>
              <th>
                <P marginBottom={0} Weight={800}>
                  Plan
                </P>
              </th>
              <th>
                <P marginBottom={0} Weight={800}>
                  Covers
                </P>
              </th>
              <th>
                <P marginBottom={0} Weight={800} textAlign="center">
                  Start Date
                </P>
              </th>
              <th>
                <P marginBottom={0} Weight={800} textAlign="right">
                  End Date
                </P>
              </th>
            </tr>
          </thead>
          <tbody>
            {planDetails.map((plan) => (
              <tr key={plan.duration}>
                <td>
                  <P marginBottom={0}>{plan.duration}</P>
                </td>
                <td>
                  <P marginBottom={0}>{plan.days} days</P>
                </td>
                <td>
                  <P marginBottom={0} textAlign="center">
                    {formatDate(selectedDate)}
                  </P>
                </td>
                <td>
                  <P marginBottom={0} textAlign="right">
                    {formatDate(plan.end)}
                  </P>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Paper>
    </>
  );
};

// Future improvements:
// - Add validation for the structure and existence of properties within `endDate` to ensure robustness.
// - Implement accessibility improvements such as aria-labels for better SEO and user experience.
// - Consider adding the ability to customize table styles and behaviors through props for increased flexibility.

// Developer Notes:
// - This component dynamically generates rows based on the plan details defined in an array, reducing redundancy and making it easy to add or remove plans.
// - Located under the `src/components/Subscription/Details` folder path.
// - It accepts `selectedDate` and `endDate` as props and displays a formatted date table for different subscription plans.
