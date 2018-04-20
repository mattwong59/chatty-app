import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

export default class MessageList extends Component {
  render(props) {
    console.log('Rendering <MessageList />');

    const individualMessage = this.props.messages.map((message) => {

      if(message.type === 'incomingMessage') {
        return (
          <Message
          key = {message.id}
          className = 'message'
          username = {message.username}
          content = {message.content}
          color = {message.color}
          image = {message.image}
          />);
      } else {
          return (
          <Notification
          key = {message.id}
          className = 'notification'
          username = {message.username}
          content = {message.content}
          notification = {message.notification}
          />);
      }
    });

    return (
      <div id="message-list">
        {individualMessage}
        <Notification />
      </div>
    );
  }
}