import PropTypes from 'prop-types';
import { Button, Checkbox } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setData } from '@containers/App/actions';
import { selectData } from '@containers/App/selectors';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

import classes from './style.module.scss';

const TodoInput = ({ editTodo }) => {
  const data = useSelector(selectData);
  const [todo, setTodo] = useState({ id: 0, title: '', is_completed: false });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo.title === undefined) return false;
    const getIndex = data.findIndex((item) => item.id === todo.id);
    if (getIndex === -1) {
      if (todo.is_completed === undefined) {
        todo.is_completed = false;
      }
      setTodo((todo.id = +new Date()));
      dispatch(setData([...data, todo]));
    } else {
      const filter = data.filter((item) => item.id !== todo.id);
      dispatch(setData([...filter, todo]));
    }
    setTodo({ id: 0, title: '', is_completed: false });
  };

  useEffect(() => {
    if (editTodo) {
      setTodo(editTodo);
    }
  }, [editTodo]);

  return (
    <div className={classes.contentWrapper}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.todoInput}>
          <Checkbox
            className={classes.Checkbox}
            checked={todo.is_completed || false}
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
            onChange={() => setTodo({ ...todo, is_completed: !todo.is_completed })}
          />
          <input
            type="text"
            value={todo.title || ''}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
            className={classes.input}
            placeholder="Create a new todo..."
          />
        </div>
        {todo.title && (
          <Button
            variant="text"
            onClick={() => setTodo({ id: 0, title: '', is_completed: false })}
            className={classes.todoDelete}
          >
            <ClearIcon />
          </Button>
        )}
      </form>
    </div>
  );
};

TodoInput.propTypes = {
  editTodo: PropTypes.object,
};

export default TodoInput;
