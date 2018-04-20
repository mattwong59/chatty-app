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
      userCount: 0,
      userColor: ''
    };
    this.addMessage = this.addMessage.bind(this);
    this.onUserNameChange = this.onUserNameChange.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onmessage = (msg) => {

      const newMsg = JSON.parse(msg.data);
      const stateMessages = this.state.messages;
      const newNotification = [...stateMessages, { image: newMsg.image, type: newMsg.type, id: newMsg.id, username: newMsg.username, content: newMsg.content, color: newMsg.color }]

      switch(newMsg.type) {

        case 'incomingMessage':
        case 'incomingNotification':
          this.setState({ messages: newNotification });
          break;

        case 'incomingUserCount':
          this.setState( {userCount: newMsg.numUsers})
          break;

        case 'incomingUserColor':
          this.setState ({userColor: newMsg.color})
          break;

        default:
          throw new Error('Unknown event type ' + newMsg.type);
      }
    }
    console.log('Connect to server');

    setTimeout(() => {
      console.log("Simulating incoming message");
      const newMessage = {id: 3, username: "Chatty", content: "Hello there!", type: 'incomingMessage'};
      const messages = this.state.messages.concat(newMessage)
      this.setState({messages: messages})
    }, 3000);
  }

  addMessage(message, username, type, color) {
    console.log("Sending Message");
    let url = message.match(/(http)?s?:?(\/\/[^“’]*\.(?:png|jpg|jpeg|gif|png|svg))/g);
    message = message.split(url);

      let msg = {
          type: "postMessage",
          content: message,
          username: username,
          color: this.state.userColor,
          image: url
      }
        this.socket.send(JSON.stringify(msg));
  }

  onUserNameChange (username) {
    let newName = username;
    let oldName = this.state.currentUser.name;

    if (newName !== oldName) {
      let notification = {
        type: 'postNotification',
        content: `**User: ${oldName}** changed their name to **User: ${newName}**`,
      }
      this.socket.send(JSON.stringify(notification));
    }
    this.setState({currentUser: {name: newName}});
    console.log("CHECK", this.state);
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
