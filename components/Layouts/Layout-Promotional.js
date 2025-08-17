import Meta from './Meta';

import Footer from './Fixtura_Footer';
import { useRouter } from 'next/router';

const PromotionalLayout = ({ children }) => {
  const router = useRouter();
  const path = router.pathname;
  const className = path.includes('members')
    ? 'navbar-style-3'
    : 'navbar-style-2';

  return (
    <>
      <Meta />
      <div className='Container Promotional'>
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default PromotionalLayout;
