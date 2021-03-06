import { AccountCircle } from "@mui/icons-material";
import {
  alpha,
  AppBar,
  Box,
  IconButton,
  Input,
  Menu,
  MenuItem,
  Stack,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import React,{useState} from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { userSignOut } from "../../features/user/user.api";
import { selectCurrentUser } from "../../features/user/user.slice";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { ThemeProvider } from "@emotion/react";
import theme from "../../app/theme";
import ClearIcon from '@mui/icons-material/Clear';
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  color: theme.palette.mode,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.2),
  },
  marginRight: theme.spacing(2),
  marginLeft: '8px',
  maxWidth: '500px',
  width: "auto",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
    flex:1,
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  color: theme.palette.mode,
  backgroundColor: theme.palette.mode,
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  with:'100%',
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: '0px',
    '&:focus': {
      width: '100%',
      flex:1
    },
    [theme.breakpoints.up('sm')]: {
      
      width:'100%',
      '&:focus': {
        width: '100%',
      },
      },
  },
}));

function Header() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [value, setValue] = useState<string>('');
  const currentUser = useAppSelector((state: RootState) =>
    selectCurrentUser(state)
  );
  const dispatch = useAppDispatch();
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignout = () => {
    dispatch(userSignOut());
  };
  const clearValue = ()=>{
    setValue('');
  }
  return (
 <ThemeProvider theme={theme}>
      <AppBar
        position="fixed"
        sx={{
          zIndex:1201
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h1">
            doX
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase sx={{width: '100%'}}
              placeholder="Search???"
              inputProps={{ "aria-label": "search" }}
              endAdornment={<IconButton onClick={clearValue} sx={{display: value?'flex':'none'}}><ClearIcon sx={{color:'white'}}/></IconButton>}
              value={value}
              onChange={(e)=>setValue(e.target.value)}
            />
            
          </Search>

          <Stack direction="row">
            <Stack
              direction="row"
              sx={{ alignItems: "center", padding: "0 8px" }}
            >
              <IconButton>
              <NotificationsActiveIcon color="disabled" />

              </IconButton>
            </Stack>
            <Stack
              sx={{ alignItems: "center", marginRight: "0" }}
              direction="row"
            >
              <Typography sx={{display:{sm:'none', xs:'none', md:'block'}}} color="inherit" align="center">
                {currentUser?.username}
              </Typography>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle color="inherit" fontSize="large" />
              </IconButton>
            </Stack>

            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleSignout}>Sign out</MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
        </AppBar>
      </ThemeProvider>
  );
}

export default Header;
