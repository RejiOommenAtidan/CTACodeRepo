import {createMuiTheme} from '@material-ui/core/styles'

const theme = createMuiTheme({
    direction: 'rtl',
    typography: {
        fontFamily: [
            'Roboto',
            'Helvetica',
            'Arial',
            'sans-serif',
        ].join(','),
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '@font-face': [
                ],
            },
        },
    },
    // ...
});

export default theme