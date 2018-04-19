import React, {Component} from 'react';

export default class NavBar extends Component {
  render(props) {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <p>{this.props.userCount} user(s) online</p>
      </nav>
    );
  }
}

