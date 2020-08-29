import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Paper,
    Typography,
    Divider,
    List, ListItem, ListItemText
} from "@material-ui/core";
import awards from "./config/awards.json";

const useStyles = makeStyles(theme => ({
    root: {
        padding: "20px",
    },
    awards: {
        padding: "20px",
    }
}));

export default function Awards() {
    const classes = useStyles();

    return (
        <Paper className={classes.root} square={true}>
            <Typography variant={"h2"}>Awards</Typography>

            <Divider/>

            <div className={classes.awards}>
                <List>
                    {
                        awards.map(award => (
                            <ListItem>
                                <ListItemText primary={award.award} secondary={award.description}/>
                            </ListItem>
                        ))
                    }
                </List>
            </div>
        </Paper>
    )
}
