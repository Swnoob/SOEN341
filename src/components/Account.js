import React from "react";

import AuthUserContext from "./AuthUserContext";
import PasswordChangeForm from "./PasswordChange";
import EmailUpdateForm from "./EmailUpdate";
import FullnameUpdateForm from "./FullnameUpdate";

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1>Account: {authUser.email}</h1>
        <PasswordChangeForm />
        <EmailUpdateForm />
        <FullnameUpdateForm />
      </div>
    )}
  </AuthUserContext.Consumer>
);

export default AccountPage;
