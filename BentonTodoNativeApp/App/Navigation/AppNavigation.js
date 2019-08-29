import React from 'react';
import {createDrawerNavigator, createAppContainer} from 'react-navigation';

import SideBar from 'BentonTodoNativeApp/App/Components/SideBar';

import TodosScreen from 'BentonTodoNativeApp/App/Screens/Todos/TodosScreen';

const AppNavigator = createDrawerNavigator(
  {
    Todos: {screen: TodosScreen},
  },
  {
    contentComponent: props => <SideBar {...props} />,
  },
);

export default createAppContainer(AppNavigator);
