const { makeStyles } = require("@material-ui/core");

export const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    completed: {
        display: 'inline-block',
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    formControl: {
        width: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
    }, displayNone: {
        display: 'none',
    }, extendedIcon: {
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
    backdrop: {
        zIndex: 1000,
        color: '#9b00e8',
        background: "#00000044"
    },
}));
