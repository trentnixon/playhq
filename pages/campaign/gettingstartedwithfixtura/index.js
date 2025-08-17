// clubs.js

import Link from 'next/link';
import { fetcher } from '../../../lib/api';

const ClubsList = ({ clubs }) => {
  return (
    <div>
      <h1>Clubs List</h1>
      <ul>
        {clubs.data.map(club => {
          return (
            <li key={club.id}>
              <Link
                legacyBehavior
                href={`/campaign/gettingstartedwithfixtura/${club.attributes.PlayHQID}`}
              >
                <a>{club.attributes.Name}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ClubsList;

export const getStaticProps = async () => {
  const clubs = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/clubs`);

  return {
    props: {
      clubs,
    },
  };
};
