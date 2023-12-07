import Link from "next/link";
import { fetcher } from "../../../lib/api";

const AssociationsList = ({ associations }) => {
  return (
    <div>
      <h1>Associations List</h1>
      <ul>
        {associations.data.map((association) => {
          return (
            <li key={association.id}>
              <Link
                href={`/campaign/Simplify-Your-Social-Media-with-Fixtura/${association.attributes.PlayHQID}`}
              >
                <a>{association.attributes.Name}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AssociationsList;

export const getStaticProps = async () => {
  const associations = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/associations`
  );

  return {
    props: {
      associations,
    },
  };
};
