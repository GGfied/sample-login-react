import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from "react-router-dom";
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../../actions/authActions';
import { user } from '../../types';

class PrivateRoute extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isAuthenticated: this.isAuthenticated(props),
		};
	}

	isAuthenticated(props) {
		const { isRefreshingToken, isTestingToken, accessToken, refreshToken } = props.user;

		return !isRefreshingToken && !isTestingToken && accessToken.length > 0 && refreshToken.length > 0;
	}

	isAuthenticating(props) {
		const { isRefreshingToken, isTestingToken } = props.user;

		return isRefreshingToken || isTestingToken;
	}

	sendTestTokenRequest(props) {
		const { isRefreshingToken, isTestingToken, accessToken, refreshToken } = props.user;

		if (accessToken && refreshToken && !isRefreshingToken && !isTestingToken) {
			props.actions.testToken(props.isRequireAdmin, accessToken, refreshToken);
		}

	}

	componentDidMount() {
		this.sendTestTokenRequest(this.props);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.pathname !== this.props.pathname) {
			this.sendTestTokenRequest(this.props);
		} else if (!this.props.user.isRefreshingToken &&
			!this.props.user.isTestingToken && (
				prevProps.user.isRefreshingToken !== this.props.user.isRefreshingToken ||
				prevProps.user.isTestingToken !== this.props.user.isTestingToken)) {
			this.setState = ({
				isAuthenticated: this.isAuthenticated(this.props),
			});
		}
	}

	render() {
		const { component: Component, user, actions, isRequireAdmin, ...rest } = this.props;
		const isAuthenticated = this.state.isAuthenticated;
		const isAuthenticating = this.isAuthenticating(this.props);

		return isAuthenticating ? null : (
			<Route {...rest} render={props => {
				return isAuthenticated ?
					( <Component {...props} /> ) :
					( <Redirect to={{
						pathname: '/',
						state: { from: props.location }
					}} /> );
			}} />
		);
	}
}

PrivateRoute.propTypes = {
	component: PropTypes.object.isRequired,
	user: user.isRequired,
	actions: PropTypes.object.isRequired,
	isRequireAdmin: PropTypes.bool,
	pathname: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  pathname: state.router.location.pathname,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);