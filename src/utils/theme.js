import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import green from "@material-ui/core/colors/green";
import blue from "@material-ui/core/colors/blue";

export default createMuiTheme({
    palette: {
        primary: green,
        accent: blue,
        type: 'dark',
    },
    typography: {
        useNextVariants: true,
    }
});
