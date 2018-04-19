import React, {Component} from 'react';

class ChatBar extends Component {
  constructor (props) {
    super();
    this.state = {
      userName: 'Anonymous'
    }
    this.onSubmitMessage = this.onSubmitMessage.bind(this);
    this.changeUserName = this.changeUserName.bind(this);
  }

  onSubmitMessage = (e) => {
    if (e.keyCode === 13) {
      const textMessage = e.target.value;
      console.log(textMessage);
      this.props.onMessageSubmit(textMessage, this.state.userName);
      e.target.value = '';
    }
  }

  changeUserName = (e) => {
    const userName = e.target.value;
    if (e.target.value === '') {
      this.setState({userName: 'Anonymous'});
    } else {
        console.log('CHATBAR', userName);
        this.setState({userName: userName});
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
              onBlur = {this.changeUserName}
              placeholder="Your Name (Optional)"
              />
      <input  className="chatbar-message"
              name = 'textMessage'
              onKeyUp = {this.onSubmitMessage}
              placeholder="Type a message and hit ENTER"
              />
    </footer>);
  }
}

export default ChatBar;
