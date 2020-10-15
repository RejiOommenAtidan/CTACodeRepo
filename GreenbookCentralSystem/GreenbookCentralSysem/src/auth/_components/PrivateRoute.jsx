import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authenticationService } from '../_services/authentication.service.js';

export const PrivateRoute = ({ component: Component, roles, feature, ...rest }) => (

    <Route {...rest} render={props => {
        const currentUser = authenticationService.currentUserValue;
        const oUserAuthUser = JSON.parse(currentUser.UserAuthenticationReducer);
        if (oUserAuthUser.oUserAuth === null) {
            // Not logged in so redirect to login page with the return url
            //authenticationService.logout();
            return <Redirect to={{ pathname: '/Login', state: { from: props.location } }} />
        }

        // check if route is restricted by role
        if (oUserAuthUser.oUserAuth.lFeatureUserrights && oUserAuthUser.oUserAuth.lFeatureUserrights.find(x => x.nFeatureID === feature) === undefined) {
            //Inside Array is there an object having a specific proerty having a value
            //If Has Access then sent to that page
            //Else Logout & Redirect to Login Page
            //authenticationService.logout();
            return <Redirect to={{ pathname: '/Login', state: { from: props.location } }} />
        }

        // authorised so return component
        return <Component {...props} />
    }} />
)