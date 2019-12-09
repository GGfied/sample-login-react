import React from 'react';
import { connect } from 'react-redux';
import { user } from '../types'
import localisation from "../constants/localisation";

const UserPage = ({ user: { language, name, username, roles } }) => {
  return (
    <div>
      <h2 className="alt-header">{localisation[language].USER.title}</h2>
      <p>
        {localisation[language].USER.msg} User {name} ({username})
      </p>
    </div>
  );
};


UserPage.propTypes = { 
  user: user.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
)(UserPage);
