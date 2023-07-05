import React, { lazy, Suspense } from 'react';
import LoadingIcon from '@/images/icons/LoadingIcon';

const Component = lazy(() => import('./index'));

const Loadable = () => {
  return (
    <Suspense fallback={<LoadingIcon />}>
      <Component />
    </Suspense>
  );
};

export default Loadable;
