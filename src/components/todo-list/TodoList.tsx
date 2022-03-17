import { Divider, List } from '@mui/material'
import  { Fragment, useEffect, useState } from 'react'
import ITodo from '../../interfaces/ITodo'
import TodoItem from '../todo-item/TodoItem'

export default function TodoList(props: {
    todoList: Array<ITodo>,
}) {
    const {todoList} = props;
    return (
        todoList.length > 0 ?
        <List sx={{ margin: 'auto', width: '400px' }}>
            {todoList.map((todo: ITodo) => (<Fragment key={todo.id}>  
                <TodoItem
                    id={todo.id}
                    title={todo.title}
                    completed={todo.completed}
                />
                <Divider variant="fullWidth" component="li" />
            </Fragment>))}
        </List>:<div>Loading...</div>
    )
}
