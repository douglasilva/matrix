import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";

import AppBar from "./AppBar";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Drawer, { drawerWidth, drawerHeader } from "./Drawer";

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { DashboardsPropType } from "../morpheus/store/models";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    minHeight: "100vh"
  },
  main: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  mainShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  drawerHeader: drawerHeader(theme),
  container: {
    flex: 1
  }
}));


const PageLayout = ({
  title,
  renderAppBarMenu,
  renderSideBarMenu,
  children,
  dashboards
}) => {
  const [isDrawerOpen, toggleDrawer] = useState(false);
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const tamanho = {{position: 'absolute', width : '100%', height: '100%'}};
  
function ConvertDashboardIframe(dashboard)
{
  return {__html: dashboard.iframe};
}

  function GetURLDashboards(dashboard) {
    if (dashboard) {
      return <div dangerouslySetInnerHTML={ConvertDashboardIframe(dashboard)}></div>
    }
    return <div />;    
  }

  return (
    <div className={classes.root}>
      <AppBar
        isDrawerOpen={isDrawerOpen}
        title={title}
        openDrawer={() => {
          toggleDrawer(true);
        }}
      >
        {renderAppBarMenu()}

      </AppBar>
      <Drawer
        open={isDrawerOpen}
        onClose={() => {
          toggleDrawer(false);
        }}
      >
        {renderSideBarMenu()}
      </Drawer>
      <main
        className={clsx(classes.main, {
          [classes.mainShift]: isDrawerOpen
        })}
      >
        <div className={classes.drawerHeader} />
        <div className={classes.container}>

        <Tabs value={value} onChange={handleChange}>
          <Tab label="Salas"/>

          {dashboards.map(dashboard => (
              <Tab label={dashboard.title} />
            ))}

        </Tabs>

        <TabPanel value={value} index={0}>
          {children}
        </TabPanel>

        {dashboards.map((dash, indice) => (
             <TabPanel value={value} index={1+indice}> 
               <iframe style={{position: 'absolute', width : '90%', height: '95%'}}  src={dash.url} frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe> 
            </TabPanel>
            ))}

      </div>
      </main>
    </div>
  );
};

PageLayout.propTypes = {
  title: PropTypes.string,
  renderSideBarMenu: PropTypes.func,
  renderAppBarMenu: PropTypes.func,
  children: PropTypes.node,
  dashboards: DashboardsPropType
};

PageLayout.defaultProps = {
  title: "",
  renderSideBarMenu: () => {},
  renderAppBarMenu: () => {},
  children: undefined,
  dashboards: undefined
};

export default PageLayout;
