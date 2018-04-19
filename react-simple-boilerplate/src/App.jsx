import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor () {
    super();
    this.state = {
      currentUser: {name: 'Anonymous'},
      messages: [],
      userCount: 0
    };

    this.addMessage = this.addMessage.bind(this);
    this.onUserNameChange = this.onUserNameChange.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket('ws://localhost:3001');

    this.socket.onmessage = (msg) => {
      const newMsg = JSON.parse(msg.data);
      console.log('Socket', newMsg.type)
      switch(newMsg.type) {

        case 'incomingMessage':
          const oldMessages = this.state.messages;
          const newMessages = [...oldMessages, { type: newMsg.type, id: newMsg.id, username: newMsg.username, content: newMsg.content }]
          this.setState({messages: newMessages});
          break;

        case 'incomingNotification':
          const stateMessages = this.state.messages;
          const newNotification = [...stateMessages, { type: newMsg.type, id: newMsg.id, username: newMsg.username, content: newMsg.content }]
          this.setState({ messages: newNotification });
          break;

        case 'incomingUserCount':
          this.setState( {userCount: newMsg.numUsers})
          console.log('NOTIFICATION MESSAGE:', newMsg);
          break;

        default:
          throw new Error('Unknown event type ' + newMsg.type);

      }
        console.log('Message', msg);
        console.log('newMsg: ', newMsg);
    }
        console.log('Connect to server');

    setTimeout(() => {
      console.log("Simulating incoming message");
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      this.setState({messages: messages})
    }, 3000);
  }

  addMessage(message, username, type) {
    console.log("Sending Message");
      let msg = {
          type: "postMessage",
          content: message,
          username: username
      }
        this.socket.send(JSON.stringify(msg));
        console.log(msg);
  }

  onUserNameChange (username) {
    console.log("NEW", username)
    console.log('OLD', this.state.currentUser.name);
    let newName = username;
    let oldName = this.state.currentUser.name;

    if (newName !== oldName) {
      let notification = {
        type: 'postNotification',
        content: `**User: ${oldName}** changed their name to **User: ${newName}**`,
      }
      this.socket.send(JSON.stringify(notification));

    }

    this.setState({currentUser: {name: newName }});
  }

  render() {
    console.log('Rendering <App/>');
        return (
          <div>
            <NavBar userCount={this.state.userCount}/>
            <MessageList messages= {this.state.messages} />
            <ChatBar username = {this.state.currentUser.name}
            onUserNameChange = {this.onUserNameChange}
            onMessageSubmit = {this.addMessage} />
          </div>
        );
    }
}
export default App;
