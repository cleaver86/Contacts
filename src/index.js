import React from "react";
import { render } from "react-dom";
import Users from "./components/users";

import "./index.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }
  componentWillMount() {
    fetch("https://api.randomuser.me/?results=50")
      .then(response => response.json())
      .then(parsedResponse =>
        parsedResponse["results"].map(user => ({
          name: user.name.first + user.name.last,
          email: user.email,
          thumbnail: user.picture.thumbnail
        }))
      )
      .then(users => this.setState({ users }));
  }
  render() {
    return (
      <div>
        <h1>Lists</h1>
        <Users users={this.state.users} />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
