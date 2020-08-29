import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Grid,
    Paper,
    Typography,
    Divider,
    List, ListItem, ListItemText
} from "@material-ui/core";
import skills from "./config/skills.json";

const useStyles = makeStyles(theme => ({
    root: {
        padding: "20px",
    },
    skills: {
        padding: "20px",
    }
}));

export default function Skills() {
    const classes = useStyles();

    return (
        <Paper className={classes.root} square={true}>
            <Typography variant={"h2"}>Skills</Typography>

            <Divider/>

            <div className={classes.skills}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant={"h6"}>Languages</Typography>
                        <List>
                            {
                                skills.languages.map(language => (
                                    <ListItem>
                                        <ListItemText primary={language.language} secondary={language.level}/>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant={"h6"}>Frameworks</Typography>
                        <List>
                            {
                                skills.frameworks.map(framework => (
                                    <ListItem>
                                        <ListItemText primary={framework.framework} secondary={framework.level}/>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </Grid>
                </Grid>
            </div>
        </Paper>
    )
}
