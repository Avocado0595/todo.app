import  { useContext } from 'react'
import { Box, IconButton, ListItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { TodoContext } from '../../App';

export default function TodoItem(props: {
    id: string,
    completed: boolean,
    title: string,
}) {
    const {handleCompleted,handleDelete, handleEdit } = useContext(TodoContext);
    const { id,  completed, title } = props;
    return (
        <ListItem sx={{
            display: 'flex', justifyContent: 'space-between',
            "&:hover": {
                backgroundColor: '#f5f5f5',
            }
        }} key={props.id}>
            <Box
                sx={{
                    "&:hover": {
                        cursor: 'pointer'
                    },
                    maxWidth: '200px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}
                onClick={() => handleCompleted(id)}>{completed ? <del>{title}</del> : title}
            </Box>
            <Box>
                <IconButton onClick={() => handleDelete(id)} aria-label="delete" size="large">
                    <DeleteIcon fontSize="inherit" />
                </IconButton>

                <IconButton aria-label="edit" size="large" onClick={() => handleEdit(id)}>
                    <ModeEditOutlineIcon fontSize="inherit" />
                </IconButton>
            </Box>
        </ListItem>
    )
}
