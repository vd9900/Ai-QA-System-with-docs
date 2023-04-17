import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import HelpIcon from "@mui/icons-material/Help";
import HomeIcon from "@mui/icons-material/Home";

import { makeStyles } from "tss-react/mui";
import { Theme } from "@mui/material/";
import axios from "axios";

import Client from "../components/Conversation/Client";
import { ConversationContext } from "../context/conversationContext";
import { ConverterContextProps } from "../types";
import Server from "./Conversation/Server";
const drawerWidth = 280;

const useStyles = makeStyles()((theme: Theme) => {
  return {
    root: {
      [theme.breakpoints.down("md")]: {
        width: "100%",
        height: "81vh",
      },
      [theme.breakpoints.up("md")]: {},
      [theme.breakpoints.up("lg")]: {
        height: "80vh",
      },
    },
    divider: {
      background: "#fff",
      borderColor: "#fff",
    },
    InputBox: {
      [theme.breakpoints.down("md")]: {
        position: "fixed",
        bottom: "10px",
      },
    },
    appbar: {
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    icons: {
      color: "#fff",
      padding: "0 5px 0 0",
    },
  };
});

function ResponsiveDrawer(props: any) {
  const { converterState, setConverterState } =
    React.useContext(ConversationContext);
  const [query, setQuery] = React.useState<String | undefined>("");
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  React.useEffect(() => {
    scrollToBottom();
  }, [converterState]);

  function handleQuery() {
    if (!query) return;
    setConverterState((pre) => [
      ...pre,
      {
        user: "client",
        text: query,
      },
    ]);
    axios.get(`/api/v1/chat?query=${query}`).then((response) => {
      console.log(response);
      setConverterState((pre) => [
        ...pre,
        {
          user: "server",
          text: response.data.text,
        },
      ]);
    });

    setQuery("");
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const { classes } = useStyles();

  const drawer = (
    <div>
      <Toolbar />
      <Divider className={classes.divider} />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <HomeIcon className={classes.icons} />
            <ListItemText secondary={"Home"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <TextSnippetIcon className={classes.icons} />
            <ListItemText secondary={"Docs"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <HelpIcon className={classes.icons} />
            <ListItemText secondary={"Contact"} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classes.appbar}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 1,
          position: "relative",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Box>
          <Box
            className={classes.root}
            sx={{
              width: "70%",
              margin: "0 auto",
            }}
          >
            <Box sx={{ height: "100%", overflowY: "auto" }}>
              {converterState.map((chat, index) => {
                if (chat.user === "client")
                  return (
                    <Client key={index} text={chat.text} user={chat.user} />
                  );
                return <Server key={index} text={chat.text} user={chat.user} />;
              })}
              <div ref={messagesEndRef} />
            </Box>
            <Box
              className={classes.InputBox}
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 12px 0 0",
              }}
            >
              <TextField
                fullWidth
                // label="fullWidth"
                size="medium"
                id="fullWidth"
                placeholder="Ask something..."
                value={query}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setQuery(e.target.value)
                }
              />
              <Button
                sx={{ ml: 1 }}
                size="large"
                onClick={handleQuery}
                variant="contained"
                endIcon={<SendIcon />}
              >
                Send
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
