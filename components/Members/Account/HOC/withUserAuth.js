import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '../../../../context/authContext';

export default function withUserAuth(Component) {
  return function WrappedComponent(props) {
    const router = useRouter();
    const currentRoute = router.pathname;
    const { user } = useUser();
    const isRedirecting = useRef(false); // Using ref to persist value

    useEffect(() => {
      if (!user && !isRedirecting.current) {
        isRedirecting.current = true;
        router
          .push(`/members/verification/?prev=${currentRoute}`)
          .then(() => {
            isRedirecting.current = false;
          })
          .catch(() => {
            isRedirecting.current = false;
          });
      }
    }, [user]);

    return <Component {...props} />;
  };
}
