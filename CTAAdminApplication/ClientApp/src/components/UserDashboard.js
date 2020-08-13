import React from 'react';
import axios from 'axios';
import CDataTable from "@coreui/react/src/table/CDataTable";
import CCol from "@coreui/react/src/grid/CCol";
import CContainer from "@coreui/react/src/grid/CContainer";
import CRow from "@coreui/react/src/grid/CRow";
// import { User } from '../classes/user';

const fields = [
    { key: 'fullname', _style: { width: '30%' } },
    { key: 'email', _style: { width: '40%' } },
    { key: 'role', _style: { width: '10%' } },
    { key: 'status', _style: { width: '10%' } },
    { key: 'region', _style: { width: '10%' } },
];

export default class UserDashboard extends React.Component {
    state = {
        dataAPI: [],
        loadingProp: true
    };
    componentDidMount(prevProps) {
        axios.get(`/Users`)
            .then(resp => {
                if (resp.status === 200) {
                    this.setState({
                        dataAPI: resp.data,
                        loadingProp: false
                    });
                }
            })
            .catch(error => {
                if (error.response) {
                    //The request was made and the server responded 
                    //with a status code that falls out of the range of 2xx OR in 4XX to 5XX range
                    console.error(error.response.data);
                    console.error(error.response.status);
                    console.error(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received 
                    //`error.request` is an instance of XMLHttpRequest in the browser 
                    //and an instance of http.ClientRequest in node.js
                    console.warn(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error('Error', error.message);
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
            <CContainer>
                <br /><h1>User List Page</h1><br />
                <CRow gutters={true}>
                    <CCol md="12">
                        <CDataTable
                            items={this.state.dataAPI}
                            fields={fields}
                            columnFilter
                            tableFilter
                            itemsPerPage={5}
                            loading={this.state.loadingProp}
                            responsive
                            sorter
                        // clickableRows
                        // outlined
                        // header
                        />
                    </CCol>

                </CRow>
            </CContainer>
        )
    }
}

