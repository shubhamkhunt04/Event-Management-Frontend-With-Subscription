import React from 'react';

import error404 from 'assets/error404.svg';
import CustomeLayout from './app/components/CustomeLayout/CustomeLayout';

const NotFoundPage = () => {
  return (
    <CustomeLayout current='home'>
      <div>
        <center>
          <h1> Page Not Found !</h1>
          <img src={error404} alt='error404' />
        </center>
      </div>
    </CustomeLayout>
  );
};

export default NotFoundPage;
