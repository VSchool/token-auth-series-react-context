import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

import Navbar from "./Navbar";
import Signup from "./Auth/Signup";
import Login from "./Auth/Login";
import ProtectedRoute from "./Auth/ProtectedRoute";

import TodoList from "./Todos/TodoList";

function App() {
    return (
        <div className="app-wrapper">
            <Navbar/>
            <Switch>
                <Route path="/signup" component={Signup}/>
                <Route path="/login" component={Login}/>
                <ProtectedRoute path="/todos" component={TodoList}/>
                <Route exact path="/" render={() => <Redirect to="/todos"/>}/>
            </Switch>
        </div>
    )
}

export default App;
