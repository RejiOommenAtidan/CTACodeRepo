import React from 'react';
import { connect } from 'react-redux';
import UserForm from './UserForm';
import { startEditUser, startRemoveUser } from '../actions/users';

export class EditUser extends React.Component {
  onSubmit = (user) => {
    this.props.startEditUser(this.props.user.id, user);
    this.props.history.push('/');
  };
  onRemove = () => {
    this.props.startRemoveUser({ id: this.props.user.id });
    this.props.history.push('/');
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit User</h1>
          </div>
        </div>
        <div className="content-container">
          <UserForm
            user={this.props.user}
            onSubmit={this.onSubmit}
          />
          <button className="button button--secondary" onClick={this.onRemove}>Remove User</button>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => ({
  user: state.users.find((user) => user.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditUser: (id, user) => dispatch(startEditUser(id, user)),
  startRemoveUser: (data) => dispatch(startRemoveUser(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
