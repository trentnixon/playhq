// clubs.js

import Link from "next/link";
import { fetcher } from "../../../lib/api";

const ClubsList = ({ clubs }) => {
  console.log(clubs);
  return (
    <div>
      <h1>Clubs List</h1>
      <ul>
        {clubs.data.map((club) => {
            console.log(club)
          return (
            <li key={club.id}>
              <Link href={`/campaign/gettingstartedwithfixtura/${club.attributes.Name}`}>
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
