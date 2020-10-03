import { BehaviorSubject } from 'rxjs';

// import config from 'config';
import axios from 'axios';
import { handleResponse } from '../_helpers';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(sUsername, sPassword) {
    let userFromUI={
        sUsername,
        sPassword
    };
    return axios.post(`/User/AuthenticateUser/`,userFromUI)
        .then(handleResponse)
        .then(user => {
            // Store user details and jwt token in local storage to keep user logged in between page refreshes
            // Remove & then set
            localStorage.removeItem("currentUser");
            localStorage.setItem("currentUser", JSON.stringify(user));
            currentUserSubject.next(user);
            return user;
        });
}

function logout() {
    // Remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}
