import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {
  CBadge,
  CCol,
  CDataTable,
  CRow,
  CContainer,
  CButton,
  CModal, CModalBody, CModalHeader, CModalFooter

} from '@coreui/react'


const fields = [
  { key: 'fullname', _style: { width: '20%' } },
  { key: 'email', _style: { width: '20%' } },
  { key: 'role', _style: { width: '20%' } },
  { key: 'status', _style: { width: '10%' } },
  { key: 'region', _style: { width: '10%' } },
  { key: 'edit', _style: { width: '10%' } },
  { key: 'delete', _style: { width: '10%' } },
];

const getBadge = (status) => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}

// const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
// const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
// const [page, setPage] = useState(currentPage)

// const pageChange = newPage => {
//   currentPage !== newPage && history.push(`/users?page=${newPage}`)
// }

export default class UserList extends React.Component {
  state = {
    dataAPI: [],
    loadingProp: true,
    modal: false,
    selectedUser:''
  };
  deleteUser = ()=>{
    console.log(this.state.selectedUser);
    // this.props.startAddUser(user);
    const config = { headers: {"Content-Type": "application/json"} };
    
    var userID = this.state.selectedUser.toString();
    // let data ={'userID':userID}
    // data = JSON.stringify(data);
    // console.log(data)
    // userID  =JSON.stringify(userID);
    axios.post(`/Users/DeleteUser`,userID,config)
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp.data);
          // console.log(this.props);
          this.closeModal();
          this.props.history.push(`/`)
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
    this.props.history.push('/userlist');
  };
  openModal = (user_Id) => {
    // alert(user_Id);
    this.setState({
      modal: true,
      selectedUser:user_Id
    });
    // alert(this.state.currentUser)
  }
  closeModal = () => {
    this.setState({
      modal: false,
      selectedUser:''
    });
  }
  componentWillReceiveProps() {
    axios.get(`/Users/GetUsers`)
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp.data)
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
  componentDidMount(prevProps) {
    axios.get(`/Users/GetUsers`)
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp.data)
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
    // const history = useHistory()
    // const [modal, setModal] = useState(false);
    return (
      <CContainer>
        <br /><h1>User List</h1>
        <CRow gutters={true}>
          <CCol sm="12">
            <br />
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
              pagination
              scopedSlots={{
                'status':
                  (item) => (
                    <td>
                      <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge>
                    </td>
                  ),
                'edit':
                  (item, index) => {
                    return (
                      <td className="py-2">
                        <CButton
                          color="primary"
                          variant="outline"
                          shape="square"
                          size="sm"
                          onClick={() => { this.props.history.push(`/edituser/${item.user_Id}`) }}
                        >Edit
                        </CButton>
                      </td>
                    )
                  },
                'delete':
                  (item, index) => {
                    return (
                      <td className="py-2">
                        <CButton
                          color="danger"
                          variant="outline"
                          shape="square"
                          size="sm"
                          onClick={() => { this.openModal(item.user_Id) }}
                        >Delete
                        </CButton>
                      </td>
                    )
                  }
              }}
            />
          </CCol>
        </CRow>
        <CModal
        show={this.state.modal}
        onClose={this.closeModal}
      >
        <CModalHeader closeButton>Delete User {this.state.selectedUser} ?</CModalHeader>
        <CModalBody>
          Are you sure you want to delete this user ?
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={this.deleteUser}>Yes</CButton>{' '}
          <CButton
            color="info"
            onClick={this.closeModal}
          >No</CButton>
        </CModalFooter>
      </CModal>
      </CContainer>
    )
  }
}
