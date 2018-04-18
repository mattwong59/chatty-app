import React, {Component} from 'react';

class ChatBar extends Component {
  constructor (props) {
    super();
    this.state = {
      userName: ''
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.submitUserName = this.submitUserName.bind(this);
  }

  onSubmit = (e) => {
    if (e.keyCode === 13) {
      const textMessage = e.target.value;
      console.log(textMessage);
      this.props.onMessageSubmit(textMessage, this.state.userName);
      e.target.value = '';
    }
  }

  submitUserName = (e) => {
    const userName = e.target.value;
    console.log('CHATBAR', userName);
    this.setState({userName: userName});

    if (e.keyCode === 13) {
      const userName = e.target.value;
      console.log(userName);
      this.props.onUserNameChange(userName);
    }
  }

  render() {
    console.log('Rendering <ChatBar/>');



    return (
    <footer className="chatbar">
      <input  className="chatbar-username"
              type = 'text'
              name = 'userName'
              value = {this.state.userName}
              onChange = {this.submitUserName}
              onKeyUp = {this.submitUserName}
              placeholder="Your Name (Optional)"
              />
      <input  className="chatbar-message"
              name = 'textMessage'
              onKeyUp = {this.onSubmit}
              placeholder="Type a message and hit ENTER"
              />
    </footer>);
  }
}

export default ChatBar;
