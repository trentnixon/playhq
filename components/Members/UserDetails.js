import { Input_FixturaSetting } from "./Common/formelements/Input_FixtruaSettings";
export const UserDetails = ({ user, setHasUpdated }) => {

  const INPUTS = [
    {
      Name: "Name",
      Label: "Account Holders Name",
      Field: "FirstName",
    },
    {
      Name: "Email",
      Label: "Email address for delivery",
      Field: "DeliveryAddress",
    },
  ];

  return (
    <>
      {INPUTS.map((Input, i) => {
        return (
          <Input_FixturaSetting
          key={i}
            Input={Input}
            user={user} 
            setHasUpdated={setHasUpdated}
          />
        );
      })}
    </>
  );
};
