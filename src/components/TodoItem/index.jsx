import PropTypes from 'prop-types';
import { Button, Checkbox } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckIcon from '@mui/icons-material/Check';

import classes from './style.module.scss';

const TodoItem = ({ todo, handleDelete, handleComplete, setEditTodo }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: todo.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={classes.todo}>
      <div className={classes.todoItem}>
        <Checkbox
          className={classes.Checkbox}
          onClick={() => handleComplete(todo.id)}
          checked={todo.is_completed}
          icon={<RadioButtonUncheckedIcon className={classes.Unchecked} />}
          checkedIcon={
            <CheckIcon
              className={classes.CheckedIcon}
              sx={{
                color: 'white',
                borderRadius: '100%',
                background: 'linear-gradient(45deg, #6ebbf4 30%, #a281fa 80%)',
              }}
            />
          }
        />
        <span onClick={() => setEditTodo(todo)} className={todo.is_completed === true ? classes.todoText : ''}>
          {todo.title}
        </span>
      </div>
      <Button variant="text" onClick={handleDelete(todo.id)} className={classes.todoDelete}>
        <ClearIcon />
      </Button>
    </div>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.object,
  handleDelete: PropTypes.func,
  handleComplete: PropTypes.func,
  setEditTodo: PropTypes.func,
};

export default TodoItem;
