import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { authenticationService } from '../_services/authentication.service.js';

export const PrivateRoute = ({ component: Component, roles, feature, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = authenticationService.currentUserValue;
        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            authenticationService.logout();
            return <Redirect to={{ pathname: '/Login', state: { from: props.location } }} />
        }

        // check if route is restricted by role
        if (currentUser.lFeatureUserrights && currentUser.lFeatureUserrights.find(x=>x.nFeatureID===feature)===undefined) {
            //Inside Array is there an object having a specific proerty having a value
            return <Redirect to={{ pathname: '/Home'}} />
        }

        // authorised so return component
        return <Component {...props} />
    }} />
)