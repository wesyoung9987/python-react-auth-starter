import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { resetPasswordAction } from '../../../actions';

import './resetPassword.less';

class ResetPassword extends Component {
  submit = (values) => {
    this.props.resetPasswordAction(values, this.props.history);
  }

  state = {
    message: 'Enter the email associated with your account and we will send you a code to reset your password.'
  };

  componentWillReceiveProps (newProps) {
    if (newProps.requestResetPasswordMessage) {
      let message = newProps.requestResetPasswordMessage;
      this.setState({ message });
    }
  }

  render () {
    const { handleSubmit } = this.props;
    return (
      <div className="app-reset-password">
        Reset Password
        <div>
          <p>{this.state.message}</p>
        </div>
        <form onSubmit={ handleSubmit(this.submit) }>
          <div className="form-group">
            <label>Email:</label>
            <Field name="email"
                    component="input"
                    type="text"
                    placeholder="Email"
            />
          </div>
          <div className="submit-btn">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { requestResetPasswordMessage: state.auth.requestResetPasswordMessage };
}

const reduxFormResetPassword = reduxForm({
  form: 'resetPassword'
})(ResetPassword);

export default connect(mapStateToProps, {resetPasswordAction})(reduxFormResetPassword);
