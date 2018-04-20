import React from 'react';

export const Chatbox = (props) => {
    console.log(props);
    return <div className={'card chat-room'}>
             <div className={'card-header'}>
               Hello //pass user
             </div>
             <div className={'card-body card-messages'}>
             </div>
             <form>
               <input type="text" id="message-input" className={'form-control'} 
                 placeholde="Start chatting..."
                 />
             </form>
           </div>
};
