import React from "react"
import { Route, Redirect } from "react-router-dom";
import { withContext } from "../AppContext"

function ProtectedRoute(props) {
    const { component: Component, ...rest } = props;
    return (
        props.token ?
            <Route {...rest} component={Component} /> :
            <Redirect to="/login" />
    )
}

export default withContext(ProtectedRoute);