import React from "react";
import {
    Button,
    Container,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles(theme => ({
    root: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translateX(-50%) translateY(-50%)",
        textAlign: "center"
    },
    goBack: {
        margin: 20,
    }
}));

export default function NoMatchPage() {
    const classes = useStyle();
    const pathname = window.location.pathname;
    const comingSoon = (
        pathname === "/projects" ||
        pathname === "/blogs"
    );
    return (
        <Container className={classes.root}>
            <Typography variant={"h1"}>Uh Oh...</Typography>
            <Typography variant={"h2"}>This page doesn't exist{comingSoon ? "... yet" : "."}</Typography>
            {
                comingSoon ? <Typography variant={"h6"}>Check back soon</Typography> : null
            }
            <Button className={classes.goBack} href={"/"} variant={"outlined"}>Main Page</Button>
        </Container>
    )
}
