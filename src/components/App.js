/* eslint-disable import/no-named-as-default */
import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Switch, NavLink } from "react-router-dom";
import { hot } from "react-hot-loader";

import * as actions from "../actions/configActions";
import UserPage from "./UserPage";
import AdminPage from "./AdminPage";
import NotFoundPage from "./NotFoundPage";
import LoginPage from "./containers/LoginPage";
import PrivateRoute from "./containers/PrivateRoute";
import Dropdown from "./Dropdown";
import localisation from "../constants/localisation";

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        language: props.language,
    };

    this.changeLanguage = this.changeLanguage.bind(this);
  }

  changeLanguage(e) {
    this.props.actions.changeLanguage(e.target.value);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.language !== this.props.language) {
      this.setState({
        language: this.props.language,
      });
    }
  }

  render() {
    const activeStyle = { color: 'blue' };
    const lang = localisation[this.state.language];

    return (
      <div>
        <nav>
          <Dropdown
            name="language-dropdown"
            choices={[{ 'name': "EN", 'value': 'English' }, { 'name': "CN", 'value': '简体中文' }]}
            selectedChoice={this.state.language}
            onChange={this.changeLanguage} />
          {' | '}
          <NavLink exact to="/" activeStyle={activeStyle}>{lang.APP.LOGIN}</NavLink>
          {' | '}
          <NavLink exact to="/user" activeStyle={activeStyle}>{lang.APP.USER}</NavLink>
          {' | '}
          <NavLink exact to="/admin" activeStyle={activeStyle}>{lang.APP.ADMIN}</NavLink>
        </nav>

        <main>
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <PrivateRoute exact path="/user" component={UserPage} />
            <PrivateRoute exact path="/admin" component={AdminPage} isRequireAdmin={true} />
            <Route component={NotFoundPage} />
          </Switch>
        </main>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  location: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  location: state.router.location.pathname,
  language: state.user.language,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(App));
