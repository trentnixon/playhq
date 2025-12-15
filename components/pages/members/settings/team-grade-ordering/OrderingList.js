import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { DraggableItem } from './DraggableItem';
import { Text, Stack, Box, Badge } from '@mantine/core';
import { SubHeadersWithBadge } from '../../../../Members/Common/Type';

export const OrderingList = ({
  orderedGroups,
  handleDragEnd,
  AccType,
  loadingOrgDetails,
}) => {
  if (loadingOrgDetails) {
    return (
      <Text color='dimmed' align='center'>
        Loading grades...
      </Text>
    );
  }

  if (Object.keys(orderedGroups).length === 0) {
    return (
      <Text color='dimmed' align='center'>
        No grades found.
      </Text>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Stack spacing='xl'>
        {Object.entries(orderedGroups).map(([groupName, items]) => (
          <Box key={groupName}>
            <SubHeadersWithBadge
              Copy={
                AccType === 'Association'
                  ? decodeURIComponent(groupName)
                  : groupName
              }
              Badge={
                <Badge ml='sm' variant='light' color='members' size='sm'>
                  {items.length} grades
                </Badge>
              }
            />

            <Droppable droppableId={groupName}>
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    backgroundColor: snapshot.isDraggingOver
                      ? '#f1f3f5'
                      : 'transparent',
                    borderRadius: '8px',
                    padding: snapshot.isDraggingOver ? '8px' : '0',
                    transition: 'all 0.2s ease',
                    minHeight: '60px',
                  }}
                >
                  {items.map((item, index) => (
                    <DraggableItem
                      key={`${groupName}-${item.id}`}
                      item={item}
                      index={index}
                      name={item.attributes?.gradeName || 'Unknown Grade'}
                      groupName={groupName}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Box>
        ))}
      </Stack>
    </DragDropContext>
  );
};
