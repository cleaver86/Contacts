import React from "react";
import HOCloader from "../HOC/loader";

@HOCloader("users")
export default class Users extends React.Component {
  static defaultProps = {
    users: []
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
        <div style={{ width: "25%", float: "left" }}>
          <img src={user.thumbnail} />
        </div>
        <div style={{ width: "75%", float: "right" }}>
          <ul style={{ margin: 0, padding: 0, listStyleType: "none" }}>
            <li>{user.name}</li>
            <li>{user.email}</li>
          </ul>
        </div>
      </li>
    );
  }
  render() {
    return (
      <div style={{ width: 500, margin: "0 auto" }}>
        <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
          {this.props.users.map(user => this.renderUser(user))}
        </ul>
      </div>
    );
  }
}
