import React from 'react';
import socket from '../../socket';
import {connect} from 'react-redux';
import {Matchlist} from './matchlist';
import {Chatbox} from './chatbox';


export const Chat = (props) => {
    let channel = socket.channel("chats:1", {});

    channel.join()
	    .receive("ok", resp => { console.log("joined", resp) })
	    .receive("error", resp => { console.log("failed", resp) });

    return (<div className={'chat container'}>
              <div className={'row'}>
                <div className={'col-md-3'}>
                  <Matchlist props={props}/>
                </div>
                <div className={'col-md-9'}>
                  <Chatbox props={props}/>
                </div>
              </div>
            </div>);
};
