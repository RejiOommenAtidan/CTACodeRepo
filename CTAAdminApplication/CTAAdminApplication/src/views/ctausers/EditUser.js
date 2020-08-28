import React from 'react';
// import { connect } from 'react-redux';
import UserForm from './UserForm';
// import { startEditUser, startRemoveUser } from '../actions/users';
import axios from 'axios';
import CCol from "@coreui/react/src/grid/CCol";
import CContainer from "@coreui/react/src/grid/CContainer";
import CRow from "@coreui/react/src/grid/CRow";
import CForm from "@coreui/react/src/form/CForm";
import CFormGroup from "@coreui/react/src/form/CFormGroup";
import CLabel from "@coreui/react/src/form/CLabel";
import { CInput } from "@coreui/react/src/form/CInput";
import CButton from "@coreui/react/src/button/CButton";
import CDropdown from "@coreui/react/src/dropdown/CDropdown";
import CDropdownItem from "@coreui/react/src/dropdown/CDropdownItem";
import CDropdownToggle from "@coreui/react/src/dropdown/CDropdownToggle"
import CDropdownMenu from "@coreui/react/src/dropdown/CDropdownMenu";

export default class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: props.user ? props.user.user_id : '',
      username: props.user ? props.user.username : '',
      fullname: props.user ? props.user.fullname : '',
      email: props.user ? props.user.email : '',
      password: props.user ? props.user.password : '',
      confirm_password: props.user ? props.user.confirm_password : '',
      role: props.user ? props.user.role : '',
      region: props.user ? props.user.region : '',
      status: props.user ? props.user.status : '',
      error: ''
    };
  }
  // state = {
  //  user:{}
  // };

  onUsernameChange = (e) => {
    const username = e.target.value;
    this.setState(() => ({ username }));
  };
  onFullnameChange = (e) => {
    const fullname = e.target.value;
    this.setState(() => ({ fullname }));
  };
  onEmailChange = (e) => {
    const email = e.target.value;
    this.setState(() => ({ email }));
  };
  onPasswordChange = (e) => {
    const password = e.target.value;
    this.setState(() => ({ password }));
  };
  onConfirmPasswordChange = (e) => {
    const confirm_password = e.target.value;
    this.setState(() => ({ confirm_password }));
  };
  onRoleChange = (e) => {
    const role = e.target.text;
    this.setState(() => ({ role }));
  };
  onRegionChange = (e) => {
    const region = e.target.text;
    this.setState(() => ({ region }));
  };
  onStatusChange = (e) => {
    const status = e.target.text;
    console.log(status);
    this.setState(() => ({ status }));
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.setState(() => ({ error: '' }));
    let user = {
      user_id : this.state.user_id,
      username: this.state.username,
      fullname: this.state.fullname,
      email: this.state.email,
      password: this.state.password,
      confirm_password: this.state.confirm_password,
      role: this.state.role,
      region: this.state.region,
      status: this.state.status
    };
    // console.log(user);
    let a = this.props.match.params.user_Id;
    a = a.toString();
    console.log(a);
    axios.post(`/Users/EditUser/userID=` + a, user)
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp.data);
          // console.log(this.props);
          this.props.history.push(`/`);
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

  // onSubmit = (user) => {
  //   console.log(user);
  //   let a = this.props.match.params.user_Id;
  //   a = a.toString();
  //   axios.post(`/Users/EditUser/userID=` + a, user)
  //     .then(resp => {
  //       if (resp.status === 200) {
  //         console.log(resp.data);
  //         // console.log(this.props);
  //         this.props.history.push(`/`)
  //         // var user = resp.data;
  //         // window.location.reload();
  //         // dispatch(addUser({
  //         //   user
  //         // }));
  //       }
  //     })
  //     .catch(error => {
  //       if (error.response) {
  //         //The request was made and the server responded 
  //         //with a status code that falls out of the range of 2xx OR in 4XX to 5XX range
  //         console.error(error.response.data);
  //         console.error(error.response.status);
  //         console.error(error.response.headers);
  //       } else if (error.request) {
  //         // The request was made but no response was received 
  //         //`error.request` is an instance of XMLHttpRequest in the browser 
  //         //and an instance of http.ClientRequest in node.js
  //         console.warn(error.request);
  //       } else {
  //         // Something happened in setting up the request that triggered an Error
  //         console.error('Error', error.message);
  //       }
  //       console.log(error.config);
  //     })
  //     .then(release => {
  //       //always executed
  //       //console.log(release); => udefined
  //     });
  //   this.props.history.push('/userlist');
  // }

  componentDidMount(prevProps) {
    console.log(this.state.user)
    // console.log(this.props.match.params.user_Id);
    let a = this.props.match.params.user_Id;
    a = a.toString();
    axios.get(`Users/GetUser/userID=` + a)
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp.data)
          this.setState(prevState => ({
            // user: {
            //   ...prevState.user,
            //   // user_id:resp.data.user_Id,
            // username: resp.data.username,
            // fullname: resp.data.fullname,
            // email: resp.data.email,
            // password: resp.data.password,
            // confirm_password: resp.data.confirm_Password,
            // role: resp.data.role,
            // region: resp.data.region,
            // status: resp.data.status,
            user_id: resp.data.user_Id,
            username: resp.data.username,
            fullname: resp.data.fullname,
            email: resp.data.email,
            password: resp.data.password,
            confirm_password: resp.data.confirm_Password,
            role: resp.data.role,
            region: resp.data.region,
            status: resp.data.status
          }));
          // console.log(this.state.user);
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
        <h1>Edit User</h1>
        <CContainer>
          <CForm>
            <CRow>
              <CCol sm="6">
                <CFormGroup>
                  <CLabel htmlFor="nf-username">Username</CLabel>
                  <CInput
                    type="textbox"
                    id="nf-username"
                    name="nf-username"
                    placeholder="Enter Username.."
                    autoComplete="username"
                    autoFocus
                    value={this.state.username}
                    onChange={this.onUsernameChange}
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-fullname">Fullname</CLabel>
                  <CInput
                    type="textbox"
                    id="nf-fullname"
                    name="nf-fullname"
                    placeholder="Enter Fullname.."
                    autoComplete="fullname"
                    value={this.state.fullname}
                    onChange={this.onFullnameChange}
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">Email</CLabel>
                  <CInput
                    type="email"
                    id="nf-email"
                    name="nf-email"
                    placeholder="Enter Email.."
                    autoComplete="email"
                    value={this.state.email}
                    onChange={this.onEmailChange}
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-password">Password</CLabel>
                  <CInput
                    type="password"
                    id="nf-password"
                    name="nf-password"
                    placeholder="Enter Password.."
                    autoComplete="password"
                    value={this.state.password}
                    onChange={this.onPasswordChange}
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-confirm_password">Confirm Password</CLabel>
                  <CInput
                    type="password"
                    id="nf-confirm_password"
                    name="nf-confirm_password"
                    placeholder="Enter Confirm Password.."
                    autoComplete="confirm_password"
                    value={this.state.confirm_password}
                    onChange={this.onConfirmPasswordChange}
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-role">Role</CLabel>
                  <CDropdown>
                    <CDropdownToggle id="nf-role" caret color="info">
                      Select Role
                                    </CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem onClick={this.onRoleChange}>Trainee Software Developer</CDropdownItem>
                      <CDropdownItem onClick={this.onRoleChange}>Software Developer</CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-region">Region</CLabel>
                  <CDropdown>
                    <CDropdownToggle id="nf-region" caret color="info">
                      Select Region
                                    </CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem onClick={this.onRegionChange}>Mumbai</CDropdownItem>
                      <CDropdownItem onClick={this.onRegionChange}>Pune</CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-status">Status</CLabel>
                  <CDropdown>
                    <CDropdownToggle id="nf-status" caret color="info">
                      Select Status
                                    </CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem onClick={this.onStatusChange}>Active</CDropdownItem>
                      <CDropdownItem onClick={this.onStatusChange}>Inactive</CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                </CFormGroup>
              </CCol>
              <CCol sm="6"></CCol>
            </CRow>
            <div className="wrapper">
              <CButton shape="pill" variant="outline" size="md" color="success" onClick={this.onSubmit}>Save</CButton>
            </div>
          </CForm>
        </CContainer>
      </CContainer>
    );
  }
};

// const mapStateToProps = (state, props) => ({
//   user: state.users.find((user) => user.id === props.match.params.id)
// });

// const mapDispatchToProps = (dispatch, props) => ({
//   startEditUser: (id, user) => dispatch(startEditUser(id, user)),
//   startRemoveUser: (data) => dispatch(startRemoveUser(data))
// });

// export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
// export default EditUser;

