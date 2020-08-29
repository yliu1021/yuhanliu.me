import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Box,
    Divider,
    Paper, Typography
} from "@material-ui/core";
import experiences from "./config/experiences.json"

const useStyles = makeStyles(theme => ({
    root: {
        padding: "20px",
    },
    experience: {
        padding: "20px",
    }
}));

function Experience(props) {
    const descriptions = props.description.map(description => (
        <Box>
            <Typography key={description.title} variant={"body1"}>{description.title}</Typography>
            {
                description.body.map(descriptionBody => (
                    <Typography key={descriptionBody} variant={"body2"}>- {descriptionBody}</Typography>
                ))
            }
        </Box>
    ));
    return (
        <div className={props.className}>
            <Typography variant={"h4"}>{props.jobTitle}</Typography>
            <Typography variant={"h6"}>{props.company}</Typography>
            <Typography variant={"caption"}>{props.dates}</Typography>
            {descriptions}
        </div>
    )
}

export default function Experiences() {
    const classes = useStyles();

    const experiencesViews = experiences.map(experience => (
        <Experience
            key={experience.jobTitle + experience.company + experience.dates}
            className={classes.experience}
            jobTitle={experience.jobTitle}
            company={experience.company}
            dates={experience.dates}
            languages={experience.languages}
            technology={experience.technology}
            description={experience.description}
        />
    ));

    return (
        <Paper className={classes.root} square={true}>
            <Typography variant={"h2"}>Experiences</Typography>

            <Divider/>

            {experiencesViews}
        </Paper>
    )
}
