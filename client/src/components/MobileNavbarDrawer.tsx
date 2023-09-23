import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";

// ICONS
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import CurrencyBitcoinRoundedIcon from "@mui/icons-material/CurrencyBitcoinRounded";
import NewspaperRoundedIcon from "@mui/icons-material/NewspaperRounded";
import UploadRoundedIcon from "@mui/icons-material/UploadRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";

type Anchor = "left";

export default function MobileNavbarDrawer() {
  const [state, setState] = React.useState({
    left: false,
  });

  const auth = useAppSelector((state) => state.user.auth);

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[
          { name: "Home", link: "/", icon: <NewspaperRoundedIcon /> },
          {
            name: "Crypto",
            link: "/crypto",
            icon: <CurrencyBitcoinRoundedIcon />,
          },
          { name: "Blogs", link: "/blogs", icon: <ArticleRoundedIcon /> },
          { name: "Post blog", link: "submit", icon: <UploadRoundedIcon /> },
        ].map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              sx={{ color: "black" }}
              component={Link}
              to={item.link}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {auth ? null : (
        <List>
          {[
            { name: "Login", link: "/login", icon: <LoginRoundedIcon /> },
            {
              name: "Register",
              link: "/register",
              icon: <PersonAddAltRoundedIcon />,
            },
          ].map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton
                sx={{ color: "black" }}
                component={Link}
                to={item.link}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );

  return (
    <div>
      {(["left"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            sx={{ color: "white", borderRadius: "50%" }}
            onClick={toggleDrawer(anchor, true)}
          >
            <MenuIcon />
          </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
