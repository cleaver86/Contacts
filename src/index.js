import React from "react";
import { render } from "react-dom";
import UsersList from "./components/users";
import { action, decorate, observable, computed } from "mobx";
import { observer } from "mobx-react";
import "./index.css";

class UserStore {
  @observable users = [];
  constructor() {
    this.fetch();
  }
  fetch() {
    fetch("https://sheetdb.io/api/v1/5b7c675430b82")
      .then(response => response.json())
      .then(parsedResponse =>
        parsedResponse.map(user => ({
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          avatar: user.avatar
        }))
      )
      .then(users => (this.users = users));
  }
  save() {
    const body = {
      data: JSON.stringify(this.users)
    };
    const url = new URL("https://sheetdb.io/api/v1/5b7c675430b82");
    url.searchParams.append("data", JSON.stringify(this.users));

    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST"
    })
      .then(response => response.json())
      .then(parsedResponse => this.fetch());
  }
  // @computed
  // get unfinishedTodoCount() {
  //   return values(this.todos).filter(todo => !todo.finished).length
  // }
  @action
  addUser() {
    this.users.push({
      id: Math.random()
        .toString(36)
        .substring(7),
      first_name: "Some First Name",
      last_name: "Some Last Name",
      email: "email@domain.com",
      avatar: "https://robohash.org/doloresoditcommodi.jpg?size=50x50&set=set1"
    });
  }

  @action
  removeUser(id) {
    const users = this.users.filter(user => {
      return user.id !== id;
    });

    this.users = users;
  }
}

// decorate(TodoList, {
//   todos: observable,
//   unfinishedTodoCount: computed,
//   addTodo: action.bound
// })

// decorate(Store, {
//   users: observable
// });

const userStore = new UserStore();

class App extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <h1>Lists</h1>
        <UsersList userStore={userStore} />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
