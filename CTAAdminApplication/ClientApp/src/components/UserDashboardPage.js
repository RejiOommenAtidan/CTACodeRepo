import React from 'react';
import axios from 'axios';

//  import   from '@coreui/react/src/button/CButtonGroup';
//  import  from '@coreui/react/src/button/CButton';
// import { CButtonGroup, CButton } from '@coreui/react';

import CButton from "@coreui/react/src/button/CButton";
import CButtonGroup from "@coreui/react/src/button/CButtonGroup";

const dataAPI=[];

export default class UserDashboardPage extends React.Component {
    componentDidMount(prevProps) {
        axios.get(`/Users`)
            .then(resp => {
                if (resp.status === 200) {
                    const dataAPI = resp.data;
                    console.log(dataAPI);
                }
            })
            .catch(error => {
                if (error.response) {
                    //The request was made and the server responded 
                    //with a status code that falls out of the range of 2xx OR in 4XX to 5XX range
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received 
                    //`error.request` is an instance of XMLHttpRequest in the browser 
                    //and an instance of http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            })
            .then(release => {
                //always executed
                //console.log(release); => udefined
            });
    }
    render() {
        return (
            <div>
                Hello World
                <CButtonGroup>
                    <CButton color="success">Button</CButton>
                    <CButton color="info">Button</CButton>
                    <CButton color="primary">Button</CButton>
                </CButtonGroup>
            </div>
        )
    }
}

