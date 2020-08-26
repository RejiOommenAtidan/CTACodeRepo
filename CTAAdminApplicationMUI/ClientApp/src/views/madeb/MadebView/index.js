import React from 'react';
import {
    Container,
    Grid,
    makeStyles,
    Breadcrumbs,
    Link,
    Typography
} from '@material-ui/core';
import Page from 'src/components/Page';
import Madeb from './madeb';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    }
}));

const Main = () => {
    const classes = useStyles();

    return (
        <Page
            className={classes.root}
            title="Madeb"
        >
            <Container maxWidth={false}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" href="/app/manageuser" >
                        Home
                    </Link>

                    <Typography color="textPrimary">Madeb</Typography>
                </Breadcrumbs>
                <br />
                <Madeb />
            </Container>
        </Page>
    );
};

export default Main;
