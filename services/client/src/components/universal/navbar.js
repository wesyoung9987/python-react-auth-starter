import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './navbar.less';

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {open: true};
  }

  componentDidMount() {
    this.handleToggle();
  }

  navbarLinks() {
    if (this.props.authenticated) {
      let menu = [
        <Link key="home" to="/main"><div onClick={this.handleToggle}>Home</div></Link>,
        <Link key="dashboard" to="/app/dashboard"><div onClick={this.handleToggle}>Dashboard</div></Link>,
        <Link key="signout" to="/signout"><div onClick={this.handleToggle}>Sign Out</div></Link>
      ];
      
      return menu;
    }
    return [
        <Link key="signin" to="/signin"><div onClick={this.handleToggle}>Sign In</div></Link>,
        <Link key="signup" to="/signup"><div onClick={this.handleToggle}>Sign Up</div></Link>
    ];
  }

  renderNav = () => {
    if (this.state.open) {
      return (
        <div>
          <a href="javascript:void(0)" className="closebtn" onClick={this.handleToggle}>×</a>
          {this.navbarLinks()}
        </div>
      );
    }
  }

  handleToggle = () => {
    if (this.state.open) {
      this.closeNav();
    } else {
      this.openNav();
    }
    this.setState({open: !this.state.open});
  };

  openNav = () => {
    document.getElementById("mySidebar").style.width = "250px";
  }
  
  closeNav = () => {
    document.getElementById("mySidebar").style.width = "0";
  }

  render() {
    return (
      <div>
        <div id="mySidebar" className="sidebar">
          {this.renderNav()}
        </div>
        <div className="nav-bar">
          <div className="openbtn" onClick={this.handleToggle}>☰</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Navbar);
