import React, { Component } from "react";

import { doEmailUpdate } from "../firebase/auth";

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  email: "",
  error: null
};

class EmailUpdateForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    doEmailUpdate(email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
      });

    event.preventDefault();
  };

  render() {
    const { email, error } = this.state;
    const isInvalid = email === "";

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={email}
          onChange={event =>
            this.setState(byPropKey("email", event.target.value))
          }
          placeholder="New email"
        />
        <button disabled={isInvalid} type="submit">
          Update my Email
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default EmailUpdateForm;
