import MainLayout from '@layouts/MainLayout';
import TodoLayout from '@layouts/TodoLayout';

// import Home from '@pages/Home';
import NotFound from '@pages/NotFound';
import Todo from '@pages/Todo';

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   protected: false,
  //   component: Home,
  //   layout: MainLayout,
  // },
  {
    path: '/',
    name: 'Todo',
    protected: false,
    component: Todo,
    layout: TodoLayout,
  },

  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
];

export default routes;
