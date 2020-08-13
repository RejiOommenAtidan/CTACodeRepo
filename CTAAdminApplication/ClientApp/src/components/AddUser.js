import React from 'react';
import { connect } from 'react-redux';
import UserForm from './UserForm';
import { startAddUser } from '../actions/users';
import CCol from "@coreui/react/src/grid/CCol";
import CContainer from "@coreui/react/src/grid/CContainer";
import CRow from "@coreui/react/src/grid/CRow";

export class AddUser extends React.Component {
  onSubmit = (user) => {
    console.log(user);
    this.props.startAddUser(user);
    this.props.history.push('/dashboard');
  };
  render() {
    return (
      <CContainer>
        <CRow>
          <CCol sm="12">
            <h1>Add User</h1>
            <UserForm
              onSubmit={this.onSubmit}
            />
          </CCol>
        </CRow>
      </CContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddUser: (user) => dispatch(startAddUser(user))
});

export default connect(undefined,mapDispatchToProps)(AddUser);
