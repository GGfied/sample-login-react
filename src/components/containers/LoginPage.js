import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/authActions';
import LoginForm from '../LoginForm';
import { user } from '../../types';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggingIn: false,
      username: '',
      password: '',
      errorMsg: '',
      language: props.user.language,
    }
  }

  componentDidMount() {
    this.props.actions.initLogin();
  }

  componentDidUpdate(prevProps) {
    console.log(this.props, prevProps, this.state);
   if (this.props.user.loginErrorMsg !== prevProps.user.loginErrorMsg ||
       this.props.user.loginErrorMsg !== this.state.errorMsg ||
       this.props.user.language !== prevProps.user.language) {
     this.setState({
      ...this.state,
      errorMsg: this.props.user.loginErrorMsg,
      language: this.props.user.language,
     });
   }
  }

  onUsernameChange = e => {
    this.setState({
      ...this.state,
      username: e.target.value,
    });
  }

  onPasswordChange = e => {
    this.setState({
      ...this.state,
      password: e.target.value,
    });
  }

  onLogin = () => {
    if (this.props.user.isLoggingIn) {
      alert("Logging In!");
    } else {
      this.props.actions.login(this.state.username, this.state.password);
    }
  }

  render() {
    return (
      <LoginForm
        language={this.state.language}
        username={this.state.username}
        password={this.state.password}
        onUsernameChange={this.onUsernameChange}
        onPasswordChange={this.onPasswordChange}
        onLogin={this.onLogin}
        errorMsg={this.state.errorMsg} />
    );
  }
}

LoginPage.propTypes = { 
  actions: PropTypes.object.isRequired,
  user: user.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
