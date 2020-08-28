import React from 'react';
// import { connect } from 'react-redux';
import UserForm from './UserForm';
// import { startAddUser } from './actions/ctausers';
import axios from 'axios';
import CContainer from "@coreui/react/src/grid/CContainer";



export class AddUser extends React.Component {
  constructor(props){
    super(props);
  }
  onSubmit = (user) => {
    console.log(user);
    // this.props.startAddUser(user);
    axios.post(`/Users/AddUser`,user)
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp.data);
          // console.log(this.props);
          this.props.history.push(`/`)
          // var user = resp.data;
          // window.location.reload();
          // dispatch(addUser({
          //   user
          // }));
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
  render() {
    return (
      <CContainer>
            <h1>Add User</h1>
            <UserForm onSubmit={this.onSubmit}/>
      </CContainer>
    );
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   startAddUser: (user) => dispatch(startAddUser(user))
// });

// export default connect(undefined,mapDispatchToProps)(AddUser);

export default AddUser;