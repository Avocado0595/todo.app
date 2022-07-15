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
import { createTheme, CssBaseline, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Stack, styled, ThemeProvider } from '@mui/material';
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
import WestIcon from '@mui/icons-material/West';
const drawerWidth = 240;
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
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
            <WestIcon/>
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
        <Drawer
          
          variant="temporary"
          open={mobileState?true:false}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            
            position:'unset',
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          
          variant="permanent"
          sx={{
            height:'100%',
            display: { xs: 'none', sm: `${mobileState?'none':'block'}` },
            '& .MuiDrawer-paper': { position: {sm:'fixed',md:'unset'}, boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: `calc(100% - ${drawerWidth}px)` }}
      >
        
        <Toolbar />
        <Toolbar>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: {sm:'block', md: `${mobileState?'block':'none'}`} }}
          >
            <MenuIcon />
          </IconButton>
        <h2>Title</h2>
        </Toolbar>
        <Grid container spacing={3}>
  <Grid item xs>
    <Item>xs</Item>
  </Grid>
  <Grid item xs>
    <Item>xs</Item>
  </Grid>
  <Grid item xs>
    <Item>xs</Item>
  </Grid>
</Grid>
      </Box>
    </Box>
    </ThemeProvider>
  );
}