import { useEffect, useState } from "react";
import {
  createStyles,
  Table,
  Image,
  Avatar,
  Box,
  Container,
} from "@mantine/core";
import { useListState, useMediaQuery } from "@mantine/hooks";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { IconCheck, IconGripVertical } from "@tabler/icons";
import { BTN_ONCLICK } from "../../../../Members/Common/utils/Buttons";

import {
  useUpdateSponsor,
  useDeleteSponsor,
} from "../../../../../Hooks/useSponsorships";
import { EditSponsor } from "./EditSponsor";

import { IconX } from "@tabler/icons-react";
import { useAccountDetails } from "../../../../../context/userContext";
import { P } from "../../../../Members/Common/Type";
import { SponsorDeleteBtn } from "./SponsorDeleteBtn";

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
  const matches = useMediaQuery("(min-width: 48em)");
  const { ReRender } = useAccountDetails();
  const [state, handlers] = useListState(
    SPONSORS.sort((a, b) => a.attributes.Order - b.attributes.Order)
  );
  const [hasEdit, setHasEdit] = useState(false);
  const [Order, setOrder] = useState(100);
  const [isRerendering, setrerendering] = useState(false);

  const onDelete = (ID) => {
    //console.log("onDelete", ID);
    ConfirmDeleteSponsor(ID);
    return true;
  };

  // USeEffect
  useEffect(() => {
    if (UpdatedSponsor?.data || DeleteSponsor?.data) {
      //console.log("RUN RENDER NOW");
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
      UpdateSponsor(
        {
          Order: i,
          isPrimary: i === 0 ? true : false,
          isActive: i === 0 ? true : O.attributes.isActive,
        },
        O.id
      );
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
            {item?.attributes?.Logo?.data?.attributes?.formats?.thumbnail
              ?.url === undefined ? (
              "Error"
            ) : (
              <Image
                src={
                  item?.attributes?.Logo?.data?.attributes?.formats?.thumbnail
                    ?.url
                }
                width={50}
                height={50}
                radius={50}
              />
            )}
          </td>

          <td>
            <P marginBottom={0} size={matches ? "sm" : "sm"}>
              {item.attributes.Name}
            </P>
          </td>
          {matches ? <td>{item.attributes.Tagline}</td> : false}

          {/*   {matches ? (
            <td align="center">
              {item.attributes.isPrimary ? (
                <Avatar color={"green"} size={20} radius={20}>
                  <IconCheck size={40} />
                </Avatar>
              ) : (
                false
              )}
            </td>
          ) : (
            false
          )} */}
          {/*  {matches ? (
            <td align="center">
              {item.attributes.isVideo ? (
                <Avatar color={"green"} size={20} radius={20}>
                  <IconCheck size={40} />
                </Avatar>
              ) : (
                <Avatar color={"red"} size={20} radius={20}>
                  <IconX size={40} />
                </Avatar>
              )}
            </td>
          ) : (
            false
          )} */}
          {/* {matches ? (
            <td align="center">
              {item.attributes.isArticle ? (
                <Avatar color={"green"} size={20} radius={20}>
                  <IconCheck size={40} />
                </Avatar>
              ) : (
                <Avatar color={"red"} size={20} radius={20}>
                  <IconX size={40} />
                </Avatar>
              )}
            </td>
          ) : (
            false
          )} */}
          {matches ? (
            <td align="center">
              {item.attributes.isActive ? (
                <Avatar color={"green"} size={20} radius={20}>
                  <IconCheck size={40} />
                </Avatar>
              ) : (
                false
              )}
            </td>
          ) : (
            false
          )}
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
          <td>
            <SponsorDeleteBtn itemId={item.id} onDelete={onDelete} />
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
    <Container fluid px={0}>
      <Box
        mt={50}
        sx={(theme) => ({
          padding: "10px 0px",
        })}
      >
        <DragDropContext
          onDragEnd={({ destination, source }) => {
            handlers.reorder({
              from: source.index,
              to: destination?.index || 0,
            });
            setrerendering(false);
          }}
        >
          <Table
            sx={{
              textAlign: "center",
              minWidth: "auto",
              "& tbody tr td": { borderBottom: 0 },
            }}
          >
            <thead>
              <tr>
                <th></th>
                <th></th>

                <th style={{ textAlign: "center" }}>
                  {matches ? `Name` : false}
                </th>
                {matches ? (
                  <th style={{ textAlign: "center" }}>Tagline</th>
                ) : (
                  false
                )}

                {/* {matches ? (
                  <th style={{ textAlign: "center" }}>Videos</th>
                ) : (
                  false
                )} */}
                {/* {matches ? (
                  <th style={{ textAlign: "center" }}>Articles</th>
                ) : (
                  false
                )} */}
                {matches ? (
                  <th style={{ textAlign: "center" }}>Active</th>
                ) : (
                  false
                )}
                <th style={{ textAlign: "center" }}></th>
                <th style={{ textAlign: "center" }}>Remove Sponsor</th>
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
      </Box>
    </Container>
  );
}
export default DragnDropSponsorList;
