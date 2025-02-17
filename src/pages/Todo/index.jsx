import TodoInput from '@components/TodoInput';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectData, selectFilter } from '@containers/App/selectors';
import { setData, setFilter } from '@containers/App/actions';
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import TodoItem from '@components/TodoItem/index';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

import classes from './style.module.scss';

const Todo = () => {
  const data = useSelector(selectData);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState({});

  useEffect(() => {
    if (filter === 'All') {
      setTodos(data);
    } else if (filter === 'Active') {
      setTodos(data.filter((todo) => !todo.is_completed));
    } else if (filter === 'Completed') {
      setTodos(data.filter((todo) => todo.is_completed));
    }
  }, [data, filter]);

  const handleDelete = (id) => () => {
    dispatch(setData(data.filter((todo) => todo.id !== id)));
  };

  const handleComplete = (id) => {
    dispatch(setData(data.map((todo) => (todo.id === id ? { ...todo, is_completed: !todo.is_completed } : todo))));
  };

  const handleClearCompleted = () => {
    dispatch(setData(data.filter((todo) => !todo.is_completed)));
  };

  // DnD
  const handleDragEnd = (e) => {
    const { active, over } = e;
    if (over && active.id !== over.id) {
      const oldIndex = data.findIndex((item) => item.id === active.id);
      const newIndex = data.findIndex((item) => item.id === over.id);
      const newTodos = arrayMove(data, oldIndex, newIndex);
      dispatch(setData(newTodos));
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 20,
      },
    })
  );

  return (
    <div className={classes.contentWrapper}>
      <TodoInput editTodo={editTodo} />
      {data.length > 0 && (
        <div className={classes.todoWrapper}>
          <DndContext onDragEnd={handleDragEnd} sensors={sensors} modifiers={[restrictToVerticalAxis]}>
            <SortableContext items={todos}>
              <div className={classes.todoList} data-simplebar>
                {todos.toReversed().map((todo, index) => (
                  <TodoItem
                    key={index}
                    todo={todo}
                    index={index}
                    handleDelete={handleDelete}
                    handleComplete={handleComplete}
                    setEditTodo={setEditTodo}
                  />
                ))}
              </div>
            </SortableContext>
            <DragOverlay>
              <div className={classes.dragOverlay}>
                <div className={classes.dragText}>Drop here</div>
              </div>
            </DragOverlay>
          </DndContext>
          <div className={classes.todoFooter}>
            <span>{data.length} item left</span>
            <div className={classes.todoFilter}>
              <span onClick={() => dispatch(setFilter('All'))} className={filter === 'All' && classes.aktif}>
                All
              </span>
              <span onClick={() => dispatch(setFilter('Active'))} className={filter === 'Active' && classes.aktif}>
                Active
              </span>
              <span
                onClick={() => dispatch(setFilter('Completed'))}
                className={filter === 'Completed' && classes.aktif}
              >
                Completed
              </span>
            </div>
            <span onClick={() => handleClearCompleted()}>Clear completed</span>
          </div>
        </div>
      )}
      <div className={classes.filterMobile}>
        <span onClick={() => dispatch(setFilter('All'))} className={filter === 'All' && classes.aktif}>
          All
        </span>
        <span onClick={() => dispatch(setFilter('Active'))} className={filter === 'Active' && classes.aktif}>
          Active
        </span>
        <span onClick={() => dispatch(setFilter('Completed'))} className={filter === 'Completed' && classes.aktif}>
          Completed
        </span>
      </div>
    </div>
  );
};

export default Todo;
