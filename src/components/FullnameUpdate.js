import React, { Component } from "react";

import { auth } from "../firebase";
import { db } from "../firebase/firebase";
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  fullname: "",
  error: null
};

class FullnameUpdateform extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { fullname } = this.state;

    var user = auth().currentUser;
    db.collection("users")
      .doc(user.uid)
      .update({
        name: fullname
      })
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
      });

    event.preventDefault();
  };

  render() {
    const { fullname, error } = this.state;

    const isInvalid = fullname === "";

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={fullname}
          onChange={event =>
            this.setState(byPropKey("fullname", event.target.value))
          }
          placeholder="New Nick Name"
        />
        <button disabled={isInvalid} type="submit">
          Update
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default FullnameUpdateform;
