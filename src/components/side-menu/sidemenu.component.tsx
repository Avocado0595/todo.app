import Toolbar from '@mui/material/Toolbar';
import {styled, Box, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, useTheme } from '@mui/material';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import ChatIcon from "@mui/icons-material/Chat";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end"
}));

export default function SideMenu(props:{
  drawerWidth:number,
  handleDrawerToggle: ()=>void,
  mobileOpen: Boolean
}) {
  const {drawerWidth, handleDrawerToggle, mobileOpen} = props;
  const theme = useTheme();
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <DrawerHeader>
        <IconButton onClick={handleDrawerToggle}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <List>
        {[
          { text: "Tasks", icon: <HomeIcon /> },
          { text: "Project", icon: <FolderSharedIcon /> },         
          { text: "Calendar", icon: <CalendarMonthIcon /> },
          { text: "Stat", icon: <LeaderboardIcon /> },
          { text: "Chat", icon: <ChatIcon /> },
        ].map((menuItem) => (
          <ListItem key={menuItem.text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{menuItem.icon}</ListItemIcon>
              <ListItemText primary={menuItem.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );


  return (
    <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth
            }
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant={theme.breakpoints.up("sm") ? "persistent" : "permanent"}
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth
            }
          }}
          anchor="left"
          open={ !mobileOpen}
        >
          {drawer}
        </Drawer>
      </Box>
  );
}

