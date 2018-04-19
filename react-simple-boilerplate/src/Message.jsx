import React, {Component} from 'react';

export default class Message extends Component {
  render(props) {
    console.log('Rendering <Message/>');

    return (
    <main className="messages">
      <div className="message">
        <span className="message-username">{this.props.username}</span>
        <span className="message-content">{this.props.content}</span>
      </div>

    </main>
    );
   }
}


