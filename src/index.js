import React from "react";
import { render } from "react-dom";
import RecipeList from "./components/recipes";
import { action, decorate, observable, computed } from "mobx";
import "./index.css";

class RecipeStore {
  @observable recipes = [];
  constructor() {
    this.fetch();
  }
  fetch() {
    fetch("https://gw.hellofresh.com/api/recipes/search?country=ca", {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjgwNzdjLTI1M2UtNGE2MS05YTUxLTFkMTA0YWFmZjNmNiIsInVzZXJuYW1lIjoiY29yeS5jbGVhdmVyQGdtYWlsLmNvbSIsImVtYWlsIjoiY29yeS5jbGVhdmVyQGdtYWlsLmNvbSIsImNvdW50cnkiOiJjYSIsImJsb2NrZWQiOmZhbHNlLCJtZXRhZGF0YSI6eyJuYW1lIjoiQ29yeSBDbGVhdmVyIn0sInJvbGVzIjpbXSwiZXhwIjoxNTM2ODkzNzQ0LCJqdGkiOiI0NmMwY2ZhYy1jNDQzLTQ1MDYtODVkMy05MzlhMzBkNGMxOTAiLCJpYXQiOjE1MzQyNjQwMDEsImlzcyI6IjRlNmQ5OGU1LTk3MmMtNGMzZC1hZGQ0LTZhMzI0MzEyM2ZjYSIsInN1YiI6IjYzNjgwNzdjLTI1M2UtNGE2MS05YTUxLTFkMTA0YWFmZjNmNiJ9.Eu7-eEAfnPggrGJOjjSX-hBhAopAd92PTYiG-5YOPAk"
      }
    })
      .then(response => response.json())
      .then(parsedResponse => parsedResponse.items)
      .then(recipes => (this.recipes = recipes))
      .then(() => {
        console.log(this.recipes);
      });
    // fetch("https://sheetdb.io/api/v1/5b7c675430b82")
    //   .then(response => response.json())
    //   .then(parsedResponse =>
    //     parsedResponse.map(user => ({
    //       name: `${user.first_name} ${user.last_name}`,
    //       email: user.email,
    //       avatar: user.avatar
    //     }))
    //   )
    //   .then(users => (this.users = users));
  }
  save() {
    const body = {
      data: JSON.stringify(this.recipes)
    };
    const url = new URL("https://sheetdb.io/api/v1/5b7c675430b82");
    url.searchParams.append("data", JSON.stringify(this.recipes));

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
  addRecipe() {
    this.recipes.push({
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
  removeRecipe(id) {
    const recipes = this.recipes.filter(recipe => {
      return recipe.id !== id;
    });

    this.recipes = recipes;
  }
}

const recipeStore = new RecipeStore();

class App extends React.Component {
  constructor() {
    super();
  }
  render() {
    console.log(recipeStore.recipes);
    return <RecipeList recipeStore={recipeStore} />;
  }
}

render(<App />, document.getElementById("root"));
