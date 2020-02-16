import React from 'react';
import logo from '../logo.svg';
import '../App.css';
import { BrowserRouter, Switch, Route} from "react-router-dom";


import Header from './Components/Common/Header';
import ClassesScreen from './Screens/ClassesScreen';
import NotFoundScreen from './Screens/NotFoundScreen';


function App() {    
  return (
    <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={ClassesScreen} />
        <Route exact path="/classes" component={ClassesScreen} />
        <Route component={NotFoundScreen} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
