import React from "react";
import HOCloader from "../HOC/loader";
import { observer } from "mobx-react";

@HOCloader("users")
class Users extends React.Component {
  static defaultProps = {
    users: []
  };
  removeUser(id) {
    this.props.userStore.removeUser(id);
  }
  handleAddUserClick = () => {
    this.props.userStore.addUser();
    this.props.userStore.save();
  };
  renderUser(user) {
    return (
      <li
        style={{
          display: "block",
          margin: 10,
          padding: 10,
          width: 300,
          height: 50,
          border: "1px solid gray"
        }}
      >
        <div style={{ width: "50px", height: "50px", float: "left" }}>
          <img width="50" height="50" src={user.avatar} />
        </div>
        <div style={{ width: "75%", float: "right" }}>
          <ul style={{ margin: 0, padding: 0, listStyleType: "none" }}>
            <li>{user.name}</li>
            <li>{user.email}</li>
          </ul>
        </div>
        <a
          onClick={() => {
            this.removeUser(user.id);
          }}
        >
          Remove
        </a>
      </li>
    );
  }
  render() {
    return (
      <div style={{ width: 500, margin: "0 auto" }}>
        <a onClick={this.handleAddUserClick}>Add User</a>
        <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
          {this.props.userStore.users.map(user => this.renderUser(user))}
        </ul>
      </div>
    );
  }
}

export default observer(Users);
