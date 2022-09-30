// ----------------------------------------------------------------------------
/*
                                Card Component
*/
// ----------------------------------------------------------------------------
// Clickable media card with details about an app. Should have a title, 
// description, logo, and a Request Access button if the user does not yet have
// permission for the app.

// ----------------------------------------------------------------------------
// Imports

// Material UI components
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

// Global State
import { useSetRecoilState } from "recoil";
import { requestAccessState } from "../common/state.js";

// ----------------------------------------------------------------------------
// Component

export function MediaCard(props) {
  // State to set on Request Access button click.
  const setRequestAccessState = useSetRecoilState(requestAccessState);

  if (props.showButton) {
    var button = (
      <Button
        size="small"
        onClick={() => {
          setRequestAccessState((oldState) => {
            const newState = { ...oldState };
            newState.showWindow = true;
            newState.appName = props.title;
            return newState;
          });
        }}
      >
        Request Access
      </Button>
    );
  } else {
    var button = null;
  }

  return (
    <Card
      sx={{
        display: "grid",
        maxWidth: "310px",
        height: "100%",
        alignItems: "start",
      }}
    >
      <CardActionArea href={props.routing_extension}>
        <CardMedia
          sx={{
            backgroundColor: "#f2f2f2",
            maxWidth: "calc(100% - 20px)",
            padding: "10px",
            display: "grid",
            placeSelf: "center",
          }}
          component="img"
          image={props.img}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" color="primary">
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{
          alignSelf: "end",
        }}
      >
        {button}
      </CardActions>
    </Card>
  );
}
