import {createMuiTheme} from "@material-ui/core";
import green from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";

export default createMuiTheme({
    palette: {
        primary: green,
        accent: red,
        type: 'light',
    },
    typography: {
        useNextVariants: true,
    }
});
