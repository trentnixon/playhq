import { useState } from 'react';
import { Table, Badge, Group, Button } from '@mantine/core';
import { IconClock, IconEye } from '@tabler/icons-react';
import { FixtureDetailModal } from './FixtureDetailModal';
import { P } from '@/components/Members/Common/Type';

export const FixtureTable = props => {
  const [selectedFixture, setSelectedFixture] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);
  const {
    gameDays,
    isNextFixtureList,
    isPreviousFixtures = false,
    nextFixtureDate,
  } = props;

  const handleFixtureClick = (game, month, date, isNextFixture) => {
    setSelectedFixture({ ...game, month, date, isNextFixture });
    setModalOpened(true);
  };

  return (
    <>
      <FixtureDetailModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        fixture={selectedFixture}
      />

      {gameDays.map(({ date, games }, index) => {
        // Check if this date matches the next fixture date
        const isNextFixtureDate =
          !isPreviousFixtures &&
          isNextFixtureList &&
          nextFixtureDate &&
          date.getTime() === nextFixtureDate.getTime();

        return (
          <Table mt={30} striped highlightOnHover key={index}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Home</th>
                <th></th>
                <th>Away</th>
                <th>Grade</th>
                {isPreviousFixtures && <th>Result</th>}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {games.map((game, gameIndex) => (
                <Row
                  key={gameIndex}
                  game={game}
                  month={date.toLocaleDateString(undefined, {
                    month: 'long',
                  })}
                  date={getOrdinalSuffix(date.getDate())}
                  isNextFixture={isNextFixtureDate}
                  isPreviousFixtures={isPreviousFixtures}
                  onViewClick={() =>
                    handleFixtureClick(
                      game,
                      date.toLocaleDateString(undefined, { month: 'long' }),
                      getOrdinalSuffix(date.getDate()),
                      isNextFixtureDate
                    )
                  }
                />
              ))}
            </tbody>
          </Table>
        );
      })}
    </>
  );
};

const getOrdinalSuffix = day => {
  if (day % 10 === 1 && day !== 11) return `${day}st`;
  if (day % 10 === 2 && day !== 12) return `${day}nd`;
  if (day % 10 === 3 && day !== 13) return `${day}rd`;
  return `${day}th`;
};

const Row = ({
  game,
  month,
  date,
  isNextFixture,
  isPreviousFixtures,
  onViewClick,
}) => (
  <tr
    style={{
      backgroundColor: isNextFixture ? '#e7f5ff' : 'transparent',
      opacity: isPreviousFixtures ? 0.7 : 1,
      color: isPreviousFixtures ? '#868e96' : 'inherit',
      borderLeft: isNextFixture ? '4px solid #228be6' : 'none',
    }}
    aria-label={isNextFixture ? 'Next upcoming fixture' : undefined}
  >
    <td>
      <P size={12} color={8} Weight={600} marginBottom={0}>
        {date} {month}
      </P>
    </td>
    <td>
      <P size={12} color={8} Weight={600} marginBottom={0}>
        {game.teamHome}
      </P>
    </td>
    <td>
      <P size={12} color={8} Weight={600} marginBottom={0}>
        vs
      </P>
    </td>
    <td>
      <P size={12} color={8} Weight={600} marginBottom={0}>
        {game.teamAway}
      </P>
    </td>
    <td>
      <P size={12} color={8} Weight={600} marginBottom={0}>
        {game.grade || '-'}
      </P>
    </td>
    {isPreviousFixtures && (
      <td>
        <P size={12} color={8} Weight={600} marginBottom={0}>
          {game.status && (
            <Badge size='xs' color='gray' variant='outline'>
              {game.status}
            </Badge>
          )}
        </P>
      </td>
    )}
    <td>
      <Button
        size='xs'
        variant='outline'
        leftIcon={<IconEye size={14} />}
        onClick={onViewClick}
      >
        View
      </Button>
    </td>
  </tr>
);
