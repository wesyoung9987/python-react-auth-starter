import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { signInAction } from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './signin.less';

class Signin extends Component {
  submit = (values) => {
    this.props.signInAction(values, this.props.history);
  }

  errorMessage() {
    if (this.props.errorMessage) {
      return (
        <div className="info-red">
          {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="app-signin">
        Sign In
        <form onSubmit={ handleSubmit(this.submit) }>
          <div className="form-group">
            <label>Email:</label>
            <Field name="email"
                    component="input"
                    type="text"
                    placeholder="Email"
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <Field name="password"
                    component="input"
                    type="password"
                    placeholder="Password"
            />
          </div>
          <div className="signin-btn">
            <button type="submit">Sign In</button>
          </div>
        </form>
        {this.errorMessage()}
        <div className="reset-password-text">
          <p><Link key="home" to="/reset-password">Forgot password?</Link></p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

const reduxFormSignin = reduxForm({
  form: 'signin'
})(Signin);

export default connect(mapStateToProps, {signInAction})(reduxFormSignin);
