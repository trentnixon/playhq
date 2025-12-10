import { Paper, Group, ThemeIcon, Text, Box } from '@mantine/core';
import { IconGripVertical } from '@tabler/icons-react';
import { Draggable } from 'react-beautiful-dnd';

export const DraggableItem = ({ item, index, name, groupName }) => {
  return (
    <Draggable draggableId={`${groupName}-item-${item.id}`} index={index}>
      {(provided, snapshot) => (
        <Paper
          ref={provided.innerRef}
          {...provided.draggableProps}
          shadow={snapshot.isDragging ? 'xs' : 'none'}
          p='sm'
          mb='sm'
          withBorder
          radius='md'
          style={{
            ...provided.draggableProps.style,
            backgroundColor: snapshot.isDragging ? '#e3f0f9' : 'white',
            borderColor: snapshot.isDragging ? '#4C72A0' : '#dee2e6',
            borderWidth: snapshot.isDragging ? '2px' : '1px',
          }}
        >
          <Group position='apart' noWrap>
            <Group spacing='md' noWrap>
              {/* Order Number */}
              <ThemeIcon
                color='members.3'
                variant='filled'
                size={36}
                radius='sm'
              >
                <Text size='sm' weight={700} color='white'>
                  {index + 1}
                </Text>
              </ThemeIcon>

              {/* Item Name */}
              <Text weight={500} size='md' color='members.2'>
                {name}
              </Text>
            </Group>

            {/* Drag Handle */}
            <Box {...provided.dragHandleProps}>
              <ThemeIcon
                color='gray'
                variant='light'
                size={38}
                radius='md'
                style={{
                  cursor: snapshot.isDragging ? 'grabbing' : 'grab',
                }}
              >
                <IconGripVertical size={20} />
              </ThemeIcon>
            </Box>
          </Group>
        </Paper>
      )}
    </Draggable>
  );
};
