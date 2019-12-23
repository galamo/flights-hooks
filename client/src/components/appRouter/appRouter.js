import Button from "@material-ui/core/Button";
import { Link, Route } from "react-router-dom";
import React from "react";

export const AppLinks = (props) => {
    const { routes } = props
    return routes.filter(route => route.isVisible).map(route => <Button color="inherit">
        <Link style={{ color: "white" }} to={route.path}>{route.title}</Link>
    </Button>)
}


export const AppRoutes = (props) => {
    const { routes } = props
    const result = routes.map(route =>
        <Route {...route} />
    )
    return <>{result}</>
}

