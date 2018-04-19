import React, {Component} from 'react';

export default class NavBar extends Component {
  render(props) {

    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand"><i className="far fa-comments"></i>Chatty</a>



        <p>{this.props.userCount} user(s) online</p>
      </nav>
    );
  }
}

