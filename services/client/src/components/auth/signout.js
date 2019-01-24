import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component {

  componentWillMount () {
    this.props.signOutAction();
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.authenticated };
}

export default connect(mapStateToProps, actions)(Signout);
