import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message';

import './Messages.css';

const Messages = ({ messages, name }) => (
  <ScrollToBottom className="messages">
    {messages.map((message, idx) => <div key={idx}><Message message={message}/></div>)}
  </ScrollToBottom>
);

export default Messages;