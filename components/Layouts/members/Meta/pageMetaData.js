import Meta from '../../Meta';

export const PageMetaData = props => {
  const { MetaOBJ } = props;

  return (
    <Meta
      title={MetaOBJ.title}
      description={MetaOBJ.description}
      keywords={MetaOBJ.keywords}
    />
  );
};
