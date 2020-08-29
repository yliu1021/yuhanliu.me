import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    List, ListItem,
    Divider, Grid,
    Paper, Typography
} from "@material-ui/core";
import education from "./config/education.json"

const useStyles = makeStyles(theme => ({
    root: {
        padding: "20px",
    },
    education: {
        padding: "20px",
    }
}));

function Degree(props) {
    return (
        <div>
            <Typography variant={"h6"}>{props.degree}</Typography>
            <List>
                {
                    props.classes.sort().map(degreeClass => (
                        <ListItem key={degreeClass}>
                            <Typography variant={"body1"}>{degreeClass}</Typography>
                        </ListItem>
                    ))
                }
            </List>
        </div>
    );
}

export default function Education() {
    const classes = useStyles();

    return (
        <Paper className={classes.root} square={true}>
            <Typography variant={"h2"}>Education</Typography>

            <Divider/>

            <div className={classes.education}>
                <Typography variant={"h4"}>{education.school}</Typography>
                <Typography variant={"subtitle1"}>
                    GPA: {education.gpa} <Typography variant={"caption"}>/ 4</Typography>
                </Typography>
                <Typography variant={"caption"}>{education.dates}</Typography>
                <Grid container spacing={4}>
                    {
                        education.degrees.map(degree => (
                            <Grid
                                key={degree.degree}
                                item
                                md={6}
                            >
                                <Degree
                                    degree={degree.degree}
                                    classes={degree.classes}
                                />
                            </Grid>
                        ))
                    }
                </Grid>
            </div>
        </Paper>
    )
}
