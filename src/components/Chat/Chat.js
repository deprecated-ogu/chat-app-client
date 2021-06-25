import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

import './Chat.css';

let socket; // socket을 담을 빈 변수 선언
const ENDPOINT = 'http://localhost:5000/';
// const ENDPOINT = 'https://chat-webfront-app.herokuapp.com/';

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // url에서 name과 room을 가져옴
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT); // server에서 io.on connection 이벤트 발생


    setRoom(room);
    setName(name)

    // join event : name과 room 전달
    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);
  
  useEffect(() => {
    socket.on('message', message => { // server에서 emit한 message 객체를 setMessage
      setMessages(messages => [ ...messages, message ]);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage('')); // server에 message 전송 후 callback 함수로 현재 메시지 비우는 것 보냄
    }
  }

  return (
    <div className="outerContainer">
      <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} room={room} />
      </div>
    </div>
  );
}

export default Chat;
