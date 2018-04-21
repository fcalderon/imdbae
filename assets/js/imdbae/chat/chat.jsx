import React from 'react';
import socket from '../../socket';
import {connect} from 'react-redux';
import {Matchlist} from './matchlist';
import {Chatbox} from './chatbox';


export const Chat = (props) => {
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
