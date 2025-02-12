import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: "2% 0% 2% 0%",
    alignContent: "center",
    borderRadius: 20,
    boxShadow: "10px 10px 30px -1px grey",
  },
  details: {
    display: "flex",
    flexDirection: "row",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
    marginLeft: "auto",
  },
  media: {
    height: 140,
    display: "flex",
  },
  link: {
    textDecoration: "none",
    float: "right",
    margin: "0% 1% 2% 1%",
  },
}));

export default function AlbumCard(props) {
  const classes = useStyles();
  const albumInfo = props.albumInfo;
  const artistInfo = props.artistInfo;
  return (
    <Card className={classes.root}>
      {/* <CardActionArea> */}
      <CardMedia
        className={classes.media}
        component="img"
        alt="album image"
        image={
          albumInfo.cover == ""
            ? "https://3dwarehouse.sketchup.com/warehouse/v1.0/publiccontent/1aaeed10-90b9-484c-a575-79e1bad18ac3"
            : albumInfo.cover
        }
        title={albumInfo.name}
      />

      <CardContent className={classes.content}>
        <Typography component="h5" variant="h5">
          {albumInfo.name}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          released in {albumInfo.year}
        </Typography>
        {artistInfo && (
          <Link
            className={classes.link}
            to={{
              pathname: "/album",
              state: { artistInfo: artistInfo, albumInfo: albumInfo },
            }}
          >
            <Button size="small" color="primary">
              Go to album
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
