import React from "react";

//TODO Learn about currying
const loader = propName => WrappedComponent => {
  return class loader extends React.Component {
    render() {
      return this.props[propName].length ? (
        <WrappedComponent {...this.props} />
      ) : (
        <div className="loader" />
      );
    }
  };
};

export default loader;
