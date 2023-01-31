import { Avatar, Image, Switch, Table } from "@mantine/core";
import { IconCheck } from "@tabler/icons";
import { useEffect, useState } from "react";
import { P, SubHeaders } from "../../../components/Members/Common/Type";
import { BTN_ONCLICK } from "../../../components/Members/Common/utils/Buttons";
import { useAccountDetails } from "../../../lib/userContext";
import { CreateaSponsorForm } from "./TheForm";


/*
    TODO:
    EDIT Sponsor: 
    COnvert theform to be able to handle to different types of processes
    1) create
    2) edit
    values passed in the OBJ will determine this!

    change logo image needs to be done
    update sponsor detials hook tbc
    add to form active and primary switches

*/


export const ListOf = ({ SPONSORS,SPONSORLIMIT,setIsCreate }) => {
  useEffect(() => {
    console.log(SPONSORS);
  }, [SPONSORS]);

  const [hasEdit, setHasEdit] = useState(false);

  if (hasEdit) return <EditSponsor Sponsor={hasEdit} setHasEdit={setHasEdit} />;

  return (
    <>
        <SubHeaders Copy={`Created Sponsors`}/>
      <P
        Copy={`${SPONSORS.length} sponsors ${
          SPONSORLIMIT - SPONSORS.length
        } spaces remaining`}
      />
      <Table sx={{ minWidth: 700 }}>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Tagline</th>
            <th>Active</th>
            <th>Primary</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {SPONSORS.map((s, i) => {
            return (
              <tr key={i}>
                <td>
                  <Image
                    src={
                      s.attributes.Logo.data.attributes.formats.thumbnail.url
                    }
                    width={50}
                    height={50}
                    radius={50}
                  />
                </td>
                <td>{s.attributes.Name}</td>
                <td>{s.attributes.Tagline}</td>

                <td>
                  {s.attributes.isActive ? (
                    <Avatar color={"green"} size={20} radius={20}>
                      <IconCheck size={40} />
                    </Avatar>
                  ) : (
                    false
                  )}
                </td>
                <td>
                  {s.attributes.isPrimary ? (
                    <Avatar color={"green"} size={20} radius={20}>
                      <IconCheck size={40} />
                    </Avatar>
                  ) : (
                    false
                  )}
                </td>
                <td>
                  <BTN_ONCLICK
                    LABEL={`Edit`}
                    HANDLE={() => {
                      setHasEdit(s);
                     
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default ListOf


const EditSponsor = ({ Sponsor, setHasEdit }) => {
  console.log(Sponsor.attributes.Name);
  // HOOKS
  const { account, ReRender } = useAccountDetails();
  const [userAccount, setUserAccount] = useState(account);
  return (
    <>
      <CreateaSponsorForm
        OBJ={{
          Name: Sponsor.attributes.Name,
          URL: Sponsor.attributes.URL,
          Tagline: Sponsor.attributes.Tagline,
          Logo: Sponsor.attributes.Logo.data.id,
          LogoPath: Sponsor.attributes.Logo.data,
          account: [userAccount.id],
          Create: false,
          UpdateSponsor: Sponsor.id,
          isActive: Sponsor.attributes.isActive
        }}
      />
      <BTN_ONCLICK
        LABEL={`Back`}
        HANDLE={() => {
          setHasEdit(false);
        }}
      />
    </>
  );
};
