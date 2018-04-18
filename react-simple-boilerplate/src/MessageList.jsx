import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render(props) {
    console.log('Rendering <MessageList />');

    const individualMessage = this.props.messages.map((message) => {
      return (
        <Message
          key = {message.id}
          username = {message.username}
          content = {message.content}
          notification = {message.notification}
          />);

    })
console.log('individualMessage', individualMessage);

    return (
      <div id="message-list">
        {individualMessage}
      </div>
    );
  }
}

export default MessageList;