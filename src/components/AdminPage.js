import React from 'react';
import { connect } from 'react-redux';
import { user } from '../types'
import localisation from "../constants/localisation";

const AdminPage = ({ user: { language, name, username, roles } }) => {
  return (
    <div>
      <h2 className="alt-header">{localisation[language].ADMIN.title}</h2>
      <p>
        {localisation[language].ADMIN.msg} Manager {name} ({username})
      </p>
    </div>
  );
};


AdminPage.propTypes = { 
  user: user.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
)(AdminPage);
