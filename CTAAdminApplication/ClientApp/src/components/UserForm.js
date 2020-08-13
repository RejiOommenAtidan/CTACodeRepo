import React from 'react';
import CCol from "@coreui/react/src/grid/CCol";
import CContainer from "@coreui/react/src/grid/CContainer";
import CRow from "@coreui/react/src/grid/CRow";
import CForm from "@coreui/react/src/form/CForm";
import CFormGroup from "@coreui/react/src/form/CFormGroup";
import CLabel from "@coreui/react/src/form/CLabel";
import { CInput } from "@coreui/react/src/form/CInput";
import CButton from "@coreui/react/src/button/CButton";

export default class UserForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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
        const role = e.target.value;
        this.setState(() => ({ role }));
    };
    onRegionChange = (e) => {
        const region = e.target.value;
        this.setState(() => ({ region }));
    };
    onStatusChange = (e) => {
        const status = e.target.value;
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
        // alert("WQasdf");

    };
    render() {
        return (
            <CContainer>
                <CRow>
                    <CCol sm="12">
                        <CForm>
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
                                <CInput
                                    type="text"
                                    id="nf-role"
                                    name="nf-role"
                                    placeholder="Enter Role.."
                                    value={this.state.role}
                                    onChange={this.onRoleChange}
                                />
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel htmlFor="nf-region">Region</CLabel>
                                <CInput
                                    type="text"
                                    id="nf-region"
                                    name="nf-region"
                                    placeholder="Enter Region.."
                                    value={this.state.region}
                                    onChange={this.onRegionChange}
                                />
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel htmlFor="nf-status">Status</CLabel>
                                <CInput
                                    type="text"
                                    id="nf-status"
                                    name="nf-status"
                                    placeholder="Enter Status.."
                                    value={this.state.status}
                                    onChange={this.onStatusChange}
                                />
                            </CFormGroup>
                            <CButton shape="pill" variant="outline" size="md" color="success" onClick={this.onSubmit}>Save</CButton>
                        </CForm>
                    </CCol>
                </CRow>
            </CContainer>
        )
    }
}
