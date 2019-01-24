import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { signupAction } from '../../actions';
import { connect } from 'react-redux';
import { Loader } from '../universal/loader/loader';

import './signin.less';

class Signup extends Component {

  constructor (props) {
    super(props);
    this.state = {};
  }

  componentWillMount () {
    this.setState({ loader: false, errorMessage: '' });
  }

  submit = (values) => {
    this.setState({loader: true, errorMessage: '' });
    this.props.signupAction(values, this.props.history);
  }

  componentWillReceiveProps (newProps) {
    // console.log('here they are', newProps);
    if (newProps.errorMessage) {
      this.setState({errorMessage: newProps.errorMessage});
      this.setState({loader: false});
      return;
    }
  }

  showLoader () {
    if (this.state.loader) {
      return <Loader></Loader>;
    } else {
      return <div></div>
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="app-signin">
        Sign Up
        <form onSubmit={ handleSubmit(this.submit) }>
          <div className="form-group">
            <label>Username:</label>
            <Field name="username"
                  component={renderField}
                  type="text"
                  placeholder="Username"
            />
          </div>
          <div className="form-group">
            <label>Email Address:</label>
            <Field name="email"
                  component={renderField}
                  type="email"
                  placeholder="Email Address"
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <Field name="password"
                  component={renderField}
                  type="password"
                  placeholder="Password"
            />
          </div>
          <div className="form-group">
            <label>Confirm Password:</label>
            <Field name="confirmPassword"
                  component={renderField}
                  type="password"
                  placeholder="Confirm Password"
            />
          </div>
          <div className="bottom-error-message">{this.state.errorMessage}</div>
          <div className="signin-btn">
            <button type="submit">Sign Up</button>
          </div>
        </form>
        {this.showLoader()}
      </div>
    );
  }
}

const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Username is required';
  }
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Please confirm password';
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Passwords do not match';
  }
  return errors;
}

const renderField = ({
  input,
  type,
  placeholder,
  meta: { touched, error }
}) => (
  <div>
    <div className="input-container">
      <input {...input} placeholder={placeholder} type={type} />
      {touched &&
        (error && <div className="error-message">{error}</div>)}
    </div>
  </div>
);

function mapStateToProps(state) {
  return { errorMessage: state.auth.signupError };
}

const reduxFormSignup = reduxForm({
  form: 'signup',
  validate
})(Signup);

export default connect(mapStateToProps, {signupAction})(reduxFormSignup);
