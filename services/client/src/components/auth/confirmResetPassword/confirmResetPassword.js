import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { confirmResetPasswordAction } from '../../../actions';

import '../resetPassword/resetPassword.less';

class ConfirmResetPassword extends Component {
  submit = (values) => {
    if (values.password.length < 6) {
      this.setState({ passwordErrorMessage: 'Password must be at least 6 characters.' });
      return;
    }
    values.resetCode = this.state.resetPasswordId;
    this.props.confirmResetPasswordAction(values, this.props.history);
  }

  state = {
    message: 'Confirm your email and enter your new password below.',
    resetPasswordId: '',
    passwordErrorMessage: ''
  };

  componentWillReceiveProps (newProps) {
    if (newProps.confirmResetPasswordMessage) {
      let message = newProps.confirmResetPasswordMessage;
      this.setState({ message });
    }
  }

  componentDidMount () {
    const resetPasswordId = this.props.match.params.id;
    this.setState({ resetPasswordId })
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
          <div className="form-group">
            <label>Password:</label>
            <Field name="password"
                    component="input"
                    type="password"
                    placeholder="Password"
            />
          </div>
          <div className="reset-password-error">{this.state.passwordErrorMessage}</div>
          <div className="submit-btn">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { confirmResetPasswordMessage: state.auth.confirmResetPasswordMessage };
}

const reduxFormConfirmResetPassword = reduxForm({
  form: 'confirmResetPassword'
})(ConfirmResetPassword);

export default connect(mapStateToProps, {confirmResetPasswordAction})(reduxFormConfirmResetPassword);
