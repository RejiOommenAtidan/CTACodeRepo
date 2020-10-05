import React from 'react';
import {
  Container,
  makeStyles,
} from '@material-ui/core';

import Search from './search';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: theme.palette.background.dark,
//     minHeight: '100%',
//     paddingBottom: theme.spacing(3),
//     paddingTop: theme.spacing(3)
//   }
// }));

const CoverSearch = () => {
  // const classes = useStyles();
  return (
    <Container maxWidth={false}>
      <Search />
    </Container>
  );
};

export default CoverSearch;
