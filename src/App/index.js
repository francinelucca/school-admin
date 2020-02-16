import React from 'react';
import '../App.css';
import { BrowserRouter, Switch, Route} from "react-router-dom";


import Header from './Components/Common/Header';
import ClassesScreen from './Screens/ClassesScreen';
import StudentsScreen from './Screens/StudentsScreen';
import NotFoundScreen from './Screens/NotFoundScreen';
import TeachersScreen from './Screens/TeachersScreen';


function App() {    
  return (
    <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={ClassesScreen} />
        <Route exact path="/classes" component={ClassesScreen} />
        <Route exact path="/students" component={StudentsScreen} />
        <Route exact path="/teachers" component={TeachersScreen} />
        <Route component={NotFoundScreen} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
