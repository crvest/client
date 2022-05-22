import './App.css';
import React, { useState } from 'react';
import {
  BrowserRouter,
  Link,
  Switch,
  Route
} from 'react-router-dom';
import AuthorViewAll from './components/AuthorViewAll';
import AuthorForm from './components/AuthorForm';
import AuthorEdit from './components/AuthorEdit';

function App() {


  return (
    <BrowserRouter>
      <div className="App container">
        <h1>Favorite Authors</h1>
        <Link to='/'><button className='btn btn-primary btn-sm me-1'>Home</button></Link>
        <Link to='/api/author/new'><button className='btn btn-primary btn-sm'>Create New Author</button></Link>
        <hr />
        <Switch>
          <Route exact path='/'>
            <AuthorViewAll></AuthorViewAll>
          </Route>
          <Route exact path='/api/author/new'>
            <AuthorForm></AuthorForm>
          </Route>
          <Route exact path='/api/author/update/:_id'>
            <AuthorEdit></AuthorEdit>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
