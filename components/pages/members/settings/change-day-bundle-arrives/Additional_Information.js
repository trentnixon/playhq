import { P } from "../../../../Members/Common/Type";

export const TipsAndWarnings = () => {
  return (
    <>
      <P>
        Fixtura aggregates your fixture data one hour before your render is due.
        Please ensure that all your fixture data is updated in PlayHQ by then,
        as recalculations may not be possible if the data is incomplete.
      </P>
      <P>
        Saturday and Sunday delivery options are unavailable as these days are
        reserved for the majority of fixtures. If you need weekend delivery,
        please contact our support team.
      </P>
      <P fontStyle="italic">
        Note: We do not currently support bi-weekly renders; however, this
        feature may be available in the future.
      </P>
    </>
  );
};
