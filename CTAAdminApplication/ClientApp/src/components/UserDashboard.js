import React from 'react';
import axios from 'axios';
import CDataTable from "@coreui/react/src/table/CDataTable";
// import CDataTable from "@coreui/react/src";
import CCol from "@coreui/react/src/grid/CCol";
import CContainer from "@coreui/react/src/grid/CContainer";
import CRow from "@coreui/react/src/grid/CRow";
// import CHeader from "@coreui/react/src/template/CHeader";
// import CButtonGroup from "@coreui/react/src/button/CButtonGroup";

// const usersData = [
//     { id: 0, name: 'John Doe', registered: '2018/01/01', role: 'Guest', status: 'Pending' },
//     { id: 1, name: 'Samppa Nori', registered: '2018/01/01', role: 'Member', status: 'Active' },
//     { id: 2, name: 'Estavan Lykos', registered: '2018/02/01', role: 'Staff', status: 'Banned' },
//     { id: 3, name: 'Chetan Mohamed', registered: '2018/02/01', role: 'Admin', status: 'Inactive' },
//     { id: 4, name: 'Derick Maximinus', registered: '2018/03/01', role: 'Member', status: 'Pending' },
//     { id: 5, name: 'Friderik Dávid', registered: '2018/01/21', role: 'Staff', status: 'Active' },
//     { id: 6, name: 'Yiorgos Avraamu', registered: '2018/01/01', role: 'Member', status: 'Active' },
//     { id: 7, name: 'Avram Tarasios', registered: '2018/02/01', role: 'Staff', status: 'Banned' },
//     { id: 8, name: 'Quintin Ed', registered: '2018/02/01', role: 'Admin', status: 'Inactive' },
//     { id: 9, name: 'Enéas Kwadwo', registered: '2018/03/01', role: 'Member', status: 'Pending' },
//     { id: 10, name: 'Agapetus Tadeáš', registered: '2018/01/21', role: 'Staff', status: 'Active' },
//     { id: 11, name: 'Carwyn Fachtna', registered: '2018/01/01', role: 'Member', status: 'Active' },
//     { id: 12, name: 'Nehemiah Tatius', registered: '2018/02/01', role: 'Staff', status: 'Banned' },
//     { id: 13, name: 'Ebbe Gemariah', registered: '2018/02/01', role: 'Admin', status: 'Inactive' },
//     { id: 14, name: 'Eustorgios Amulius', registered: '2018/03/01', role: 'Member', status: 'Pending' },
//     { id: 15, name: 'Leopold Gáspár', registered: '2018/01/21', role: 'Staff', status: 'Active' },
//     { id: 16, name: 'Pompeius René', registered: '2018/01/01', role: 'Member', status: 'Active' },
//     { id: 17, name: 'Paĉjo Jadon', registered: '2018/02/01', role: 'Staff', status: 'Banned' },
//     { id: 18, name: 'Micheal Mercurius', registered: '2018/02/01', role: 'Admin', status: 'Inactive' },
//     { id: 19, name: 'Ganesha Dubhghall', registered: '2018/03/01', role: 'Member', status: 'Pending' },
//     { id: 20, name: 'Hiroto Šimun', registered: '2018/01/21', role: 'Staff', status: 'Active' },
//     { id: 21, name: 'Vishnu Serghei', registered: '2018/01/01', role: 'Member', status: 'Active' },
//     { id: 22, name: 'Zbyněk Phoibos', registered: '2018/02/01', role: 'Staff', status: 'Banned' },
//     { id: 23, name: 'Aulus Agmundr', registered: '2018/01/01', role: 'Member', status: 'Pending' },
//     { id: 42, name: 'Ford Prefect', registered: '2001/05/25', role: 'Alien', status: 'Don\'t panic!' }
// ];


//   const fields = [
//     { key: 'name', _style: { width: '40%'} },
//     'registered',
//     { key: 'role', _style: { width: '20%'} },
//     { key: 'status', _style: { width: '20%'} }    
//   ]

const fields = [
    { key: 'fullname', _style: { width: '30%' } },
    { key: 'email', _style: { width: '40%' } },
    { key: 'role', _style: { width: '10%' } },
    { key: 'status', _style: { width: '10%' } },
    { key: 'region', _style: { width: '10%' } },
];

export default class UserDashboard extends React.Component {
    state = {
        dataAPI : [],
        loadingProp:true
    };
    componentDidMount(prevProps) {
        axios.get(`/Users`)
            .then(resp => {
                if (resp.status === 200) {
                    // dataAPI = Object.entries(dataAPI);
                    // DataArray = Object.keys(dataAPI).map((key) => [Number(key), dataAPI[key]]);
                    //console.log(dataAPI);
                    this.setState({
                        dataAPI : resp.data,
                        loadingProp:false
                    });
                    // console.log(DataArray);
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
            <CContainer>
            <br/><h1>User List Page</h1><br/>
            <CRow gutters={true}>
            <CCol md="12">
                <CDataTable
                    items={this.state.dataAPI}
                    fields={fields}
                    columnFilter
                    tableFilter
                    itemsPerPage={5}
                    loading ={this.state.loadingProp}                   
                    responsive
                    sorter
                    // clickableRows
                    // outlined
                    // header
                />
                </CCol>
                
                </CRow>
                </CContainer>
            </div>
        )
    }
}

