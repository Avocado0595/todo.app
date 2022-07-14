// import { Box } from '@mui/material'
// import React, { useEffect, useState } from 'react'
// import { createTodos, getTodos, updateTodos } from '../../api/todoApi'
// import { TodoContext } from '../../App'
// import Input from '../../components/add-input/Input'
// import MenuAppBar from '../../components/navbar/MenuAppBar'
// import TodoList from '../../components/todo-list/TodoList'
// import ITodo from '../../interfaces/ITodo'

// export default function Home() {
//     const [todoList, setTodoList] = useState<Array<Partial<ITodo>>>([])
//   const [newTodo, setNewTodo] = useState<Partial<ITodo>>({ id: '', title: '', completed: false });
//   const [isAdd, setIsAdd] = useState<boolean>(true);
//   const [updateId, setUpdateId] = useState<string>('');
//   useEffect(() => {
//     const getApi = async () => {
//       const data = await getTodos();
//       console.log(data);
//       setTodoList(data.data);
//     }
//     getApi();
//   }, [])
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setNewTodo({title: e.target.value, completed: false });
//   }

//   const handleAddUpdateTodo = async () => {
//     if (isAdd) {
//       if (newTodo.title?.trim() != ''){
//       const createdTodo = await createTodos({title:newTodo.title});
//       setTodoList([...todoList, createdTodo.data]);
//     }}
//     else {
//       if (newTodo.title?.trim() != '') {
//         setIsAdd(true);
//         const newTodoList = [...todoList];
//         const updatedTodo = await updateTodos(updateId, {title:newTodo.title});
//         newTodoList[todoList.findIndex(todo => todo.id === updateId)] = updatedTodo.data.data;
//         console.log(updatedTodo.data.data);
//         setTodoList(newTodoList);
//       }
//     }
//     setNewTodo({ id: '', title: '', completed: false });
// }

//   const handleDelete = (id: string) => {
//     const newTodoList = [...todoList];
//     newTodoList.splice(newTodoList.findIndex(todo => todo.id === id), 1);
//     setTodoList(newTodoList);
//   }

//   const handleEdit = (id: string) => {
//     const oldTodo = todoList[todoList.findIndex(todo => todo.id === id)];
//     setNewTodo(oldTodo);
//     setIsAdd(false);
//     setUpdateId(id);
//   }
//   const handleCompleted = (id: string) => {
//     const newTodoList = [...todoList];
//     newTodoList[todoList.findIndex(todo => todo.id === id)].completed = !newTodoList[todoList.findIndex(todo => todo.id === id)].completed;
//     setTodoList(newTodoList);
//   }

//   return (
//     <TodoContext.Provider value={{handleDelete:handleDelete,handleCompleted:handleCompleted,handleEdit:handleEdit}}>
//     <Box sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
//       <MenuAppBar/>
//       <Input title={newTodo.title as string}
//         handleChange={handleChange}
//         isAdd={isAdd}
//         handleAddUpdateTodo={handleAddUpdateTodo}
//       />
//       <TodoList key="123"
//         todoList={todoList as Array<ITodo>}
//       />
//     </Box>
//     </TodoContext.Provider>
//   )
// }


import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { selectCurrentUser } from '../../features/user/user.slice';
import { createTheme, CssBaseline, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, ThemeProvider } from '@mui/material';
import { userSignOut } from '../../features/user/user.api';
import Header from '../../components/header/header.component';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import SideMenu from '../../components/side-menu/sidemenu.component';
import { darkTheme } from '../../app/mode';
import { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import ChatIcon from '@mui/icons-material/Chat';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
const drawerWidth = 240;
export default function MenuAppBar() {
  const [mobileState, setMobileState] = useState<Boolean>(false);
  const handleDrawerToggle = () => {
    setMobileState(!mobileState);
  };

  const drawer = (
    <div>
      <Toolbar/>
      <Divider />
      <Toolbar>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: 'block' }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      
      <List>
        {[{text:'Overview', icon: <HomeIcon/> },{text: 'Stat', icon: <LeaderboardIcon/>},
        {text:'Project', icon: <FolderSharedIcon/>},
      {text:'Chat',icon:<ChatIcon/>},
    {text:'Calendar', icon: <CalendarMonthIcon/>}].map((menuItem, index) => (
          <ListItem key={menuItem.text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {menuItem.icon}
              </ListItemIcon>
              <ListItemText primary={menuItem.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
    </div>
  );
  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: 'flex' }}>
        <Header/>
      <Box
        component="nav"
        sx={{ width: { sm: `${mobileState?0:drawerWidth}` }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          
          variant="temporary"
          open={mobileState?true:false}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: `${mobileState?'none':'block'}` },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: `calc(100% - ${drawerWidth}px)`  }}
      >
        
        <Toolbar />
        <Toolbar>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: {sm:`${mobileState?'block':'none'}`} }}
          >
            <MenuIcon />
          </IconButton>
        <h2>Title</h2>
        </Toolbar>
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
          nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
          feugiat vivamus at augue. At augue eget arcu dictum varius duis at
          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
          eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
          neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
          tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
          sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
          tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
          gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
          et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
          tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Box>
    </Box>
    </ThemeProvider>
  );
}

/**
 * <Grid container sx={{height:"100vh"}}>
      <Grid border={"solid 1px #d5d5d5"} item sx={{ height:"100%"}} xs={2}>
        <SideMenu/>
      </Grid>
      <Grid item sx={{ height:"100%", flexGrow: 1, p: 3}} xs={10}></Grid>
    </Grid>
 */
