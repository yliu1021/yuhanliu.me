import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Button,
    Container,
    Typography
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    button: {
        textTransform: "none",
        padding: "10%",
        margin: 10,
    },
}));

export default function LinkButton(props) {
    const classes = useStyles();

    return (
        <Button
            className={classes.button}
            fullWidth={true}
            href={props.href}
        >
            <Container>
                <Typography variant={"h4"} align={"center"}>{props.title}</Typography>
                <Typography variant={"body1"} align={"center"}>{props.description}</Typography>
            </Container>
        </Button>
    );
}
