import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { createTodos, getTodos, updateTodos } from '../../api/todoApi'
import { TodoContext } from '../../App'
import Input from '../../components/add-input/Input'
import MenuAppBar from '../../components/navbar/MenuAppBar'
import TodoList from '../../components/todo-list/TodoList'
import ITodo from '../../interfaces/ITodo'

export default function Home() {
    const [todoList, setTodoList] = useState<Array<Partial<ITodo>>>([])
  const [newTodo, setNewTodo] = useState<Partial<ITodo>>({ id: '', title: '', completed: false });
  const [isAdd, setIsAdd] = useState<boolean>(true);
  const [updateId, setUpdateId] = useState<string>('');
  useEffect(() => {
    const getApi = async () => {
      const data = await getTodos();
      console.log(data);
      setTodoList(data.data);
    }
    getApi();
  }, [])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo({title: e.target.value, completed: false });
  }

  const handleAddUpdateTodo = async () => {
    if (isAdd) {
      if (newTodo.title?.trim() != ''){
      const createdTodo = await createTodos({title:newTodo.title});
      setTodoList([...todoList, createdTodo.data]);
    }}
    else {
      if (newTodo.title?.trim() != '') {
        setIsAdd(true);
        const newTodoList = [...todoList];
        const updatedTodo = await updateTodos(updateId, {title:newTodo.title});
        newTodoList[todoList.findIndex(todo => todo.id === updateId)] = updatedTodo.data.data;
        console.log(updatedTodo.data.data);
        setTodoList(newTodoList);
      }
    }
    setNewTodo({ id: '', title: '', completed: false });
}

  const handleDelete = (id: string) => {
    const newTodoList = [...todoList];
    newTodoList.splice(newTodoList.findIndex(todo => todo.id === id), 1);
    setTodoList(newTodoList);
  }

  const handleEdit = (id: string) => {
    const oldTodo = todoList[todoList.findIndex(todo => todo.id === id)];
    setNewTodo(oldTodo);
    setIsAdd(false);
    setUpdateId(id);
  }
  const handleCompleted = (id: string) => {
    const newTodoList = [...todoList];
    newTodoList[todoList.findIndex(todo => todo.id === id)].completed = !newTodoList[todoList.findIndex(todo => todo.id === id)].completed;
    setTodoList(newTodoList);
  }

  return (
    <TodoContext.Provider value={{handleDelete:handleDelete,handleCompleted:handleCompleted,handleEdit:handleEdit}}>
    <Box sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
      <MenuAppBar/>
      <Input title={newTodo.title as string}
        handleChange={handleChange}
        isAdd={isAdd}
        handleAddUpdateTodo={handleAddUpdateTodo}
      />
      <TodoList key="123"
        todoList={todoList as Array<ITodo>}
      />
    </Box>
    </TodoContext.Provider>
  )
}
