import React from 'react';
import start_chat from "./chat";

export class ChatPage extends React.Component {
  componentDidMount() {
    start_chat();
  }

  render() {
    return <div className="chat container" id="chat">
      <div className="row">
        <div className="col-md-3">
          <div className="card chat-room">
            <div className="card-header">
              Your Matches
            </div>
            <div className="card-body card-users" id="your-matches">

            </div>
          </div>
        </div>
        <div className="col-md-9">
          <div className="card chat-room">
            <div className="card-header">
              Hello
            </div>
            <div id="chat-messages" className="card-body card-messages">
            </div>
            <input type="text" id="message-input" className="form-control"
                   placeholder="Start chatting..."/>
          </div>
        </div>
      </div>
    </div>
  }
}