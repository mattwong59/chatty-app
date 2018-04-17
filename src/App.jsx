import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor () {
    super();
    this.state = {

      currentUser: {name: "Bob"},
      messages: []
    };
    this.addMessage = this.addMessage.bind(this);
  }



  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onmessage = (msg) => {
        console.log("App onmessage")
        }
    console.log('Connect to server');


    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);


  }

  addMessage(message) {
    console.log("Sending Message");
    var msg = {
        type: "sendMessage",
        content: message,
        username: this.state.currentUser.name
        }
        this.socket.send(JSON.stringify(msg));
  }
    // const oldMessages = this.state.messages;
    // const newMessage = [...oldMessages, {id: 12123, username: this.state.currentUser.name, content: message}]
    // this.setState({messages: newMessage})
  render() {
    console.log('Rendering <App/>');
        return (
          <div>
            <MessageList messages= {this.state.messages} />
            <ChatBar username = {this.state.currentUser.name} onEnter = {this.addMessage} />
          </div>
        );
    }
}
export default App;
