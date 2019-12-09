import React from 'react';
import PropTypes from 'prop-types';

import Dropdown from './Dropdown';
import Textbox from './Textbox';
import localisation from "../constants/localisation";

const LoginForm = ({ language, username, password, onUsernameChange, onPasswordChange, onLogin, errorMsg }) => (
  <div>
    <h2>{localisation[language].LOGIN.title}</h2>
    <table>
      <tbody>
        <tr>
          <td><label>{localisation[language].LOGIN.usernameLabel}</label></td>
          <td>
            <Textbox
              name="username"
              value={username}
              placeholder={localisation[language].LOGIN.usernamePlaceholder}
              onChange={onUsernameChange} />
          </td>
        </tr>
        <tr>
          <td><label>{localisation[language].LOGIN.passwordLabel}</label></td>
          <td>
            <Textbox
              name="password"
              value={password}
              placeholder={localisation[language].LOGIN.passwordPlaceholder}
              onChange={onPasswordChange}
              isPassword={true} />
          </td>
        </tr>
        {console.log(errorMsg)}
        {errorMsg ? (
          <tr>
            <td colSpan="2" style={{color: 'red'}}>{localisation[language].LOGIN.errorMsg}</td>
          </tr> ) : null} 
        <tr>
          <td><button onClick={onLogin}>{localisation[language].LOGIN.button}</button></td>
        </tr>
      </tbody>
    </table>
  </div>
);

LoginForm.propTypes = {
  language: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onUsernameChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  errorMsg: PropTypes.string,
};

export default LoginForm;
