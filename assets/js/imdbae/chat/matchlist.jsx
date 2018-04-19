import React from 'react';

export const Matchlist = (props) => {
    return <div key={props.user.id} className='card'>
        <div className="card chat-room">
          <div className="card-header">
            Your Matches
          </div>
          <div className="card-body card-users" id="your-matches">
          </div>
        </div>
      </div>
};
