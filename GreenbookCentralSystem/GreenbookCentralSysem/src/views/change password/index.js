import React from 'react';

// import { PageTitle } from 'layout-components';

import { Container } from '@material-ui/core';


import ChangePassword from './changepassword.js';

export default function ChangePasswordPage() {
  return (
    <> 
    <Container maxWidth={false}>
    <ChangePassword/>
    </Container>
    </>
  );
}
