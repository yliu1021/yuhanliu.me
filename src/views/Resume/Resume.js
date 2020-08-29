import React from 'react';
import {
    Breadcrumbs,
    Divider,
    Typography,
    Link,
    Container, Grid,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Experiences from "./Experiences";
import Education from "./Education";
import Skills from "./Skills";
import Awards from "./Awards";

const useStyles = makeStyles(theme => ({
    root: {
        padding: 12,
    },
    resumeContent: {
        padding: "20px",
    },
}));

export default function Resume() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Breadcrumbs>
                <Link color={"inherit"} href={"/"}>Home</Link>
                <Typography color={"textPrimary"}>Resume</Typography>
            </Breadcrumbs>
            <Typography variant={"h1"} align={"center"}>Resume</Typography>

            <Divider variant={"middle"}/>

            <Container className={classes.resumeContent} maxWidth={"md"}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Experiences/>
                    </Grid>
                    <Grid item xs={12}>
                        <Education/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Skills/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Awards/>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}
