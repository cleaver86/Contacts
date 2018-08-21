import React from "react";

//TODO Learn about currying
const loader = propName => WrappedComponent => {
  return class loader extends React.Component {
    render() {
      return this.props["userStore"]["users"].length ? (
        <WrappedComponent {...this.props} />
      ) : (
        <div className="loader" />
      );
    }
  };
};

export default loader;
