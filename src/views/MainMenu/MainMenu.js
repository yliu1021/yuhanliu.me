import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {
    Button,
    ButtonGroup,
    Container, Divider,
    Typography,
} from "@material-ui/core";
import MainMenuLinkButton from "./MainMenuLinkButton";
import menuLinks from "./config/menuLinks.json"

const useStyles = makeStyles(theme => ({
    root: {
    },
    header: {
        padding: "20px",
        textAlign: "center",
    },
    emailLinkContainer: {
        margin: "20px 0px 0px 0px",
    },
}));

export default function MainMenu() {
    const classes = useStyles();

    const menuLinkButtons = menuLinks.map((linkAttr, index) => (
        <div key={linkAttr.title}>
            { index === 0 ? null : <Divider/> }
            <MainMenuLinkButton
                title={linkAttr.title}
                description={linkAttr.description}
                href={linkAttr.href}
            />
        </div>
    ));

    return (
        <div className={classes.root}>
            <Container className={classes.header} maxWidth={false}>
                <Typography variant={"h1"}>Yuhan Liu</Typography>
                <Typography variant={"h3"}>Software Developer</Typography>
                <Button className={classes.emailLinkContainer} href={"mailto://yliu1021@outlook.com"}>
                    Contact Me
                </Button>
            </Container>

            <Container maxWidth={"md"}>
                <ButtonGroup orientation={"vertical"}>
                    {menuLinkButtons}
                </ButtonGroup>
            </Container>
        </div>
    );
}
