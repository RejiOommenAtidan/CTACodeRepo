import React from 'react';
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

export default class UserForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // user_id:  props.user ? props.user.user_id : '',
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
        // this.onUsernameChange = this.onUsernameChange.bind(this);
        // this.onFullnameChange = this.onFullnameChange.bind(this);
        // this.onEmailChange = this.onEmailChange.bind(this);
        // this.onPasswordChange = this.onPasswordChange.bind(this);
        // this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
        // this.onRoleChange = this.onRoleChange.bind(this);
        // this.onRegionChange = this.onRegionChange.bind(this);
        // this.onStatusChange = this.onStatusChange.bind(this);
    }
    // static getDerivedStateFromProps(props, state) {
    //     return { 
           
    //             // username: props.user.username,
    //             // fullname: props.user.fullname,
    //             // email: props.user.email,
    //             // password: props.user.password ,
    //             // confirm_password:props.user.confirm_password ,
    //             // role: props.user.role ,
    //             // region: props.user.region ,
    //             // status: props.user.status ,
    //     };
    //    }
    onUsernameChange = (e) => {
        const username = e.target.value;
        this.setState(() => ({ username }));
        // console.log(username);
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
        this.props.onSubmit({

            username: this.state.username,
            fullname: this.state.fullname,
            email: this.state.email,
            password: this.state.password,
            confirm_password: this.state.confirm_password,
            role: this.state.role,
            region: this.state.region,
            status: this.state.status,
        });
    };
    render() {
        return (
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
        )
    }
}
