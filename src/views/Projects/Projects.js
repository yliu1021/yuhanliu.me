import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {
    Breadcrumbs,
    Divider,
    Typography,
    Link,
    Container, Grid,
    Paper,
    Button,
} from "@material-ui/core";
import {
    Launch
} from "@material-ui/icons";
import projects from "./config/projects.json"

const useStyles = makeStyles(theme => ({
    root: {
        padding: 12,
    },
    projectsContent: {
        padding: "20px",
    },
    projectButton: {
        textTransform: "none",
        padding: "20px",
        width: "100%",
    },
    projectDescription: {
        padding: "20px",
    },
    projectLanguages: {
        width: "100%",
    }
}));

function ProjectView(props) {
    const classes = useStyles();

    return (
        <Paper square={true}>
            <Button className={classes.projectButton} href={props.href}>
                <Grid container>
                    <Grid item>
                        <Typography variant={"h2"}>{props.name}</Typography>
                    </Grid>
                    <Grid item>
                        <Container>
                            <Typography
                                className={classes.projectDescription}
                                variant={"body1"}
                            >
                                {props.description}
                            </Typography>
                            <Typography
                                className={classes.projectLanguages}
                                align={"right"}
                                variant={"caption"}
                            >
                                {props.languages}
                            </Typography>
                        </Container>
                    </Grid>
                </Grid>
            </Button>
            <Button href={props.url} target={"_blank"}>
                <Launch/>
            </Button>
        </Paper>
    )
}

export default function Projects() {
    const classes = useStyles();

    const projectViews = projects.map(project => (
        <Grid key={project.name} item xs={12}>
            <ProjectView
                name={project.name}
                description={project.description}
                href={project.href}
                url={project.url}
                languages={project.languages}
                tools={project.tools}
            />
        </Grid>
    ));

    return (
        <div className={classes.root}>
            <Breadcrumbs>
                <Link color={"inherit"} href={"/"}>Home</Link>
                <Typography color={"textPrimary"}>Projects</Typography>
            </Breadcrumbs>
            <Typography variant={"h1"} align={"center"}>Projects</Typography>

            <Divider variant={"middle"}/>

            <Container className={classes.projectsContent} maxWidth={"md"}>
                <Grid container spacing={4}>
                    {projectViews}
                </Grid>
            </Container>
        </div>
    )
}
