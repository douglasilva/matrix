import React, { useState } from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import Avatar from "@material-ui/core/Avatar";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  flex: {
    display: "flex",
  },
  descriptionIcon: {
    marginLeft: "auto",
    flex: "0 0 auto",
  },
  contentAction: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch"
  },
  content: {
    flex: 1
  },
  userGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 40px)",
    gridGap: 8
  },
  emptyUserSpace: {
    height: 0
  },
  avatarInMeeting: {
    position: "relative",
    "&:after": {
      content: "''",
      position: "absolute",
      top: -2,
      left: -3,
      width: 46,
      height: 40,
      background: "url('/images/headset.svg')",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat"
    }
  }
}));

function createMarkup(description) {
  return {__html: description};
}

function formatDescription(description) {
  return <div dangerouslySetInnerHTML={createMarkup(description)} />;
}

const RoomCard = ({ name, description, users, meetingEnabled, dashboardUrl, onEnterRoom, onEnterMeeting, onEnterAvatar, onEnterDashboard }) => {
  const [isExpanded, toggleExpand] = useState(false);
  const classes = useStyles();
  const userToShow = isExpanded ? users : users.slice(0, 3);
  const totalUsersHidden = users.length - userToShow.length;

  return (
    <Card className={classes.root}>
        <CardContent className={classes.content}>
          <div className={classes.flex}>
            <Typography gutterBottom variant="h5" component="h2" className={classes.content}>
              {name}
            </Typography>
            {description && (
              <Tooltip title={formatDescription(description)}>
                <InfoIcon className={classes.descriptionIcon} color="action" />
              </Tooltip>
            )}
          </div>
          <div className={classes.userGrid}>
            {users.map(user => (
              <Tooltip key={user.id} title={user.name} className={classes.contentAction}>
                <div
                  className={clsx({
                    [classes.avatarInMeeting]: user.inMeet
                  })}
                >
                  <Avatar src={decodeURIComponent(user.imageUrl)} onClick={() => onEnterAvatar(user)}/>
                </div>
              </Tooltip>
            ))}
            {users.length === 0 && <div className={classes.emptyUserSpace} />}
          </div>
        </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={onEnterRoom}>
          Sala
        </Button>
        {meetingEnabled && (
          <Button size="small" color="primary" onClick={onEnterMeeting}>
            Reunião
          </Button>
        )}
        {dashboardUrl && (
        <Button size="small" color="primary" onClick={onEnterDashboard}>
          Dashboard
        </Button>
        )}
      </CardActions>
    </Card>
  );
};

RoomCard.propTypes = {
  onEnterRoom: PropTypes.func,
  onEnterMeeting: PropTypes.func,
  meetingEnabled: PropTypes.bool,
  users: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string,
  description: PropTypes.string
};

RoomCard.defaultProps = {
  onEnterRoom: () => {},
  onEnterMeeting: () => {},
  meetingEnabled: true,
  users: [],
  name: "",
  description: null
};

export default RoomCard;
