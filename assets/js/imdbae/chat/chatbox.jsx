import React from 'react';
import {Input} from 'reactstrap';

export const Chatbox = (props) => {
    return <div key={props.user.id} className='card'>
        <div className="card chat-room">
          <div className="card-header">
            Hello {props.user.name}
          </div>
          <div className="card-body card-messages">
          </div>
          <Input type="text" id="message-input" className="form-control"
                                                placeholder="Start chatting..." />
        </div>
      </div>
};
