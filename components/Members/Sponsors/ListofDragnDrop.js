import { createStyles, Table, Image, Avatar, Group } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { IconCheck, IconGripVertical } from "@tabler/icons";
import { BTN_ONCLICK } from "../../../components/Members/Common/utils/Buttons";
import { useEffect, useState } from "react";
import { useAccountDetails } from "../../../lib/userContext";
import { CreateaSponsorForm } from "./TheForm";
import { FixturaLoading } from "../../../components/Members/Common/Loading";
import {
  useUpdateSponsor,
  useDeleteSponsor,
} from "../../../Hooks/useSponsorships";

const useStyles = createStyles((theme) => ({
  item: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  dragHandle: {
    ...theme.fn.focusStyles(),
    width: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[6],
  },
}));


export function DragnDropSponsorList({ SPONSORS, SPONSORLIMIT }) {
  // STYLES
  const { classes } = useStyles();
  // HOOKS
  const [UpdatedSponsor, UpdateSponsor] = useUpdateSponsor();
  const [DeleteSponsor, ConfirmDeleteSponsor] = useDeleteSponsor();

  const { ReRender } = useAccountDetails();
  const [state, handlers] = useListState(
    SPONSORS.sort((a, b) => a.attributes.Order - b.attributes.Order)
  );
  const [hasEdit, setHasEdit] = useState(false);
  const [Order, setOrder] = useState(100);
  const [isRerendering, setrerendering] = useState(false);

  const onDelete = (ID) => {
    console.log("onDelete", ID);
    ConfirmDeleteSponsor(ID);
    return true;
  };

  // USeEffect
  useEffect(() => {
    if (UpdatedSponsor?.data || DeleteSponsor?.data) {
      console.log("RUN RENDER NOW");
      setTimeout(() => {
        setrerendering(true);
        ReRender();
      }, 1000);
    }
  }, [UpdatedSponsor, DeleteSponsor]);

  useEffect(() => {
    if (isRerendering) {
      handlers.setState(
        SPONSORS.sort((a, b) => a.attributes.Order - b.attributes.Order)
      );
      //setrerendering(false)
    }
  }, [SPONSORS]);

  useEffect(() => {
    if (!isRerendering) {
      StoreOrder();
    }
  }, [state]);

  // FUNC
  const StoreOrder = () => {
    const OBJ = [];
    state.map((O, i) => {
      UpdateSponsor({ 
        Order: i, 
        isPrimary: i === 0 ? true : false, 
        isActive :i === 0 ? true : O.attributes.isActive 
      }
        , O.id);
    });
  
  };

  // MAPS
  const items = state.map((item, index) => (
    <Draggable
      index={index}
      key={`${index}_${item.attributes.Name}`}
      draggableId={`${index}_${item.attributes.Name}`}
    >
      {(provided) => (
        <tr
          className={classes.item}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <td>
            <div className={classes.dragHandle} {...provided.dragHandleProps}>
              <IconGripVertical size={18} stroke={1.5} />
            </div>
          </td>
          <td>
            <Image
              src={item.attributes.Logo.data.attributes.formats.thumbnail.url}
              width={50}
              height={50}
              radius={50}
            />
          </td>

          <td>{item.attributes.Name}</td>
          <td>{item.attributes.Tagline}</td>
          <td>
            {item.attributes.isActive ? (
              <Avatar color={"green"} size={20} radius={20}>
                <IconCheck size={40} />
              </Avatar>
            ) : (
              <DeleteBtn itemId={item.id} onDelete={onDelete} />
            )}
          </td>
          <td>
            {item.attributes.isPrimary ? (
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
                setHasEdit(item);
                setOrder(index);
              }}
              THEME={`cta`}
            />
          </td>
        </tr>
      )}
    </Draggable>
  ));

  if (hasEdit)
    return (
      <EditSponsor Sponsor={hasEdit} setHasEdit={setHasEdit} Order={Order} />
    );

  return (
    <>
      

      <DragDropContext
        onDragEnd={({ destination, source }) => {
          handlers.reorder({ from: source.index, to: destination?.index || 0 });
          setrerendering(false);
        }}
      >
        <Table sx={{ textAlign:'center', minWidth: 420, "& tbody tr td": { borderBottom: 0 } }}>
          <thead>
            <tr  >
              <th></th>
              <th></th>
              <th  style={{ textAlign:'center' }}>Name</th>
              <th  style={{ textAlign:'center' }}>Tagline</th>
              <th  style={{ textAlign:'center' }}>Active</th>
              <th  style={{ textAlign:'center' }}>Primary</th>
              <th  style={{ textAlign:'center' }}>Edit</th>
            </tr>
          </thead>
          <Droppable droppableId="dnd-list" direction="vertical">
            {(provided) => (
              <tbody {...provided.droppableProps} ref={provided.innerRef}>
                {items}
                {provided.placeholder}
              </tbody>
            )}
          </Droppable>
        </Table>
      </DragDropContext>
    </>
  );
}

export default DragnDropSponsorList



const EditSponsor = ({ Sponsor, setHasEdit, Order }) => {
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
          isActive: Sponsor.attributes.isActive,
          Order: Order,
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

const DeleteBtn = ({ itemId, onDelete }) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (isConfirming) {
      setIsLoading(true);
      onDelete(itemId);
      //setIsLoading(false);
    } else {
      setIsConfirming(true);
    }
  };

  const handleBack = () => {
    setIsConfirming(false);
  };

  if (isLoading) {
    return <FixturaLoading />;
  }
  return (
    <>
      {isConfirming ? (
        <>
          <Group position="apart">
            <BTN_ONCLICK LABEL={"Back"} HANDLE={handleBack} THEME={`error`} />
            <BTN_ONCLICK
              LABEL={"Confirm"}
              HANDLE={handleDelete}
              THEME={`success`}
            />
          </Group>
        </>
      ) : (
        <BTN_ONCLICK LABEL={"Delete"} HANDLE={handleDelete} THEME={`error`} />
      )}
    </>
  );
};